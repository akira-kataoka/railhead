import Link from "next/link";
import { HeroSearch } from "@/components/hero-search";
import { ProductCard } from "@/components/product-card";
import { Badge, Card, ProductLogo, SectionHeading, Stars } from "@/components/ui";
import { caseStudies } from "@/lib/data/cases";
import { demoTypeMeta, demos } from "@/lib/data/demos";
import { articles, consultants, events } from "@/lib/data/misc";
import { products, productById } from "@/lib/data/products";
import { categories, industries, industryBySlug } from "@/lib/data/taxonomy";
import { emptyFilters, filterProducts } from "@/lib/query";

const ranked = filterProducts(emptyFilters, "recommended");
const newest = filterProducts(emptyFilters, "newest").slice(0, 3);
const popularDemos = [...demos].sort((a, b) => b.views - a.views).slice(0, 4);
const featuredCases = caseStudies.slice(0, 3);
const upcomingEvents = events.filter((e) => e.kind !== "アーカイブ").slice(0, 3);

export default function Home() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <div className="max-w-2xl">
            <Badge tone="accent">B2B Sales Demonstration Platform</Badge>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              営業に会う前に、
              <br />
              製品を自分で確かめる。
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {products.length}製品・{demos.length}本のデモ・{caseStudies.length}件の導入事例。
              検索して、比較して、その場でデモを見る。判断がつかなければ AI に相談できます。
            </p>
            <div className="mt-7 max-w-xl">
              <HeroSearch />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/ai-consult"
                className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
              >
                ✦ AIに相談する
              </Link>
              <Link
                href="/demos"
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2"
              >
                デモセンターを見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        {/* カテゴリ */}
        <section className="py-12">
          <SectionHeading
            title="カテゴリから探す"
            description="製品カテゴリごとに、掲載製品を絞り込めます。"
            href="/products"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const count = products.filter((p) => p.categorySlug === c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={`/products?cat=${c.slug}`}
                  className="rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base text-accent" aria-hidden>
                      {c.icon}
                    </span>
                    <span className="font-bold">{c.name}</span>
                    <span className="ml-auto text-xs text-muted tabular-nums">{count}製品</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{c.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 人気製品ランキング */}
        <section className="py-8">
          <SectionHeading
            title="人気製品ランキング"
            description="閲覧数・レビュー・導入実績をもとにした総合ランキング。"
            href="/products"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ranked.slice(0, 6).map((product, i) => (
              <ProductCard key={product.id} product={product} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* 新着製品 */}
        <section className="py-8">
          <SectionHeading
            title="新着製品"
            description="直近で掲載が始まった製品です。"
            href="/products?sort=newest"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {newest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 人気デモ */}
        <section className="py-8">
          <SectionHeading
            title="人気のデモ"
            description="申込み不要のデモも多数。気になった製品はその場で確かめられます。"
            href="/demos"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {popularDemos.map((demo) => {
              const product = productById(demo.productId);
              if (!product) return null;
              return (
                <Link
                  key={demo.id}
                  href={`/demos?product=${product.id}`}
                  className="group overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-md"
                >
                  <div
                    className="relative grid h-28 place-items-center"
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
                    <p className="mt-1.5 text-[11px] text-muted tabular-nums">
                      {demo.views.toLocaleString("ja-JP")} 回視聴
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 注目業界 */}
        <section className="py-8">
          <SectionHeading
            title="業界から探す"
            description="業界ごとに、おすすめ製品・事例・デモをまとめています。"
            href="/industries"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {industries.map((i) => {
              const count = products.filter((p) => p.industrySlugs.includes(i.slug)).length;
              return (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="rounded-xl border border-border bg-surface p-4 text-center transition-colors hover:bg-surface-2"
                >
                  <span className="text-xl text-accent" aria-hidden>
                    {i.icon}
                  </span>
                  <p className="mt-1.5 text-sm font-bold">{i.name}</p>
                  <p className="text-xs text-muted tabular-nums">{count}製品</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 導入事例 */}
        <section className="py-8">
          <SectionHeading
            title="導入事例"
            description="導入前の課題・実際にやったこと・出た効果まで。"
            href="/cases"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredCases.map((c) => {
              const product = productById(c.productId);
              const ind = industryBySlug(c.industrySlug);
              return (
                <Card key={c.id} className="flex flex-col p-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {ind ? <Badge tone="brand">{ind.name}</Badge> : null}
                    {c.hasVideo ? <Badge tone="accent">▶ 動画あり</Badge> : null}
                  </div>
                  <p className="mt-2.5 leading-snug font-bold">{c.title}</p>
                  <p className="mt-1 text-xs text-muted">{c.company}</p>
                  <p className="mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">
                    {c.before}
                  </p>
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

        {/* コンサルタント */}
        <section className="py-8">
          <SectionHeading
            title="おすすめのコンサルタント"
            description="製品選定の前に、要件整理から相談できます。"
            href="/consultants"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {consultants.map((c) => (
              <Card key={c.id} className="p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                    style={{ background: c.accent }}
                    aria-hidden
                  >
                    {c.initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{c.name}</p>
                    <p className="truncate text-xs text-muted">{c.title}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Stars rating={c.rating} />
                  <span className="text-xs text-muted tabular-nums">実績 {c.projects}件</span>
                </div>
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted">{c.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {c.specialties.slice(0, 2).map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs font-bold tabular-nums">
                    {c.hourlyFee.toLocaleString("ja-JP")}円 / 時
                  </span>
                  <Badge tone={c.available ? "accent" : "neutral"}>
                    {c.available ? "相談枠あり" : "満席"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ウェビナー・コラム */}
        <section className="grid gap-8 py-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="開催予定のウェビナー" href="/events" />
            <div className="space-y-3">
              {upcomingEvents.map((e) => (
                <Card key={e.id} className="flex gap-4 p-4">
                  <div className="w-14 shrink-0 rounded-lg bg-surface-2 py-2 text-center">
                    <p className="text-[10px] text-muted">{e.date.slice(5, 7)}月</p>
                    <p className="text-lg leading-tight font-black tabular-nums">
                      {e.date.slice(8, 10)}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge tone="brand">{e.kind}</Badge>
                      {e.free ? <Badge tone="accent">無料</Badge> : null}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm font-bold">{e.title}</p>
                    <p className="mt-1 truncate text-xs text-muted">
                      {e.host} / {e.format} / {e.seats}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title="新着コラム・ナレッジ" href="/columns" />
            <div className="space-y-3">
              {articles.slice(0, 3).map((a) => (
                <Card key={a.id} className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{a.category}</Badge>
                    <span className="text-xs text-muted tabular-nums">{a.publishedAt}</span>
                    <span className="text-xs text-muted tabular-nums">{a.readMin}分で読めます</span>
                  </div>
                  <p className="mt-2 text-sm font-bold">{a.title}</p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{a.excerpt}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI 相談への導線 */}
        <section className="py-12">
          <Card className="border-accent/30 bg-accent/5 p-8 text-center sm:p-12">
            <span className="text-2xl text-accent" aria-hidden>
              ✦
            </span>
            <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
              どれを選べばいいか分からない場合
            </h2>
            <p className="mx-auto mt-2.5 max-w-lg text-sm leading-relaxed text-muted">
              業界・従業員数・課題・予算・導入時期を入力すると、AI が条件に合う製品を3件提案します。
              概算費用と導入期間、懸念点まで併せて出します。
            </p>
            <Link
              href="/ai-consult"
              className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-bold text-brand-fg hover:opacity-90"
            >
              AIに相談する
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
}
