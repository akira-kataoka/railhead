import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Badge, Card, ProductLogo, SectionHeading } from "@/components/ui";
import { caseStudies } from "@/lib/data/cases";
import { productById } from "@/lib/data/products";
import { challengeBySlug, challenges, industryBySlug } from "@/lib/data/taxonomy";
import { emptyFilters, filterProducts } from "@/lib/query";

export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenge = challengeBySlug(slug);
  if (!challenge) return { title: "課題が見つかりません" };
  return { title: `${challenge.name}の製品`, description: challenge.description };
}

export default async function ChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = challengeBySlug(slug);
  if (!challenge) notFound();

  const matched = filterProducts({ ...emptyFilters, challenges: [slug] }, "recommended");
  const relatedCases = caseStudies.filter((c) => c.challengeSlugs.includes(slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-foreground">
          TOP
        </Link>
        <span>/</span>
        <Link href="/challenges" className="hover:text-foreground">
          課題から探す
        </Link>
        <span>/</span>
        <span className="text-foreground">{challenge.name}</span>
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-3xl text-accent" aria-hidden>
          {challenge.icon}
        </span>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{challenge.name}</h1>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{challenge.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/ai-consult"
          className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
        >
          ✦ この課題で AI に相談する
        </Link>
        <Link
          href="/compare"
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2"
        >
          製品を比較する
        </Link>
      </div>

      <section className="pt-12">
        <SectionHeading
          title="おすすめ製品"
          description={`${challenge.name}に対応する製品です。`}
          href={`/products?ch=${slug}`}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {matched.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {relatedCases.length > 0 ? (
        <section className="pt-12">
          <SectionHeading title="この課題を解いた事例" href="/cases" />
          <div className="grid gap-4 lg:grid-cols-2">
            {relatedCases.map((c) => {
              const product = productById(c.productId);
              const ind = industryBySlug(c.industrySlug);
              return (
                <Card key={c.id} className="p-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {ind ? <Badge tone="brand">{ind.name}</Badge> : null}
                    {c.hasVideo ? <Badge tone="accent">▶ 動画あり</Badge> : null}
                  </div>
                  <p className="mt-2.5 leading-snug font-bold">{c.title}</p>
                  <p className="mt-1 text-xs text-muted">{c.company}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">{c.before}</p>
                  <p className="mt-3 rounded-lg bg-accent/10 px-3 py-2 text-xs font-bold text-accent">
                    {c.roi}
                  </p>
                  {product ? (
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted hover:text-foreground"
                    >
                      <ProductLogo product={product} size={20} />
                      <span className="truncate font-medium">{product.name}</span>
                    </Link>
                  ) : null}
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
