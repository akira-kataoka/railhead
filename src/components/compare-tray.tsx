"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAX_COMPARE, useCompare } from "@/components/compare-context";
import { ProductLogo } from "@/components/ui";
import { productById } from "@/lib/data/products";

export function CompareTray() {
  const { ids, remove, clear, ready } = useCompare();
  const pathname = usePathname();

  // 比較ページ自身では邪魔にしかならない
  if (!ready || ids.length === 0 || pathname === "/compare") return null;

  const picked = ids.map(productById).filter((p) => p !== undefined);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <div className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
          比較リスト
          <span className="ml-1 tabular-nums">
            {ids.length}/{MAX_COMPARE}
          </span>
        </div>

        <ul className="flex flex-1 items-center gap-2 overflow-x-auto">
          {picked.map((product) => (
            <li
              key={product.id}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-surface-2 py-1.5 pr-1.5 pl-2"
            >
              <ProductLogo product={product} size={22} />
              <span className="max-w-32 truncate text-xs font-medium">{product.name}</span>
              <button
                type="button"
                onClick={() => remove(product.id)}
                className="grid h-5 w-5 place-items-center rounded text-muted hover:bg-border hover:text-foreground"
                aria-label={`${product.name} を比較リストから外す`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clear}
            className="rounded-lg px-2 py-1.5 text-xs font-medium text-muted hover:bg-surface-2"
          >
            クリア
          </button>
          <Link
            href="/compare"
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold ${
              ids.length < 2
                ? "pointer-events-none bg-surface-2 text-muted"
                : "bg-brand text-brand-fg hover:opacity-90"
            }`}
            aria-disabled={ids.length < 2}
          >
            {ids.length < 2 ? "あと1件で比較" : "比較する"}
          </Link>
        </div>
      </div>
    </div>
  );
}
