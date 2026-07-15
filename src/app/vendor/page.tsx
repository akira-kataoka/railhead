import type { Metadata } from "next";
import { StubNotice } from "@/components/ui";

export const metadata: Metadata = { title: "掲載企業管理画面" };

export default function VendorPage() {
  return (
    <StubNotice
      title="掲載企業管理画面"
      body="製品を掲載するベンダー向けの管理画面です。認証・権限とデータの書き込みが前提になるため、このプロトタイプでは未実装です。"
      items={[
        "製品管理",
        "動画管理",
        "デモ管理",
        "導入事例管理",
        "AI学習データ管理",
        "リード管理",
        "問い合わせ管理",
        "資料管理",
        "アクセス解析",
        "広告管理",
        "契約管理",
      ]}
    />
  );
}
