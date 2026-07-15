import { Suspense } from "react";
import type { Metadata } from "next";
import { DemoCenter } from "@/components/demo-center";

export const metadata: Metadata = {
  title: "デモセンター",
  description:
    "動画デモ・紙芝居デモ・実機デモ・ハンズオン・Agentデモ・AIデモ。営業を介さず製品を体験できます。",
};

export default function DemosPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-sm text-muted">読み込み中…</div>}>
      <DemoCenter />
    </Suspense>
  );
}
