import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/data/cases";
import { products } from "@/lib/data/products";
import { challenges } from "@/lib/data/taxonomy";

export const metadata: Metadata = {
  title: "課題から探す",
  description: "営業効率化・DX推進・AI活用・データ活用・マーケティング・セキュリティ・顧客管理。",
};

export default function ChallengesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">課題から探す</h1>
      <p className="mt-1.5 text-sm text-muted">
        解きたい課題を起点に、製品・比較・事例・デモをまとめています。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((ch) => {
          const productCount = products.filter((p) => p.challengeSlugs.includes(ch.slug)).length;
          const caseCount = caseStudies.filter((c) => c.challengeSlugs.includes(ch.slug)).length;
          return (
            <Link
              key={ch.slug}
              href={`/challenges/${ch.slug}`}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl text-accent" aria-hidden>
                  {ch.icon}
                </span>
                <h2 className="text-lg font-bold">{ch.name}</h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{ch.description}</p>
              <dl className="mt-4 flex gap-5 border-t border-border pt-3 text-xs">
                {(
                  [
                    ["製品", productCount],
                    ["事例", caseCount],
                  ] as const
                ).map(([label, count]) => (
                  <div key={label}>
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-bold tabular-nums">{count}件</dd>
                  </div>
                ))}
              </dl>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
