import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, ProductLogo } from "@/components/ui";
import { caseStudies } from "@/lib/data/cases";
import { productById } from "@/lib/data/products";
import { challengeBySlug, companySizeLabels, industryBySlug } from "@/lib/data/taxonomy";

export const metadata: Metadata = {
  title: "導入事例",
  description: "導入前の課題・導入内容・効果・ROI まで含めた導入事例集。",
};

export default function CasesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">導入事例</h1>
      <p className="mt-1.5 text-sm text-muted">
        導入前に何が問題で、実際に何をして、どう変わったか。{caseStudies.length}件を掲載しています。
      </p>

      <div className="mt-6 space-y-4">
        {caseStudies.map((c) => {
          const product = productById(c.productId);
          const ind = industryBySlug(c.industrySlug);
          return (
            <Card key={c.id} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-1.5">
                {ind ? <Badge tone="brand">{ind.name}</Badge> : null}
                <Badge>{companySizeLabels[c.companySize]}</Badge>
                {c.challengeSlugs.map((s) => {
                  const ch = challengeBySlug(s);
                  return ch ? (
                    <Badge key={s} tone="accent">
                      {ch.name}
                    </Badge>
                  ) : null;
                })}
                {c.hasVideo ? <Badge tone="warn">▶ 動画あり</Badge> : null}
              </div>

              <h2 className="mt-3 text-lg leading-snug font-bold">{c.title}</h2>
              <p className="mt-1 text-xs text-muted">{c.company}</p>

              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["導入前の課題", c.before],
                    ["導入内容", c.solution],
                    ["効果", c.effect],
                  ] as const
                ).map(([label, body]) => (
                  <div key={label}>
                    <dt className="text-xs font-bold text-muted">{label}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-muted">{body}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm font-bold text-accent">{c.roi}</p>
                {product ? (
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-2 text-xs text-muted hover:text-foreground"
                  >
                    <ProductLogo product={product} size={22} />
                    <span className="font-medium">{product.name} を見る →</span>
                  </Link>
                ) : null}
              </div>

              <blockquote className="mt-4 border-l-2 border-border pl-3 text-xs leading-relaxed text-muted">
                「{c.interview.quote}」
                <footer className="mt-1">— {c.interview.person}</footer>
              </blockquote>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
