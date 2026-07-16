"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const examples = ["SFA", "AI エージェント", "BI", "ゼロトラスト", "ERP"];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const go = (value: string) => {
    const trimmed = value.trim();
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
        className="flex gap-2 rounded-2xl border border-border bg-surface p-2 shadow-pop"
        role="search"
      >
        <span className="grid w-9 shrink-0 place-items-center text-muted" aria-hidden>
          ⌕
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="製品名・カテゴリ・課題で検索"
          aria-label="製品を検索"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="grad-brand shrink-0 rounded-xl px-6 py-3 text-sm font-black text-white transition-all hover:brightness-110"
        >
          検索
        </button>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted">人気:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => go(ex)}
            className="rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
