import type { Metadata } from "next";
import Link from "next/link";
import { CompareTable } from "@/components/compare-table";

export const metadata: Metadata = {
  title: "製品比較",
  description: "選んだ製品を、価格・機能・AI・セキュリティ・サポート・導入難易度で横並びに比較します。",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">製品比較</h1>
        <p className="mt-1.5 text-sm text-muted">
          選んだ製品を横並びで比較します。判断がつかないときは
          <Link href="/ai-consult" className="mx-1 font-medium text-accent hover:underline">
            AI相談
          </Link>
          で要件を伝えると、絞り込みの観点を提示します。
        </p>
      </div>
      <CompareTable />
    </div>
  );
}
