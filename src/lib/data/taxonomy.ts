import type { Category, Challenge, CompanySize, Industry } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "sfa-crm",
    name: "SFA / CRM",
    description: "商談管理から顧客データ基盤まで、営業活動の中核を担う製品群。",
    icon: "◎",
  },
  {
    slug: "ma",
    name: "MA / マーケティング",
    description: "リード獲得・育成・スコアリングを自動化する製品群。",
    icon: "◈",
  },
  {
    slug: "bi",
    name: "BI / データ分析",
    description: "社内データを可視化し、意思決定を支える分析基盤。",
    icon: "▤",
  },
  {
    slug: "ai-agent",
    name: "AI / Agent",
    description: "生成AIとエージェントによる業務自動化プラットフォーム。",
    icon: "✦",
  },
  {
    slug: "security",
    name: "セキュリティ",
    description: "ID管理・ゼロトラスト・監査対応を担う製品群。",
    icon: "⛨",
  },
  {
    slug: "erp",
    name: "ERP / 基幹",
    description: "会計・人事・生産を統合する基幹業務システム。",
    icon: "▣",
  },
];

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    name: "製造業",
    description: "生産計画・品質管理・サプライチェーンの最適化が主要テーマ。",
    icon: "⚙",
  },
  {
    slug: "finance",
    name: "金融",
    description: "規制対応とセキュリティを前提に、顧客体験の刷新が進む領域。",
    icon: "¥",
  },
  {
    slug: "government",
    name: "自治体",
    description: "住民サービスのデジタル化と、ガバメントクラウド対応が焦点。",
    icon: "⛩",
  },
  {
    slug: "healthcare",
    name: "医療",
    description: "電子カルテ連携と個人情報保護を両立する運用が求められる領域。",
    icon: "✚",
  },
  {
    slug: "education",
    name: "教育",
    description: "学習データの利活用と、校務のペーパーレス化が進む領域。",
    icon: "✎",
  },
  {
    slug: "distribution",
    name: "流通",
    description: "在庫最適化と物流コスト削減が経営課題に直結する領域。",
    icon: "⇄",
  },
  {
    slug: "retail",
    name: "小売",
    description: "OMO・顧客ID統合による購買体験の設計が競争軸。",
    icon: "▦",
  },
];

export const challenges: Challenge[] = [
  {
    slug: "sales-efficiency",
    name: "営業効率化",
    description: "商談化率と生産性を上げ、属人化した営業活動を仕組みに変える。",
    icon: "↗",
  },
  {
    slug: "dx",
    name: "DX推進",
    description: "紙・Excel 業務を撤廃し、全社の業務プロセスを再設計する。",
    icon: "⟳",
  },
  {
    slug: "ai",
    name: "AI活用",
    description: "生成AIを実業務に組み込み、投資対効果まで見える化する。",
    icon: "✦",
  },
  {
    slug: "data",
    name: "データ活用",
    description: "散在するデータを統合し、意思決定のスピードを上げる。",
    icon: "▤",
  },
  {
    slug: "marketing",
    name: "マーケティング",
    description: "リード獲得から商談化までを一気通貫で計測・改善する。",
    icon: "◈",
  },
  {
    slug: "security",
    name: "セキュリティ",
    description: "ゼロトラスト移行と監査対応の負荷を下げる。",
    icon: "⛨",
  },
  {
    slug: "crm",
    name: "顧客管理",
    description: "顧客情報を一元化し、部門をまたいだ体験を設計する。",
    icon: "◎",
  },
];

export const companySizes: CompanySize[] = ["1-50", "51-300", "301-1000", "1001+"];

export const companySizeLabels: Record<CompanySize, string> = {
  "1-50": "〜50名",
  "51-300": "51〜300名",
  "301-1000": "301〜1000名",
  "1001+": "1001名〜",
};

export const priceBands = [
  { id: "free", label: "無料あり", min: 0, max: 0 },
  { id: "low", label: "〜5万円 / 月", min: 1, max: 50_000 },
  { id: "mid", label: "5〜20万円 / 月", min: 50_001, max: 200_000 },
  { id: "high", label: "20万円 / 月〜", min: 200_001, max: Number.MAX_SAFE_INTEGER },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
export const challengeBySlug = (slug: string) => challenges.find((c) => c.slug === slug);
