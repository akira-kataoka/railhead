import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product-browser";

export const metadata: Metadata = {
  title: "製品を探す",
  description:
    "カテゴリ・業界・課題・価格・会社規模などの条件で製品を絞り込み、最大4件まで比較できます。",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-sm text-muted">読み込み中…</div>}>
      <ProductBrowser />
    </Suspense>
  );
}
