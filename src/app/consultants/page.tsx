import type { Metadata } from "next";
import { Badge, Card, Stars } from "@/components/ui";
import { consultants } from "@/lib/data/misc";
import { industryBySlug } from "@/lib/data/taxonomy";

export const metadata: Metadata = {
  title: "コンサルタント",
  description: "製品選定の前に、要件整理から相談できる専門家を探せます。",
};

export default function ConsultantsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">コンサルタント</h1>
      <p className="mt-1.5 text-sm text-muted">
        製品を決める前に、要件そのものを整理したいときに。得意分野と実績から選べます。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {consultants.map((c) => (
          <Card key={c.id} className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-bold text-white"
                style={{ background: c.accent }}
                aria-hidden
              >
                {c.initial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">{c.name}</h2>
                  <Badge tone={c.available ? "accent" : "neutral"}>
                    {c.available ? "相談枠あり" : "満席"}
                  </Badge>
                </div>
                <p className="text-sm text-muted">{c.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <Stars rating={c.rating} />
                  <span className="text-xs text-muted tabular-nums">レビュー {c.reviewCount}件</span>
                  <span className="text-xs text-muted tabular-nums">実績 {c.projects}件</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">{c.bio}</p>

            <dl className="mt-4 space-y-2.5 border-t border-border pt-4">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-xs text-muted">得意分野</dt>
                <dd className="flex flex-wrap gap-1">
                  {c.specialties.map((s) => (
                    <Badge key={s} tone="accent">
                      {s}
                    </Badge>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-xs text-muted">対応業界</dt>
                <dd className="flex flex-wrap gap-1">
                  {c.industrySlugs.map((s) => (
                    <Badge key={s}>{industryBySlug(s)?.name}</Badge>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-xs text-muted">料金</dt>
                <dd className="text-sm font-bold tabular-nums">
                  {c.hourlyFee.toLocaleString("ja-JP")}円 / 時
                </dd>
              </div>
            </dl>

            <button
              type="button"
              disabled={!c.available}
              className="mt-4 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90 disabled:opacity-40"
            >
              {c.available ? "相談を予約する" : "現在予約を受け付けていません"}
            </button>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">
        ※ デモ環境のため、予約機能は動作しません。
      </p>
    </div>
  );
}
