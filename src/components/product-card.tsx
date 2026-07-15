"use client";

import Link from "next/link";
import { useCompare } from "@/components/compare-context";
import { Badge, ProductLogo, Stars } from "@/components/ui";
import { categoryBySlug } from "@/lib/data/taxonomy";
import { formatPrice } from "@/lib/query";
import type { Product } from "@/lib/types";

export function CompareToggle({ product }: { product: Product }) {
  const { has, toggle, isFull } = useCompare();
  const selected = has(product.id);
  const blocked = !selected && isFull;

  return (
    <button
      type="button"
      onClick={() => toggle(product.id)}
      disabled={blocked}
      title={blocked ? "比較は4件までです" : undefined}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
        selected
          ? "border-accent bg-accent text-white"
          : blocked
            ? "cursor-not-allowed border-border text-muted opacity-50"
            : "border-border hover:bg-surface-2"
      }`}
    >
      {selected ? "✓ 比較中" : "+ 比較"}
    </button>
  );
}

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const category = categoryBySlug(product.categorySlug);

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        {rank !== undefined ? (
          <span className="mt-1 w-5 shrink-0 text-center text-sm font-black text-muted tabular-nums">
            {rank}
          </span>
        ) : null}
        <ProductLogo product={product} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold">
            <Link href={`/products/${product.id}`} className="hover:underline">
              <span className="absolute inset-0" aria-hidden />
              {product.name}
            </Link>
          </h3>
          <p className="truncate text-xs text-muted">{product.vendor}</p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{product.summary}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <Stars rating={product.rating} />
        <span className="text-xs text-muted tabular-nums">レビュー {product.reviewCount}件</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {category ? <Badge tone="brand">{category.name}</Badge> : null}
        <Badge>{product.origin}</Badge>
        {product.aiReady ? <Badge tone="accent">AI対応</Badge> : null}
        {product.freeTrial ? <Badge>無料トライアル</Badge> : null}
        {product.certified ? <Badge tone="warn">認定製品</Badge> : null}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{formatPrice(product)}</p>
          <p className="text-xs text-muted tabular-nums">
            導入 {product.customerCount.toLocaleString("ja-JP")}社
          </p>
        </div>
        {/* z-10 で、カード全面を覆うリンクより手前に出す */}
        <div className="relative z-10 shrink-0">
          <CompareToggle product={product} />
        </div>
      </div>
    </div>
  );
}
