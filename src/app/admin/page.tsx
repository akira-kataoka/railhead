import type { Metadata } from "next";
import { StubNotice } from "@/components/ui";

export const metadata: Metadata = { title: "管理者画面" };

export default function AdminPage() {
  return (
    <StubNotice
      title="管理者画面"
      body="RAILHEAD 運営側の管理画面です。認証・権限とデータの書き込みが前提になるため、このプロトタイプでは未実装です。"
      items={[
        "ユーザー管理",
        "掲載企業管理",
        "製品管理",
        "コンサルタント管理",
        "パートナー管理",
        "広告管理",
        "レビュー管理",
        "AI管理",
        "売上管理",
        "KPIダッシュボード",
        "マッチング管理",
      ]}
    />
  );
}
