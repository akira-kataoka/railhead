import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/data/cases";
import { demos } from "@/lib/data/demos";
import { products } from "@/lib/data/products";
import { industries } from "@/lib/data/taxonomy";

export const metadata: Metadata = {
  title: "業界から探す",
  description: "製造業・金融・自治体・医療・教育・流通・小売。業界ごとのおすすめ製品と事例をまとめています。",
};

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">業界から探す</h1>
      <p className="mt-1.5 text-sm text-muted">
        業界ごとに、導入実績のある製品・事例・デモを絞り込んでいます。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind) => {
          const productCount = products.filter((p) => p.industrySlugs.includes(ind.slug)).length;
          const caseCount = caseStudies.filter((c) => c.industrySlug === ind.slug).length;
          const demoCount = demos.filter((d) => d.industrySlugs.includes(ind.slug)).length;
          return (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl text-accent" aria-hidden>
                  {ind.icon}
                </span>
                <h2 className="text-lg font-bold">{ind.name}</h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{ind.description}</p>
              <dl className="mt-4 flex gap-5 border-t border-border pt-3 text-xs">
                {(
                  [
                    ["製品", productCount],
                    ["事例", caseCount],
                    ["デモ", demoCount],
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
