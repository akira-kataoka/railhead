import type { Metadata } from "next";
import { StubNotice } from "@/components/ui";

export const metadata: Metadata = { title: "マイページ" };

export default function MyPage() {
  return (
    <StubNotice
      title="マイページ"
      body="ログイン基盤とユーザーごとの履歴保存が必要なため、このプロトタイプでは未実装です。現時点で比較リストのみ、ブラウザのローカルストレージに保存しています。"
      items={[
        "お気に入り製品",
        "比較履歴",
        "閲覧履歴",
        "デモ視聴履歴",
        "AI相談履歴",
        "資料ダウンロード履歴",
        "問い合わせ履歴",
        "契約中の製品",
        "履歴からのおすすめ製品",
      ]}
    />
  );
}
