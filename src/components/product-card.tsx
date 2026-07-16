"use client";

import Link from "next/link";
import { useCompare } from "@/components/compare-context";
import { Badge, ProductLogo, Stars } from "@/components/ui";
import { categoryBySlug } from "@/lib/data/taxonomy";
import { formatPriceShort } from "@/lib/query";
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
      className={`rounded-xl border px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
        selected
          ? "border-accent bg-accent text-white shadow-sm"
          : blocked
            ? "cursor-not-allowed border-border text-muted opacity-50"
            : "border-border hover:border-accent hover:bg-accent/5 hover:text-accent"
      }`}
    >
      {selected ? "✓ 比較中" : "+ 比較"}
    </button>
  );
}

const rankStyle = (rank: number) => {
  if (rank === 1) return "bg-amber-500 text-white shadow-md";
  if (rank === 2) return "bg-slate-400 text-white shadow-sm";
  if (rank === 3) return "bg-amber-700 text-white shadow-sm";
  return "bg-surface-2 text-muted";
};

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const category = categoryBySlug(product.categorySlug);
  const hook = product.highlights[0];

  return (
    <div className="group lift relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      {/* 製品ごとの色を、カード上端の帯として出す */}
      <span
        className="h-1 w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${product.accent}, ${product.accent}40)` }}
        aria-hidden
      />

      {rank !== undefined ? (
        <span
          className={`absolute top-3 right-3 z-10 grid h-7 w-7 place-items-center rounded-lg text-xs font-black tabular-nums ${rankStyle(rank)}`}
        >
          {rank}
        </span>
      ) : null}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-3">
          <ProductLogo product={product} size={44} />
          <div className="min-w-0 flex-1 pr-8">
            <h3 className="truncate text-[15px] font-black">
              <Link href={`/products/${product.id}`} className="hover:text-accent">
                <span className="absolute inset-0" aria-hidden />
                {product.name}
              </Link>
            </h3>
            <p className="truncate text-xs text-muted">{product.vendor}</p>
            <div className="mt-1 flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-[11px] text-muted tabular-nums">({product.reviewCount})</span>
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{product.summary}</p>

        {/* この製品が選ばれる一番の理由を1つだけ立てる */}
        {hook ? (
          <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-accent/8 px-2.5 py-2 text-xs leading-snug font-bold text-accent">
            <span aria-hidden>◆</span>
            <span className="min-w-0">{hook.title}</span>
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-1">
          {category ? <Badge tone="brand">{category.name}</Badge> : null}
          <Badge>{product.origin}</Badge>
          {product.aiReady ? <Badge tone="accent">AI対応</Badge> : null}
          {product.freeTrial ? <Badge tone="accent">無料トライアル</Badge> : null}
          {product.certified ? <Badge tone="warn">認定製品</Badge> : null}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0">
            {/* 金額と単位を分ける。1行にすると「月額（10ユーザーから）」で必ず溢れる */}
            <p className="text-[15px] leading-tight font-black">{formatPriceShort(product)}</p>
            <p className="truncate text-[11px] text-muted">
              {product.priceFrom === 0 ? "無料プランあり" : product.priceUnit}
            </p>
            <p className="mt-0.5 text-[11px] text-muted tabular-nums">
              導入 {product.customerCount.toLocaleString("ja-JP")}社
            </p>
          </div>
          {/* z-10 で、カード全面を覆うリンクより手前に出す */}
          <div className="relative z-10 shrink-0">
            <CompareToggle product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
