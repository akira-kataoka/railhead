import type { Metadata } from "next";
import { Badge, Card } from "@/components/ui";
import { events } from "@/lib/data/misc";

export const metadata: Metadata = {
  title: "ウェビナー・イベント",
  description: "ウェビナー・展示会・セミナー・アーカイブ動画。情報収集の起点に。",
};

export default function EventsPage() {
  const upcoming = events.filter((e) => e.kind !== "アーカイブ");
  const archived = events.filter((e) => e.kind === "アーカイブ");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">ウェビナー・イベント</h1>
      <p className="mt-1.5 text-sm text-muted">
        掲載企業が開催するウェビナー・展示会・セミナーと、見逃した回のアーカイブ。
      </p>

      <h2 className="mt-8 mb-3 text-lg font-bold">開催予定</h2>
      <div className="space-y-3">
        {upcoming.map((e) => (
          <Card key={e.id} className="flex flex-wrap items-start gap-4 p-5">
            <div className="w-16 shrink-0 rounded-lg bg-surface-2 py-2.5 text-center">
              <p className="text-[10px] text-muted">{e.date.slice(5, 7)}月</p>
              <p className="text-xl leading-tight font-black tabular-nums">{e.date.slice(8, 10)}</p>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge tone="brand">{e.kind}</Badge>
                {e.free ? <Badge tone="accent">無料</Badge> : <Badge tone="warn">有料</Badge>}
              </div>
              <h3 className="mt-2 leading-snug font-bold">{e.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.summary}</p>
              <p className="mt-2 text-xs text-muted">
                {e.host} / {e.format} / {e.seats}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
            >
              申し込む
            </button>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 mb-3 text-lg font-bold">アーカイブ動画</h2>
      <div className="space-y-3">
        {archived.map((e) => (
          <Card key={e.id} className="flex flex-wrap items-start gap-4 p-5">
            <div className="min-w-0 flex-1">
              <Badge tone="accent">▶ {e.kind}</Badge>
              <h3 className="mt-2 leading-snug font-bold">{e.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.summary}</p>
              <p className="mt-2 text-xs text-muted">
                {e.host} / {e.format}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-surface-2"
            >
              視聴する
            </button>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">※ デモ環境のため、申込み・視聴は動作しません。</p>
    </div>
  );
}
