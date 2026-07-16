import Link from "next/link";
import { HeroPreview } from "@/components/hero-preview";
import { HeroSearch } from "@/components/hero-search";
import { ProductCard } from "@/components/product-card";
import { Badge, Button, Card, ProductLogo, SectionHeading, Stars, Stat } from "@/components/ui";
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

const totalCustomers = products.reduce((sum, p) => sum + p.customerCount, 0);
const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);
const instantDemos = demos.filter((d) => !d.requiresBooking).length;

const steps = [
  {
    n: "01",
    title: "探す",
    body: "カテゴリ・業界・課題・予算で絞り込む。条件は URL に残るので、そのまま共有できます。",
    icon: "⌕",
    href: "/products",
    cta: "製品を探す",
  },
  {
    n: "02",
    title: "確かめる",
    body: `${instantDemos}本のデモは申込み不要。営業に会う前に、その場で製品を触って確かめられます。`,
    icon: "▶",
    href: "/demos",
    cta: "デモを見る",
  },
  {
    n: "03",
    title: "決める",
    body: "最大4件を横並びで比較。迷ったら AI に条件を伝えれば、概算費用まで含めて提案します。",
    icon: "✦",
    href: "/ai-consult",
    cta: "AIに相談する",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── ヒーロー ─────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="glow absolute inset-0 -z-10" aria-hidden />
        <div className="rails absolute inset-0 -z-10" aria-hidden />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px]">
            <div>
            <span className="rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-[11px] font-black tracking-[0.14em] backdrop-blur">
              <span className="relative inline-grid h-1.5 w-1.5 place-items-center text-accent">
                <span className="pulse-ring absolute inset-0 rounded-full" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              B2B SALES DEMONSTRATION PLATFORM
            </span>

            <h1
              className="rise mt-6 text-4xl leading-[1.15] font-black tracking-tight sm:text-6xl"
              style={{ animationDelay: "60ms" }}
            >
              営業に会う前に、
              <br />
              <span className="grad-text">製品を自分で確かめる。</span>
            </h1>

            <p
              className="rise mt-5 max-w-xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "120ms" }}
            >
              検索して、比較して、その場でデモを見る。
              問い合わせフォームを埋めなくても、{products.length}製品を最後まで調べ切れます。
            </p>

            <div className="rise mt-8 max-w-2xl" style={{ animationDelay: "180ms" }}>
              <HeroSearch />
            </div>

            <div className="rise mt-6 flex flex-wrap gap-2.5" style={{ animationDelay: "240ms" }}>
              <Button href="/ai-consult" size="lg">
                ✦ AIに相談する
              </Button>
              <Button href="/demos" variant="secondary" size="lg">
                デモセンターを見る
              </Button>
            </div>
            </div>

            <div className="hidden lg:block">
              <HeroPreview />
            </div>
          </div>

          {/* 規模がひと目で伝わる数字 */}
          <dl
            className="rise mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4"
            style={{ animationDelay: "300ms" }}
          >
            <Stat value={`${products.length}`} label="掲載製品" sub="6カテゴリ" />
            <Stat value={`${demos.length}本`} label="デモ" sub={`うち${instantDemos}本は申込み不要`} />
            <Stat
              value={`${(totalCustomers / 10000).toFixed(1)}万社`}
              label="導入実績の合計"
              sub={`${caseStudies.length}件の事例を掲載`}
            />
            <Stat
              value={`${totalReviews.toLocaleString("ja-JP")}件`}
              label="レビュー"
              sub="実名の役職つき"
            />
          </dl>
        </div>
      </section>

      {/* ── 3ステップ ────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="reveal">
            <SectionHeading
              eyebrow="How it works"
              title="3ステップで、営業なしに決められます"
              description="どこから手をつければいいか迷わないように、導線を3つに絞っています。"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <Link
                  key={step.n}
                  href={step.href}
                  className="lift group relative overflow-hidden rounded-2xl border border-border bg-background p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grad-brand grid h-10 w-10 place-items-center rounded-xl text-lg text-white shadow-md">
                      <span aria-hidden>{step.icon}</span>
                    </span>
                    <span className="text-3xl font-black text-border tabular-nums transition-colors group-hover:text-accent/30">
                      {step.n}
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-black">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                  <p className="mt-4 text-sm font-bold text-accent">
                    {step.cta}
                    <span className="inline-block transition-transform group-hover:translate-x-1"> →</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        {/* ── カテゴリ ────────────────────────────── */}
        <section className="reveal py-14">
          <SectionHeading
            eyebrow="Categories"
            title="カテゴリから探す"
            description="製品カテゴリごとに、掲載製品を絞り込めます。"
            href="/products"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const inCategory = products.filter((p) => p.categorySlug === c.slug);
              return (
                <Link
                  key={c.slug}
                  href={`/products?cat=${c.slug}`}
                  className="lift group rounded-2xl border border-border bg-surface p-5 shadow-card"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-base text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <span aria-hidden>{c.icon}</span>
                    </span>
                    <span className="font-black">{c.name}</span>
                    <span className="ml-auto text-xs font-bold text-muted tabular-nums">
                      {inCategory.length}製品
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted">{c.description}</p>
                  <div className="mt-3 flex -space-x-1.5">
                    {inCategory.map((p) => (
                      <span
                        key={p.id}
                        className="grid h-6 w-6 place-items-center rounded-md text-[9px] font-black text-white ring-2 ring-surface"
                        style={{ background: p.accent }}
                        title={p.name}
                        aria-hidden
                      >
                        {p.logo}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── ランキング ───────────────────────────── */}
        <section className="reveal py-8">
          <SectionHeading
            eyebrow="Ranking"
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

        {/* ── 新着 ───────────────────────────────── */}
        <section className="reveal py-8">
          <SectionHeading
            eyebrow="New"
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

        {/* ── デモ ───────────────────────────────── */}
        <section className="reveal py-8">
          <SectionHeading
            eyebrow="Demo center"
            title="人気のデモ"
            description={`${instantDemos}本は申込み不要。気になった製品はその場で確かめられます。`}
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
                  className="lift group overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
                >
                  <div
                    className="relative grid h-32 place-items-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${product.accent}, ${product.accent}70)`,
                    }}
                  >
                    <span className="absolute inset-0 opacity-20 mix-blend-overlay" aria-hidden>
                      <span className="rails absolute inset-0" />
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-lg text-white backdrop-blur transition-transform group-hover:scale-110">
                      <span aria-hidden>{demoTypeMeta[demo.type].icon}</span>
                    </span>
                    <span className="absolute right-2 bottom-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[11px] font-bold text-white tabular-nums">
                      {demo.durationMin}分
                    </span>
                    {!demo.requiresBooking ? (
                      <span className="absolute top-2 left-2 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-black text-slate-900">
                        すぐ視聴
                      </span>
                    ) : null}
                  </div>
                  <div className="p-3.5">
                    <Badge tone="accent">{demo.type}</Badge>
                    <p className="mt-2 line-clamp-2 text-sm font-bold group-hover:text-accent">
                      {demo.title}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 border-t border-border pt-2.5">
                      <ProductLogo product={product} size={18} />
                      <span className="truncate text-xs text-muted">{product.name}</span>
                      <span className="ml-auto shrink-0 text-[11px] text-muted tabular-nums">
                        {(demo.views / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 業界 ───────────────────────────────── */}
        <section className="reveal py-8">
          <SectionHeading
            eyebrow="Industries"
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
                  className="lift group rounded-2xl border border-border bg-surface p-4 text-center shadow-card"
                >
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-xl text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <span aria-hidden>{i.icon}</span>
                  </span>
                  <p className="mt-2.5 text-sm font-black">{i.name}</p>
                  <p className="text-[11px] text-muted tabular-nums">{count}製品</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 事例 ───────────────────────────────── */}
        <section className="reveal py-8">
          <SectionHeading
            eyebrow="Case studies"
            title="導入して、何がどう変わったか"
            description="導入前の課題・実際にやったこと・出た効果まで。"
            href="/cases"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredCases.map((c) => {
              const product = productById(c.productId);
              const ind = industryBySlug(c.industrySlug);
              return (
                <Card key={c.id} className="lift flex flex-col overflow-hidden p-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {ind ? <Badge tone="brand">{ind.name}</Badge> : null}
                    {c.hasVideo ? <Badge tone="accent">▶ 動画あり</Badge> : null}
                  </div>
                  <p className="mt-2.5 leading-snug font-black">{c.title}</p>
                  <p className="mt-1 text-xs text-muted">{c.company}</p>
                  <p className="mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">
                    {c.before}
                  </p>
                  <p className="mt-4 rounded-xl border border-highlight/25 bg-highlight/8 px-3 py-2.5 text-sm font-black text-highlight">
                    {c.roi}
                  </p>
                  {product ? (
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted hover:text-accent"
                    >
                      <ProductLogo product={product} size={20} />
                      <span className="truncate font-bold">{product.name}</span>
                      <span className="ml-auto">→</span>
                    </Link>
                  ) : null}
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── コンサルタント ───────────────────────── */}
        <section className="reveal py-8">
          <SectionHeading
            eyebrow="Consultants"
            title="製品の前に、要件から相談する"
            description="何を買うかより、何を解くかが決まっていないときに。"
            href="/consultants"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {consultants.map((c) => (
              <Card key={c.id} className="lift p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black text-white shadow-sm"
                    style={{ background: `linear-gradient(140deg, ${c.accent}, ${c.accent}b0)` }}
                    aria-hidden
                  >
                    {c.initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-black">{c.name}</p>
                    <p className="truncate text-[11px] text-muted">{c.title}</p>
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
                  <span className="text-xs font-black tabular-nums">
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

        {/* ── ウェビナー・コラム ────────────────────── */}
        <section className="reveal grid gap-8 py-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Events" title="開催予定のウェビナー" href="/events" />
            <div className="space-y-3">
              {upcomingEvents.map((e) => (
                <Card key={e.id} className="lift flex gap-4 p-4">
                  <div className="grad-brand w-14 shrink-0 rounded-xl py-2 text-center text-white">
                    <p className="text-[10px] opacity-80">{e.date.slice(5, 7)}月</p>
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
                    <p className="mt-1 truncate text-[11px] text-muted">
                      {e.host} / {e.format} / {e.seats}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Knowledge" title="新着コラム・ナレッジ" href="/columns" />
            <div className="space-y-3">
              {articles.slice(0, 3).map((a) => (
                <Card key={a.id} className="lift p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{a.category}</Badge>
                    <span className="text-[11px] text-muted tabular-nums">{a.publishedAt}</span>
                    <span className="text-[11px] text-muted tabular-nums">{a.readMin}分</span>
                  </div>
                  <p className="mt-2 text-sm font-bold">{a.title}</p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{a.excerpt}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI相談への導線 ───────────────────────── */}
        <section className="reveal py-14">
          <div className="grad-brand relative isolate overflow-hidden rounded-3xl px-8 py-14 text-center shadow-pop sm:px-12">
            <span className="rails absolute inset-0 -z-10 opacity-30" aria-hidden />
            <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-xl text-white backdrop-blur">
              <span aria-hidden>✦</span>
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
              どれを選べばいいか分からない場合
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/80">
              業界・従業員数・課題・予算・導入時期を入力すると、AI が条件に合う製品を3件提案します。
              おすすめの理由だけでなく、確認したい懸念点と概算費用まで併せて出します。
            </p>
            <Link
              href="/ai-consult"
              className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 text-sm font-black text-slate-900 shadow-lg transition-transform hover:scale-105"
            >
              30秒でAIに相談する →
            </Link>
            <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/20 pt-8">
              <Stat value="30秒" label="入力にかかる時間" tone="onDark" />
              <Stat value="3件" label="提案される製品" tone="onDark" />
              <Stat value="0円" label="相談は無料" tone="onDark" />
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
