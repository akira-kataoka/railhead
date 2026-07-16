"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { LeadForm } from "@/components/lead-form";
import { Badge, Card, EmptyState, ProductLogo, Stat } from "@/components/ui";
import { demoTypeMeta, demoTypes, demos } from "@/lib/data/demos";
import { productById } from "@/lib/data/products";
import { industries } from "@/lib/data/taxonomy";
import type { DemoType } from "@/lib/types";

const scenarios = [...new Set(demos.map((d) => d.scenario))].sort();

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-border text-muted hover:bg-surface-2 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function DemoCenter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const industry = searchParams.get("industry");
  const scenario = searchParams.get("scenario");
  const productId = searchParams.get("product");

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === null || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `/demos?${qs}` : "/demos", { scroll: false });
  };

  const results = useMemo(
    () =>
      demos.filter((d) => {
        if (type && d.type !== type) return false;
        if (industry && !d.industrySlugs.includes(industry)) return false;
        if (scenario && d.scenario !== scenario) return false;
        if (productId && d.productId !== productId) return false;
        return true;
      }),
    [type, industry, scenario, productId],
  );

  const focusedProduct = productId ? productById(productId) : undefined;
  const hasFilters = Boolean(type || industry || scenario || productId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-7">
        <p className="mb-1.5 text-[11px] font-black tracking-[0.18em] text-accent uppercase">
          Demo center
        </p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          触ってから、<span className="grad-text">決める。</span>
        </h1>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
          動画・紙芝居・AIデモは申込み不要でその場から見られます。実機デモとハンズオンだけ、日程調整が必要です。
        </p>
        <dl className="mt-6 flex gap-8 border-t border-border pt-5">
          <Stat value={`${demos.length}本`} label="デモ" />
          <Stat value={`${demos.filter((d) => !d.requiresBooking).length}本`} label="申込み不要" />
          <Stat value={`${demoTypes.length}種類`} label="デモ形式" />
        </dl>
      </div>

      {focusedProduct ? (
        <Card className="mb-6 flex flex-wrap items-center gap-3 p-4">
          <ProductLogo product={focusedProduct} size={36} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{focusedProduct.name} のデモ</p>
            <p className="text-xs text-muted">{focusedProduct.vendor}</p>
          </div>
          <button
            type="button"
            onClick={() => setParam("product", null)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface-2"
          >
            すべての製品のデモを見る
          </button>
        </Card>
      ) : null}

      {/* デモ種別 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {demoTypes.map((t) => {
          const count = demos.filter((d) => d.type === t).length;
          const active = type === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setParam("type", t as DemoType)}
              aria-pressed={active}
              className={`rounded-xl border p-4 text-left transition-colors ${
                active ? "border-accent bg-accent/5" : "border-border bg-surface hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base text-accent" aria-hidden>
                  {demoTypeMeta[t].icon}
                </span>
                <span className="text-sm font-bold">{t}</span>
                <span className="ml-auto text-xs text-muted tabular-nums">{count}件</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{demoTypeMeta[t].description}</p>
            </button>
          );
        })}
      </div>

      {/* 業界・シナリオ */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-xs font-bold text-muted">業界別</span>
          {industries.map((i) => (
            <Chip key={i.slug} active={industry === i.slug} onClick={() => setParam("industry", i.slug)}>
              {i.name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-xs font-bold text-muted">シナリオ別</span>
          {scenarios.map((s) => (
            <Chip key={s} active={scenario === s} onClick={() => setParam("scenario", s)}>
              {s}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="font-bold text-foreground tabular-nums">{results.length}</span> 件のデモ
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => router.replace("/demos", { scroll: false })}
            className="text-xs font-medium text-accent hover:underline"
          >
            条件をクリア
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="条件に合うデモが見つかりませんでした"
          body="条件を減らすか、製品詳細ページからデモの申込みをリクエストできます。"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((demo) => {
            const product = productById(demo.productId);
            if (!product) return null;
            return (
              <Card key={demo.id} className="lift group flex flex-col overflow-hidden">
                {/* サムネイル代わりの面。実装時は動画のポスター画像に差し替える */}
                <div
                  className="relative grid h-36 place-items-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${product.accent}, ${product.accent}70)` }}
                >
                  <span className="absolute inset-0 opacity-25 mix-blend-overlay" aria-hidden>
                    <span className="rails absolute inset-0" />
                  </span>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/20 text-2xl text-white backdrop-blur transition-transform group-hover:scale-110">
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

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2">
                    <Badge tone="accent">{demo.type}</Badge>
                    {demo.requiresBooking ? <Badge tone="warn">要申込み</Badge> : null}
                  </div>

                  <p className="mt-2.5 font-bold">{demo.title}</p>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                    {demo.description}
                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-3 flex items-center gap-2 text-xs text-muted hover:text-foreground"
                  >
                    <ProductLogo product={product} size={20} />
                    <span className="truncate font-medium">{product.name}</span>
                  </Link>

                  <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted">
                    <span className="truncate">{demo.scenario}</span>
                    <span className="shrink-0 tabular-nums">{demo.views.toLocaleString("ja-JP")} 回視聴</span>
                  </div>

                  <div className="mt-3">
                    {demo.requiresBooking ? (
                      <LeadForm product={product} intent="demo" variant="secondary" label="デモを申し込む" />
                    ) : (
                      <button
                        type="button"
                        className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-fg hover:opacity-90"
                      >
                        ▶ すぐに視聴する
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
