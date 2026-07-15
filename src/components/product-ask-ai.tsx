"use client";

import { useEffect, useRef, useState } from "react";
import { answerProductQuestion, suggestedQuestions } from "@/lib/ai";
import type { Product } from "@/lib/types";

interface Turn {
  question: string;
  answer: string;
}

export function ProductAskAi({ product }: { product: Product }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || thinking) return;
    setDraft("");
    setThinking(true);
    // 実際に LLM を呼ぶ体感に寄せるための遅延。API 化する時はここを差し替える
    timer.current = setTimeout(() => {
      setTurns((prev) => [...prev, { question: q, answer: answerProductQuestion(product, q) }]);
      setThinking(false);
    }, 550);
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded bg-accent/15 text-xs text-accent">
          ✦
        </span>
        <h3 className="font-bold">この製品に質問する</h3>
      </div>
      <p className="mt-1.5 text-sm text-muted">
        製品情報・レビュー・事例を学習した AI が回答します。営業に会う前に疑問を解消できます。
      </p>

      {turns.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {turns.map((turn, i) => (
            <li key={i}>
              <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-surface-2 px-3.5 py-2 text-sm">
                {turn.question}
              </p>
              <p className="mt-2 w-fit max-w-[92%] rounded-xl rounded-bl-sm border border-border px-3.5 py-2.5 text-sm leading-relaxed">
                {turn.answer}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {thinking ? <p className="mt-4 text-sm text-muted">回答を作成しています…</p> : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
        className="mt-4 flex gap-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`${product.name} について質問する`}
          aria-label={`${product.name} について質問する`}
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={!draft.trim() || thinking}
          className="shrink-0 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90 disabled:opacity-40"
        >
          質問
        </button>
      </form>

      {turns.length === 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted hover:bg-surface-2 hover:text-foreground"
            >
              {q}
            </button>
          ))}
        </div>
      ) : null}

      <p className="mt-3 text-[11px] text-muted">
        ※ デモ環境のため、回答は掲載データからのルールベース生成です。
      </p>
    </div>
  );
}
