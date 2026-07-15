import type { Metadata } from "next";
import { Badge, Card } from "@/components/ui";
import { articles } from "@/lib/data/misc";

export const metadata: Metadata = {
  title: "コラム・ナレッジ",
  description: "製品解説・業界ニュース・AI活用・DX事例・比較記事・ランキング・最新リリース情報。",
};

export default function ColumnsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">コラム・ナレッジ</h1>
      <p className="mt-1.5 text-sm text-muted">
        製品比較の観点、業界の動き、AI 活用の実際。検討の材料になる記事をまとめています。
      </p>

      <div className="mt-6 space-y-3">
        {articles.map((a) => (
          <Card key={a.id} as="article" className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{a.category}</Badge>
              <span className="text-xs text-muted tabular-nums">{a.publishedAt}</span>
              <span className="text-xs text-muted tabular-nums">{a.readMin}分で読めます</span>
            </div>
            <h2 className="mt-2.5 text-lg leading-snug font-bold">{a.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.excerpt}</p>
            <p className="mt-3 text-xs font-medium text-accent">続きを読む →</p>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">※ デモ環境のため、記事本文は未実装です。</p>
    </div>
  );
}
