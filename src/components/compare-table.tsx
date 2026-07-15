"use client";

import Link from "next/link";
import { useState } from "react";
import { useCompare, MAX_COMPARE } from "@/components/compare-context";
import { Badge, ProductLogo, ScoreBar, Stars } from "@/components/ui";
import { demosByProduct } from "@/lib/data/demos";
import { products, productById } from "@/lib/data/products";
import { categoryBySlug, companySizeLabels, industryBySlug } from "@/lib/data/taxonomy";
import { formatPrice } from "@/lib/query";
import type { Product } from "@/lib/types";

const th = "sticky left-0 z-10 bg-surface-2 px-4 py-3 text-left align-top text-xs font-bold w-40 min-w-40";
const td = "border-l border-border px-4 py-3 text-left align-top text-sm min-w-56";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr className="border-t border-border">
      <th scope="row" className={th}>
        {label}
      </th>
      {children}
    </tr>
  );
}

/** 導入難易度は ease（高いほどやさしい）を反転して見せる */
const difficultyLabel = (ease: number) =>
  ["", "非常に重い", "重い", "標準的", "やさしい", "非常にやさしい"][ease];

function ProductPicker({ onPick, disabledIds }: { onPick: (id: string) => void; disabledIds: string[] }) {
  const [open, setOpen] = useState(false);
  const available = products.filter((p) => !disabledIds.includes(p.id));

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-lg border border-dashed border-border px-4 py-8 text-sm font-medium text-muted hover:border-accent hover:text-accent"
        aria-expanded={open}
      >
        ＋ 製品を追加
      </button>
      {open ? (
        <div className="absolute top-full left-0 z-30 mt-1 max-h-72 w-64 overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg">
          {available.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onPick(p.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded px-2 py-2 text-left hover:bg-surface-2"
            >
              <ProductLogo product={p} size={26} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{p.name}</span>
                <span className="block truncate text-xs text-muted">
                  {categoryBySlug(p.categorySlug)?.name}
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CompareTable() {
  const { ids, toggle, remove, clear, ready } = useCompare();

  if (!ready) {
    return <p className="py-16 text-center text-sm text-muted">読み込み中…</p>;
  }

  const picked: Product[] = ids.map(productById).filter((p) => p !== undefined);

  if (picked.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center">
        <p className="font-semibold">比較する製品が選ばれていません</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          製品一覧や製品詳細の「＋ 比較」ボタンから、最大{MAX_COMPARE}件まで追加できます。
        </p>
        <Link
          href="/products"
          className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
        >
          製品を探す
        </Link>
      </div>
    );
  }

  // 選択中の製品に登場する機能名を全て集めて、製品ごとに ○ / × / − を出す
  const allFeatureNames = [...new Set(picked.flatMap((p) => p.features.map((f) => f.name)))];

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted tabular-nums">
          {picked.length} / {MAX_COMPARE} 件を比較中
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-medium text-accent hover:underline"
        >
          すべてクリア
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full border-collapse">
          <caption className="sr-only">選択した製品の比較表</caption>
          <thead>
            <tr>
              <th scope="col" className={`${th} sticky top-0 z-20`}>
                <span className="sr-only">比較項目</span>
              </th>
              {picked.map((p) => (
                <th key={p.id} scope="col" className={`${td} bg-surface`}>
                  <div className="flex items-start justify-between gap-2">
                    <ProductLogo product={p} size={36} />
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="grid h-5 w-5 place-items-center rounded text-muted hover:bg-surface-2 hover:text-foreground"
                      aria-label={`${p.name} を比較から外す`}
                    >
                      ✕
                    </button>
                  </div>
                  <Link
                    href={`/products/${p.id}`}
                    className="mt-2 block font-bold hover:underline"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs font-normal text-muted">{p.vendor}</p>
                </th>
              ))}
              {picked.length < MAX_COMPARE ? (
                <th scope="col" className={`${td} bg-surface`}>
                  <ProductPicker onPick={toggle} disabledIds={ids} />
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            <Row label="カテゴリ">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <Badge tone="brand">{categoryBySlug(p.categorySlug)?.name}</Badge>
                </td>
              ))}
            </Row>

            <Row label="価格">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <p className="font-bold">{formatPrice(p)}</p>
                  <p className="mt-1 text-xs text-muted">{p.licenseModel}</p>
                </td>
              ))}
            </Row>

            <Row label="レビュー">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <Stars rating={p.rating} size="md" />
                  <p className="mt-1 text-xs text-muted tabular-nums">{p.reviewCount}件</p>
                </td>
              ))}
            </Row>

            <Row label="導入企業数">
              {picked.map((p) => (
                <td key={p.id} className={`${td} font-bold tabular-nums`}>
                  {p.customerCount.toLocaleString("ja-JP")}社
                </td>
              ))}
            </Row>

            <Row label="AI機能">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <ScoreBar score={p.scores.ai} />
                </td>
              ))}
            </Row>

            <Row label="セキュリティ">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <ScoreBar score={p.scores.security} />
                </td>
              ))}
            </Row>

            <Row label="拡張性">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <ScoreBar score={p.scores.extensibility} />
                </td>
              ))}
            </Row>

            <Row label="サポート">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <ScoreBar score={p.scores.support} />
                </td>
              ))}
            </Row>

            <Row label="導入難易度">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <ScoreBar score={6 - p.scores.ease} label={difficultyLabel(p.scores.ease)} />
                </td>
              ))}
            </Row>

            <Row label="デモ">
              {picked.map((p) => {
                const ds = demosByProduct(p.id);
                return (
                  <td key={p.id} className={td}>
                    <p className="text-sm tabular-nums">{ds.length}件</p>
                    <p className="mt-1 text-xs text-muted">
                      {[...new Set(ds.map((d) => d.type))].join("、") || "—"}
                    </p>
                  </td>
                );
              })}
            </Row>

            <Row label="対応業界">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <div className="flex flex-wrap gap-1">
                    {p.industrySlugs.map((s) => (
                      <Badge key={s}>{industryBySlug(s)?.name}</Badge>
                    ))}
                  </div>
                </td>
              ))}
            </Row>

            <Row label="想定する会社規模">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <div className="flex flex-wrap gap-1">
                    {p.companySizes.map((s) => (
                      <Badge key={s}>{companySizeLabels[s]}</Badge>
                    ))}
                  </div>
                </td>
              ))}
            </Row>

            <Row label="提供元 / 形態">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <div className="flex flex-wrap gap-1">
                    <Badge>{p.origin}</Badge>
                    {p.cloud ? <Badge>クラウド</Badge> : null}
                    {p.freeTrial ? <Badge tone="accent">無料トライアル</Badge> : null}
                    {p.certified ? <Badge tone="warn">認定製品</Badge> : null}
                  </div>
                </td>
              ))}
            </Row>

            <tr className="border-t border-border">
              <th scope="row" colSpan={picked.length + 2} className="bg-surface-2 px-4 py-2 text-left text-xs font-bold">
                機能
              </th>
            </tr>

            {allFeatureNames.map((name) => (
              <Row key={name} label={name}>
                {picked.map((p) => {
                  const f = p.features.find((x) => x.name === name);
                  return (
                    <td key={p.id} className={td}>
                      {f === undefined ? (
                        <span className="text-muted" title="この製品では未掲載の機能です">
                          −
                        </span>
                      ) : (
                        <>
                          <span className={f.included ? "text-accent" : "text-muted"}>
                            {f.included ? "○" : "×"}
                          </span>
                          {f.note ? <p className="mt-0.5 text-xs text-muted">{f.note}</p> : null}
                        </>
                      )}
                    </td>
                  );
                })}
              </Row>
            ))}

            <Row label="">
              {picked.map((p) => (
                <td key={p.id} className={td}>
                  <Link
                    href={`/products/${p.id}`}
                    className="block rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-brand-fg hover:opacity-90"
                  >
                    詳細を見る
                  </Link>
                </td>
              ))}
            </Row>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted">
        「−」はその製品の掲載情報に該当機能の記載がないことを示します（非対応とは限りません）。
      </p>
    </>
  );
}
