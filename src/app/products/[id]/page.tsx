import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompareToggle } from "@/components/product-card";
import { LeadForm } from "@/components/lead-form";
import { ProductAskAi } from "@/components/product-ask-ai";
import { Badge, Card, ProductLogo, ScoreBar, Stars } from "@/components/ui";
import { casesByProduct } from "@/lib/data/cases";
import { demoTypeMeta, demosByProduct } from "@/lib/data/demos";
import { products, productById } from "@/lib/data/products";
import { reviewsByProduct } from "@/lib/data/reviews";
import {
  categoryBySlug,
  challengeBySlug,
  companySizeLabels,
  industryBySlug,
} from "@/lib/data/taxonomy";
import { emptyFilters, filterProducts, formatPrice } from "@/lib/query";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = productById(id);
  if (!product) return { title: "製品が見つかりません" };
  return { title: product.name, description: product.summary };
}

const sections = [
  { id: "overview", label: "概要" },
  { id: "features", label: "機能一覧" },
  { id: "pricing", label: "価格" },
  { id: "demos", label: "デモ" },
  { id: "cases", label: "導入事例" },
  { id: "reviews", label: "レビュー" },
  { id: "faq", label: "FAQ" },
];

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();

  const category = categoryBySlug(product.categorySlug);
  const demos = demosByProduct(product.id);
  const cases = casesByProduct(product.id);
  const reviews = reviewsByProduct(product.id);

  const related = filterProducts({ ...emptyFilters, categories: [product.categorySlug] })
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const ratingBuckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-foreground">
          TOP
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">
          製品を探す
        </Link>
        <span>/</span>
        {category ? (
          <>
            <Link href={`/products?cat=${category.slug}`} className="hover:text-foreground">
              {category.name}
            </Link>
            <span>/</span>
          </>
        ) : null}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          {/* ヘッダー */}
          <div className="flex flex-wrap items-start gap-4">
            <ProductLogo product={product} size={60} />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>
              <p className="mt-1 text-sm text-muted">{product.vendor}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Stars rating={product.rating} size="md" />
                <Link href="#reviews" className="text-xs text-accent hover:underline tabular-nums">
                  レビュー {product.reviewCount}件
                </Link>
                <span className="text-xs text-muted tabular-nums">
                  導入 {product.customerCount.toLocaleString("ja-JP")}社
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {category ? <Badge tone="brand">{category.name}</Badge> : null}
            <Badge>{product.origin}</Badge>
            {product.cloud ? <Badge>クラウド</Badge> : null}
            {product.aiReady ? <Badge tone="accent">AI対応</Badge> : null}
            {product.freeTrial ? <Badge>無料トライアル</Badge> : null}
            {product.certified ? <Badge tone="warn">認定製品</Badge> : null}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed">{product.summary}</p>

          {/* セクション内リンク */}
          <div className="sticky top-14 z-30 -mx-4 mt-6 border-y border-border bg-background/90 px-4 backdrop-blur">
            <nav className="flex gap-1 overflow-x-auto py-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="shrink-0 rounded px-2.5 py-1.5 text-[13px] font-medium text-muted hover:bg-surface-2 hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          {/* 概要 */}
          <section id="overview" className="scroll-mt-28 pt-8">
            <h2 className="text-lg font-bold">概要</h2>
            <p className="mt-3 text-sm leading-loose text-muted">{product.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {product.highlights.map((h) => (
                <Card key={h.title} className="p-4">
                  <p className="text-sm font-bold">{h.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{h.body}</p>
                </Card>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <p className="text-xs font-bold tracking-wide text-muted">評価</p>
                <dl className="mt-3 space-y-2.5">
                  {(
                    [
                      ["AI機能", product.scores.ai],
                      ["セキュリティ", product.scores.security],
                      ["拡張性", product.scores.extensibility],
                      ["サポート", product.scores.support],
                      ["導入のしやすさ", product.scores.ease],
                    ] as const
                  ).map(([label, score]) => (
                    <div key={label} className="flex items-center justify-between gap-3">
                      <dt className="text-sm text-muted">{label}</dt>
                      <dd>
                        <ScoreBar score={score} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>

              <Card className="p-4">
                <p className="text-xs font-bold tracking-wide text-muted">対応範囲</p>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs text-muted">対応業界</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {product.industrySlugs.map((slug) => {
                        const ind = industryBySlug(slug);
                        return ind ? (
                          <Link key={slug} href={`/industries/${slug}`}>
                            <Badge>{ind.name}</Badge>
                          </Link>
                        ) : null;
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">対応する課題</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {product.challengeSlugs.map((slug) => {
                        const ch = challengeBySlug(slug);
                        return ch ? (
                          <Link key={slug} href={`/challenges/${slug}`}>
                            <Badge tone="accent">{ch.name}</Badge>
                          </Link>
                        ) : null;
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">想定する会社規模</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {product.companySizes.map((size) => (
                        <Badge key={size}>{companySizeLabels[size]}</Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Card>
            </div>
          </section>

          {/* 機能一覧 */}
          <section id="features" className="scroll-mt-28 pt-10">
            <h2 className="text-lg font-bold">機能一覧</h2>
            <Card className="mt-3 divide-y divide-border">
              {product.features.map((f) => (
                <div key={f.name} className="flex items-start gap-3 px-4 py-3">
                  <span
                    className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                      f.included ? "bg-accent/15 text-accent" : "bg-surface-2 text-muted"
                    }`}
                    aria-hidden
                  >
                    {f.included ? "✓" : "−"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${f.included ? "" : "text-muted"}`}>
                      {f.name}
                      <span className="sr-only">{f.included ? "：対応" : "：非対応"}</span>
                    </p>
                    {f.note ? <p className="mt-0.5 text-xs text-muted">{f.note}</p> : null}
                  </div>
                </div>
              ))}
            </Card>
          </section>

          {/* 価格 */}
          <section id="pricing" className="scroll-mt-28 pt-10">
            <h2 className="text-lg font-bold">価格・ライセンス</h2>
            <Card className="mt-3 p-5">
              <p className="text-2xl font-bold">{formatPrice(product)}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 text-muted">ライセンス</dt>
                  <dd>{product.licenseModel}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 text-muted">無料トライアル</dt>
                  <dd>{product.freeTrial ? "あり" : "なし（デモ・PoC で評価）"}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 text-muted">提供形態</dt>
                  <dd>{product.cloud ? "クラウド" : "オンプレミス"}</dd>
                </div>
              </dl>
              <p className="mt-4 rounded-lg bg-surface-2 px-3 py-2 text-xs text-muted">
                表示価格は最小構成の目安です。実際の見積りは構成・契約期間で変動します。
              </p>
            </Card>
          </section>

          {/* デモ */}
          <section id="demos" className="scroll-mt-28 pt-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-lg font-bold">デモ</h2>
              <Link href={`/demos?product=${product.id}`} className="text-sm text-accent hover:underline">
                デモセンターで見る →
              </Link>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {demos.map((demo) => (
                <Card key={demo.id} className="flex flex-col p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-accent" aria-hidden>
                      {demoTypeMeta[demo.type].icon}
                    </span>
                    <Badge tone="accent">{demo.type}</Badge>
                    <span className="text-xs text-muted tabular-nums">{demo.durationMin}分</span>
                  </div>
                  <p className="mt-2.5 text-sm font-bold">{demo.title}</p>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                    {demo.description}
                  </p>
                  <div className="mt-3">
                    {demo.requiresBooking ? (
                      <LeadForm product={product} intent="demo" variant="secondary" label="デモを申し込む" />
                    ) : (
                      <button
                        type="button"
                        className="w-full rounded-lg bg-surface-2 px-4 py-2 text-sm font-medium hover:bg-border"
                      >
                        ▶ すぐに視聴する
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 導入事例 */}
          <section id="cases" className="scroll-mt-28 pt-10">
            <h2 className="text-lg font-bold">導入事例</h2>
            {cases.length === 0 ? (
              <p className="mt-3 text-sm text-muted">この製品の事例は準備中です。</p>
            ) : (
              <div className="mt-3 space-y-3">
                {cases.map((c) => {
                  const ind = industryBySlug(c.industrySlug);
                  return (
                    <Card key={c.id} className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        {ind ? <Badge tone="brand">{ind.name}</Badge> : null}
                        <Badge>{companySizeLabels[c.companySize]}</Badge>
                        {c.hasVideo ? <Badge tone="accent">▶ 動画あり</Badge> : null}
                      </div>
                      <p className="mt-2.5 font-bold">{c.title}</p>
                      <p className="mt-1 text-xs text-muted">{c.company}</p>
                      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
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
                      <p className="mt-4 rounded-lg bg-accent/10 px-3 py-2 text-sm font-bold text-accent">
                        {c.roi}
                      </p>
                      <blockquote className="mt-3 border-l-2 border-border pl-3 text-xs leading-relaxed text-muted">
                        「{c.interview.quote}」
                        <footer className="mt-1 not-italic">— {c.interview.person}</footer>
                      </blockquote>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* AI 質問 */}
          <section className="pt-10">
            <ProductAskAi product={product} />
          </section>

          {/* レビュー */}
          <section id="reviews" className="scroll-mt-28 pt-10">
            <h2 className="text-lg font-bold">レビュー</h2>
            <Card className="mt-3 p-5">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-4xl font-black tabular-nums">{product.rating.toFixed(1)}</p>
                  <Stars rating={product.rating} />
                  <p className="mt-1 text-xs text-muted tabular-nums">{product.reviewCount}件</p>
                </div>
                <dl className="min-w-48 flex-1 space-y-1">
                  {ratingBuckets.map((b) => (
                    <div key={b.star} className="flex items-center gap-2">
                      <dt className="w-8 shrink-0 text-xs text-muted tabular-nums">{b.star}★</dt>
                      <dd className="flex flex-1 items-center gap-2">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                          <span
                            className="block h-full bg-amber-500"
                            style={{
                              width: reviews.length ? `${(b.count / reviews.length) * 100}%` : "0%",
                            }}
                          />
                        </span>
                        <span className="w-6 shrink-0 text-right text-xs text-muted tabular-nums">
                          {b.count}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-4 text-xs text-muted">
                ※ 掲載しているのは、このデモ環境に登録された {reviews.length} 件の抜粋です。
              </p>
            </Card>

            <div className="mt-3 space-y-3">
              {reviews.map((r) => (
                <Card key={r.id} className="p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Stars rating={r.rating} />
                    <p className="text-sm font-bold">{r.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                  <p className="mt-3 text-xs text-muted">
                    {r.author}（{r.role}） / {r.company} / {r.postedAt}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-28 pt-10">
            <h2 className="text-lg font-bold">よくある質問</h2>
            <Card className="mt-3 divide-y divide-border">
              {product.faqs.map((faq) => (
                <details key={faq.question} className="group px-4 py-3.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium">
                    {faq.question}
                    <span className="shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden>
                      ＋
                    </span>
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </Card>
          </section>

          {/* 関連製品 */}
          {related.length > 0 ? (
            <section className="pt-10">
              <h2 className="text-lg font-bold">同じカテゴリの製品と比較する</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {related.map((p) => (
                  <Card key={p.id} className="p-4">
                    <div className="flex items-center gap-2.5">
                      <ProductLogo product={p} size={32} />
                      <div className="min-w-0">
                        <Link href={`/products/${p.id}`} className="block truncate text-sm font-bold hover:underline">
                          {p.name}
                        </Link>
                        <Stars rating={p.rating} />
                      </div>
                    </div>
                    <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted">{p.summary}</p>
                    <div className="mt-3">
                      <CompareToggle product={p} />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* サイドの CTA */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <p className="text-xs font-bold tracking-wide text-muted">この製品を試す</p>
            <p className="mt-2 text-lg font-bold">{formatPrice(product)}</p>
            <p className="text-xs text-muted">{product.licenseModel}</p>

            <div className="mt-4 space-y-2">
              {product.freeTrial ? (
                <LeadForm product={product} intent="trial" />
              ) : (
                <LeadForm product={product} intent="demo" />
              )}
              <LeadForm product={product} intent="document" variant="secondary" />
              <LeadForm product={product} intent="contact" variant="secondary" />
              <div className="pt-1">
                <CompareToggle product={product} />
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs font-bold tracking-wide text-muted">ダウンロードできる資料</p>
              <ul className="mt-2 space-y-1.5">
                {product.documents.map((doc) => (
                  <li key={doc.title} className="flex items-center justify-between gap-2 text-xs">
                    <span className="truncate">{doc.title}</span>
                    <span className="shrink-0 text-muted tabular-nums">{doc.pages}P</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs text-muted">
                導入の進め方に迷っていますか？
                <Link href="/consultants" className="ml-1 font-medium text-accent hover:underline">
                  コンサルタントに相談
                </Link>
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
