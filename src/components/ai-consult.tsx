"use client";

import Link from "next/link";
import { useState } from "react";
import { CompareToggle } from "@/components/product-card";
import { Badge, Card, ProductLogo, ScoreBar, Stars } from "@/components/ui";
import {
  budgetOptions,
  categoryNameOf,
  recommendProducts,
  timelineOptions,
  type ConsultInput,
  type Recommendation,
} from "@/lib/ai";
import { products } from "@/lib/data/products";
import { challenges, companySizeLabels, companySizes, industries } from "@/lib/data/taxonomy";
import { formatPrice } from "@/lib/query";
import type { CompanySize } from "@/lib/types";

const emptyInput: ConsultInput = {
  industrySlug: "",
  companySize: "",
  challengeSlugs: [],
  budget: "",
  timeline: "",
  note: "",
};

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent";

export function AiConsult() {
  const [input, setInput] = useState<ConsultInput>(emptyInput);
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [thinking, setThinking] = useState(false);

  const canSubmit = input.industrySlug && input.companySize && input.challengeSlugs.length > 0;

  const submit = () => {
    if (!canSubmit || thinking) return;
    setThinking(true);
    setResults(null);
    // 実装時はここを API 呼び出しに差し替える
    setTimeout(() => {
      setResults(recommendProducts(input));
      setThinking(false);
    }, 900);
  };

  const toggleChallenge = (slug: string) =>
    setInput((prev) => ({
      ...prev,
      challengeSlugs: prev.challengeSlugs.includes(slug)
        ? prev.challengeSlugs.filter((s) => s !== slug)
        : [...prev.challengeSlugs, slug],
    }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-7 text-center">
        <span className="grad-brand mx-auto grid h-14 w-14 place-items-center rounded-2xl text-2xl text-white shadow-lg">
          <span aria-hidden>✦</span>
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          条件を教えてください。
          <br />
          <span className="grad-text">最適な3製品を提案します。</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
          おすすめの理由だけでなく、確認すべき懸念点・概算費用・導入期間まで併せて出します。
          入力は30秒、相談は無料です。
        </p>
      </div>

      <Card className="p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-bold">
              業界 <span className="text-accent">*</span>
            </span>
            <select
              value={input.industrySlug}
              onChange={(e) => setInput({ ...input, industrySlug: e.target.value })}
              className={fieldClass}
            >
              <option value="">選択してください</option>
              {industries.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-bold">
              従業員数 <span className="text-accent">*</span>
            </span>
            <select
              value={input.companySize}
              onChange={(e) => setInput({ ...input, companySize: e.target.value as CompanySize })}
              className={fieldClass}
            >
              <option value="">選択してください</option>
              {companySizes.map((s) => (
                <option key={s} value={s}>
                  {companySizeLabels[s]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-bold">予算</span>
            <select
              value={input.budget}
              onChange={(e) => setInput({ ...input, budget: e.target.value })}
              className={fieldClass}
            >
              <option value="">指定しない</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-bold">導入予定時期</span>
            <select
              value={input.timeline}
              onChange={(e) => setInput({ ...input, timeline: e.target.value })}
              className={fieldClass}
            >
              <option value="">指定しない</option>
              {timelineOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="text-xs font-bold">
            課題（複数選択可） <span className="text-accent">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {challenges.map((c) => {
              const active = input.challengeSlugs.includes(c.slug);
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => toggleChallenge(c.slug)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-accent bg-accent text-white"
                      : "border-border text-muted hover:bg-surface-2 hover:text-foreground"
                  }`}
                >
                  <span aria-hidden className="mr-1">
                    {c.icon}
                  </span>
                  {c.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="mt-5 block">
          <span className="text-xs font-bold">補足（任意）</span>
          <textarea
            value={input.note}
            onChange={(e) => setInput({ ...input, note: e.target.value })}
            rows={3}
            placeholder="例：国産製品を優先したい。既存の基幹システムと連携させたい。監査対応が必須。"
            className={`${fieldClass} resize-none`}
          />
        </label>

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit || thinking}
          className="grad-brand mt-6 w-full rounded-xl px-5 py-4 text-[15px] font-black text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg disabled:pointer-events-none disabled:opacity-40"
        >
          {thinking ? "提案を作成しています…" : "AIに提案してもらう →"}
        </button>
        {!canSubmit ? (
          <p className="mt-2 text-center text-xs text-muted">
            業界・従業員数・課題は必須です
          </p>
        ) : null}
      </Card>

      {thinking ? (
        <div className="mt-8">
          <p className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-accent">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="pulse-ring absolute inset-0 rounded-full" />
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            {products.length}製品を条件に照らしています…
          </p>
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="shimmer h-36 rounded-2xl border border-border" />
            ))}
          </div>
        </div>
      ) : null}

      {results ? <ConsultResults input={input} results={results} /> : null}
    </div>
  );
}

function ConsultResults({ input, results }: { input: ConsultInput; results: Recommendation[] }) {
  const industryName = industries.find((i) => i.slug === input.industrySlug)?.name;
  const challengeNames = input.challengeSlugs
    .map((s) => challenges.find((c) => c.slug === s)?.name)
    .filter(Boolean);

  return (
    <div className="mt-8">
      <Card className="border-accent/30 bg-accent/5 p-5">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded bg-accent/15 text-xs text-accent">
            ✦
          </span>
          <div>
            <p className="text-sm font-bold">提案</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {industryName}・{input.companySize ? companySizeLabels[input.companySize] : ""}規模で、
              「{challengeNames.join("・")}」を課題として挙げていただきました。
              {input.budget ? `予算は${input.budget}、` : ""}
              {input.timeline && input.timeline !== "未定" ? `導入時期は${input.timeline}という前提で、` : ""}
              掲載製品の中から条件への合致度が高い3件を選びました。懸念点も併せて記載しています。
            </p>
          </div>
        </div>
      </Card>

      {/* 提案 */}
      <div className="mt-4 space-y-4">
        {results.map((rec, i) => (
          <Card
            key={rec.product.id}
            className={`lift p-5 ${i === 0 ? "border-accent/40 shadow-pop" : ""}`}
          >
            {i === 0 ? (
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1 text-[11px] font-black text-white">
                ★ 条件への合致度がいちばん高い製品
              </p>
            ) : null}
            <div className="flex flex-wrap items-start gap-3">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-black ${
                  i === 0 ? "grad-brand text-white shadow-md" : "bg-surface-2 text-muted"
                }`}
              >
                {i + 1}
              </span>
              <ProductLogo product={rec.product} size={44} />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${rec.product.id}`}
                  className="text-lg font-bold hover:underline"
                >
                  {rec.product.name}
                </Link>
                <p className="text-xs text-muted">{rec.product.vendor}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Stars rating={rec.product.rating} />
                  <Badge tone="brand">{categoryNameOf(rec.product)}</Badge>
                  <Badge>{rec.product.origin}</Badge>
                </div>
              </div>
              <div className="shrink-0">
                <CompareToggle product={rec.product} />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-surface-2 px-3 py-2.5">
                <p className="text-[11px] text-muted">概算費用</p>
                <p className="mt-0.5 text-sm font-bold tabular-nums">
                  月額 {rec.monthlyCost.toLocaleString("ja-JP")}円
                </p>
                <p className="text-[11px] text-muted">{rec.monthlyCostNote}</p>
              </div>
              <div className="rounded-lg bg-surface-2 px-3 py-2.5">
                <p className="text-[11px] text-muted">導入期間の目安</p>
                <p className="mt-0.5 text-sm font-bold">{rec.durationLabel}</p>
                <p className="text-[11px] text-muted">{formatPrice(rec.product)}</p>
              </div>
              <div className="rounded-lg bg-surface-2 px-3 py-2.5">
                <p className="text-[11px] text-muted">AI / セキュリティ</p>
                <div className="mt-1 space-y-1">
                  <ScoreBar score={rec.product.scores.ai} label={`AI ${rec.product.scores.ai}/5`} />
                  <ScoreBar
                    score={rec.product.scores.security}
                    label={`セキュリティ ${rec.product.scores.security}/5`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold text-accent">おすすめする理由</p>
                <ul className="mt-1.5 space-y-1.5">
                  {rec.reasons.map((r) => (
                    <li key={r} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted">
                      <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
                        ✓
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              {rec.concerns.length ? (
                <div>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400">確認したい点</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {rec.concerns.map((c) => (
                      <li key={c} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted">
                        <span className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden>
                          !
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
              <Link
                href={`/products/${rec.product.id}`}
                className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-brand-fg hover:opacity-90"
              >
                詳細を見る
              </Link>
              <Link
                href={`/demos?product=${rec.product.id}`}
                className="rounded-lg border border-border px-4 py-2 text-xs font-medium hover:bg-surface-2"
              >
                デモを見る
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* 比較表 */}
      <Card className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="px-4 pt-4 text-left text-sm font-bold">提案した3製品の比較</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-bold text-muted">項目</th>
              {results.map((r) => (
                <th key={r.product.id} className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap">
                  {r.product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["概算費用（月額）", (r: Recommendation) => `${r.monthlyCost.toLocaleString("ja-JP")}円`],
                ["導入期間", (r: Recommendation) => r.durationLabel],
                ["評価", (r: Recommendation) => `${r.product.rating.toFixed(1)} / 5`],
                ["提供元", (r: Recommendation) => r.product.origin],
                ["AI対応", (r: Recommendation) => (r.product.aiReady ? "○" : "×")],
                ["無料トライアル", (r: Recommendation) => (r.product.freeTrial ? "○" : "×")],
                ["認定製品", (r: Recommendation) => (r.product.certified ? "○" : "×")],
                [
                  "導入企業数",
                  (r: Recommendation) => `${r.product.customerCount.toLocaleString("ja-JP")}社`,
                ],
              ] as const
            ).map(([label, render]) => (
              <tr key={label} className="border-b border-border last:border-b-0">
                <td className="px-4 py-2.5 text-xs text-muted whitespace-nowrap">{label}</td>
                {results.map((r) => (
                  <td key={r.product.id} className="px-4 py-2.5 tabular-nums">
                    {render(r)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 次の一手 */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Card className="p-5">
          <p className="text-sm font-bold">おすすめのパートナー企業</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            {industryName}での導入実績があり、提案した製品に対応できる認定パートナーを紹介します。
          </p>
          <Link
            href="/partners"
            className="mt-3 inline-block text-xs font-medium text-accent hover:underline"
          >
            パートナー企業を見る →
          </Link>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-bold">おすすめのコンサルタント</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            「{challengeNames.join("・")}」を得意分野とするコンサルタントに、要件整理から相談できます。
          </p>
          <Link
            href="/consultants"
            className="mt-3 inline-block text-xs font-medium text-accent hover:underline"
          >
            コンサルタントを探す →
          </Link>
        </Card>
      </div>

      <p className="mt-4 text-xs text-muted">
        ※ デモ環境のため、提案は掲載データに対するルールベースのスコアリング結果です。概算費用は最小構成の単価に想定席数を掛けた目安で、実際の見積りとは異なります。
      </p>
    </div>
  );
}
