import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, ProductLogo, Stars } from "@/components/ui";
import { partners } from "@/lib/data/misc";
import { productById } from "@/lib/data/products";
import { industryBySlug } from "@/lib/data/taxonomy";

export const metadata: Metadata = {
  title: "パートナー企業",
  description: "地域・製品・業界・認定資格・導入実績から、導入を任せられるパートナーを探せます。",
};

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">パートナー企業</h1>
      <p className="mt-1.5 text-sm text-muted">
        製品が決まったら、導入を任せる相手を探す。認定資格と実績で比較できます。
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {partners.map((p) => (
          <Card key={p.id} className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-lg text-lg font-bold text-white"
                style={{ background: p.accent }}
                aria-hidden
              >
                {p.initial}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg leading-snug font-bold">{p.name}</h2>
                <p className="mt-0.5 text-xs text-muted">
                  {p.region} / {p.employees}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <Stars rating={p.rating} />
                  <span className="text-xs text-muted tabular-nums">レビュー {p.reviewCount}件</span>
                  <span className="text-xs text-muted tabular-nums">導入実績 {p.projects}件</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>

            <dl className="mt-4 space-y-3 border-t border-border pt-4">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-xs text-muted">認定資格</dt>
                <dd className="flex flex-wrap gap-1">
                  {p.certifications.map((c) => (
                    <Badge key={c} tone="warn">
                      {c}
                    </Badge>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-xs text-muted">対応業界</dt>
                <dd className="flex flex-wrap gap-1">
                  {p.industrySlugs.map((s) => (
                    <Badge key={s}>{industryBySlug(s)?.name}</Badge>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-xs text-muted">対応製品</dt>
                <dd className="flex flex-wrap gap-2">
                  {p.productIds.map((id) => {
                    const product = productById(id);
                    return product ? (
                      <Link
                        key={id}
                        href={`/products/${id}`}
                        className="flex items-center gap-1.5 rounded border border-border px-1.5 py-1 hover:bg-surface-2"
                      >
                        <ProductLogo product={product} size={16} />
                        <span className="text-xs font-medium">{product.name}</span>
                      </Link>
                    ) : null;
                  })}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2"
            >
              このパートナーに問い合わせる
            </button>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">※ デモ環境のため、問い合わせは送信されません。</p>
    </div>
  );
}
