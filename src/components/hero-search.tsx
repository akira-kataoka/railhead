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
        className="flex gap-2"
        role="search"
      >
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="製品名・カテゴリ・課題で検索"
          aria-label="製品を検索"
          className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-brand-fg hover:opacity-90"
        >
          検索
        </button>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted">例：</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => go(ex)}
            className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted hover:bg-surface-2 hover:text-foreground"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
