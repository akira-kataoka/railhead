import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Badge, Card, ProductLogo, SectionHeading } from "@/components/ui";
import { caseStudies } from "@/lib/data/cases";
import { demoTypeMeta, demos } from "@/lib/data/demos";
import { productById } from "@/lib/data/products";
import { companySizeLabels, industries, industryBySlug } from "@/lib/data/taxonomy";
import { emptyFilters, filterProducts } from "@/lib/query";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return { title: "業界が見つかりません" };
  return { title: `${industry.name}向けの製品`, description: industry.description };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();

  const industryProducts = filterProducts({ ...emptyFilters, industries: [slug] }, "recommended");
  const industryCases = caseStudies.filter((c) => c.industrySlug === slug);
  const industryDemos = demos.filter((d) => d.industrySlugs.includes(slug)).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-foreground">
          TOP
        </Link>
        <span>/</span>
        <Link href="/industries" className="hover:text-foreground">
          業界から探す
        </Link>
        <span>/</span>
        <span className="text-foreground">{industry.name}</span>
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-3xl text-accent" aria-hidden>
          {industry.icon}
        </span>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{industry.name}向けの製品</h1>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{industry.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/ai-consult`}
          className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
        >
          ✦ この業界の要件で AI に相談する
        </Link>
        <Link
          href={`/demos?industry=${slug}`}
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2"
        >
          {industry.name}向けのデモを見る
        </Link>
      </div>

      <section className="pt-12">
        <SectionHeading
          title="おすすめ製品"
          description={`${industry.name}での導入実績がある製品です。`}
          href={`/products?ind=${slug}`}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {industryProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {industryDemos.length > 0 ? (
        <section className="pt-12">
          <SectionHeading
            title="デモ"
            description="申込み不要のデモは、その場で確認できます。"
            href={`/demos?industry=${slug}`}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {industryDemos.map((demo) => {
              const product = productById(demo.productId);
              if (!product) return null;
              return (
                <Link
                  key={demo.id}
                  href={`/demos?product=${product.id}`}
                  className="group overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-md"
                >
                  <div
                    className="relative grid h-24 place-items-center"
                    style={{
                      background: `linear-gradient(135deg, ${product.accent}, ${product.accent}80)`,
                    }}
                  >
                    <span className="text-2xl text-white/90" aria-hidden>
                      {demoTypeMeta[demo.type].icon}
                    </span>
                    <span className="absolute right-2 bottom-2 rounded bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white tabular-nums">
                      {demo.durationMin}分
                    </span>
                  </div>
                  <div className="p-3.5">
                    <Badge tone="accent">{demo.type}</Badge>
                    <p className="mt-2 line-clamp-2 text-sm font-bold group-hover:underline">
                      {demo.title}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <ProductLogo product={product} size={18} />
                      <span className="truncate text-xs text-muted">{product.name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {industryCases.length > 0 ? (
        <section className="pt-12">
          <SectionHeading title="導入事例" href="/cases" />
          <div className="grid gap-4 lg:grid-cols-2">
            {industryCases.map((c) => {
              const product = productById(c.productId);
              return (
                <Card key={c.id} className="p-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge>{companySizeLabels[c.companySize]}</Badge>
                    {c.hasVideo ? <Badge tone="accent">▶ 動画あり</Badge> : null}
                  </div>
                  <p className="mt-2.5 leading-snug font-bold">{c.title}</p>
                  <p className="mt-1 text-xs text-muted">{c.company}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">{c.effect}</p>
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
