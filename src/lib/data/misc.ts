export interface Consultant {
  id: string;
  name: string;
  title: string;
  initial: string;
  accent: string;
  specialties: string[];
  industrySlugs: string[];
  rating: number;
  reviewCount: number;
  projects: number;
  available: boolean;
  hourlyFee: number;
  bio: string;
}

export const consultants: Consultant[] = [
  {
    id: "cons-01",
    name: "藤代 涼",
    title: "SFA / CRM 導入コンサルタント",
    initial: "藤",
    accent: "#4f46e5",
    specialties: ["営業効率化", "顧客管理", "定着支援"],
    industrySlugs: ["manufacturing", "distribution", "retail"],
    rating: 4.8,
    reviewCount: 34,
    projects: 62,
    available: true,
    hourlyFee: 25_000,
    bio: "SFA が定着しない現場を専門に見てきました。ツール選定より運用設計が9割です。",
  },
  {
    id: "cons-02",
    name: "岩瀬 千夏",
    title: "データ基盤アーキテクト",
    initial: "岩",
    accent: "#0d9488",
    specialties: ["データ活用", "BI", "指標設計"],
    industrySlugs: ["retail", "finance", "manufacturing"],
    rating: 4.9,
    reviewCount: 21,
    projects: 38,
    available: false,
    hourlyFee: 35_000,
    bio: "部門ごとに数字が食い違う組織の指標定義を、合意形成から一緒に整理します。",
  },
  {
    id: "cons-03",
    name: "黒川 亮太",
    title: "AI / 業務自動化コンサルタント",
    initial: "黒",
    accent: "#7c3aed",
    specialties: ["AI活用", "DX推進", "PoC設計"],
    industrySlugs: ["manufacturing", "distribution", "healthcare"],
    rating: 4.6,
    reviewCount: 27,
    projects: 45,
    available: true,
    hourlyFee: 30_000,
    bio: "PoC で終わらせない設計が専門です。投資対効果の出し方から逆算して要件を組みます。",
  },
  {
    id: "cons-04",
    name: "南 悠里",
    title: "セキュリティガバナンス支援",
    initial: "南",
    accent: "#0369a1",
    specialties: ["セキュリティ", "監査対応", "ゼロトラスト移行"],
    industrySlugs: ["finance", "government", "healthcare"],
    rating: 4.7,
    reviewCount: 19,
    projects: 31,
    available: true,
    hourlyFee: 32_000,
    bio: "規制業種のゼロトラスト移行を支援します。段階移行の計画づくりが得意です。",
  },
];

export interface Partner {
  id: string;
  name: string;
  initial: string;
  accent: string;
  region: string;
  productIds: string[];
  industrySlugs: string[];
  employees: string;
  certifications: string[];
  rating: number;
  reviewCount: number;
  projects: number;
  summary: string;
}

export const partners: Partner[] = [
  {
    id: "p-01",
    name: "北都システムインテグレーション",
    initial: "北",
    accent: "#1d4ed8",
    region: "北海道・東北",
    productIds: ["nexus-sales-cloud", "soraho-sfa", "datacanvas"],
    industrySlugs: ["manufacturing", "distribution"],
    employees: "301〜1000名",
    certifications: ["Nexus 認定プレミア", "DataCanvas 認定"],
    rating: 4.5,
    reviewCount: 18,
    projects: 140,
    summary: "地場の製造業を中心に、SFA と BI の導入から定着まで一貫して支援。",
  },
  {
    id: "p-02",
    name: "クロスリンク・パートナーズ",
    initial: "ク",
    accent: "#0891b2",
    region: "関東",
    productIds: ["agentforge", "lumen-analytics", "beacon-ma"],
    industrySlugs: ["finance", "retail", "distribution"],
    employees: "51〜300名",
    certifications: ["AgentForge 認定", "Lumen 認定パートナー"],
    rating: 4.7,
    reviewCount: 26,
    projects: 88,
    summary: "AI エージェントとデータ基盤に特化。PoC から本番運用までを短期で回します。",
  },
  {
    id: "p-03",
    name: "浪速ビジネスソリューションズ",
    initial: "浪",
    accent: "#b45309",
    region: "近畿",
    productIds: ["takumi-erp", "soraho-sfa", "koyomi-ai"],
    industrySlugs: ["manufacturing", "distribution"],
    employees: "301〜1000名",
    certifications: ["匠ERP 認定ゴールド", "こよみAI 認定"],
    rating: 4.4,
    reviewCount: 22,
    projects: 210,
    summary: "個別受注生産の中堅製造業に強い。ERP 導入実績200件超。",
  },
  {
    id: "p-04",
    name: "セキュアブリッジ株式会社",
    initial: "セ",
    accent: "#0369a1",
    region: "全国",
    productIds: ["zerogate", "trustline"],
    industrySlugs: ["finance", "government", "healthcare"],
    employees: "51〜300名",
    certifications: ["ZeroGate 認定エキスパート", "TRUSTLINE 認定"],
    rating: 4.6,
    reviewCount: 15,
    projects: 64,
    summary: "規制業種のゼロトラスト移行と監査対応を専門に扱います。",
  },
];

export interface EventItem {
  id: string;
  kind: "ウェビナー" | "展示会" | "セミナー" | "アーカイブ";
  title: string;
  host: string;
  date: string;
  format: string;
  seats: string;
  free: boolean;
  summary: string;
}

export const events: EventItem[] = [
  {
    id: "e-01",
    kind: "ウェビナー",
    title: "SFA が定着しない3つの理由と、その潰し方",
    host: "ソラホ株式会社",
    date: "2026-07-24",
    format: "オンライン",
    seats: "定員300名",
    free: true,
    summary: "過去に SFA 導入を失敗した企業の共通点を、実際の失注データから分析します。",
  },
  {
    id: "e-02",
    kind: "ウェビナー",
    title: "AI エージェントを本番業務に載せるための設計原則",
    host: "Forge Systems",
    date: "2026-07-30",
    format: "オンライン",
    seats: "定員500名",
    free: true,
    summary: "PoC で止まるエージェントと、本番に載るエージェントの分岐点を解説します。",
  },
  {
    id: "e-03",
    kind: "展示会",
    title: "RAILHEAD EXPO 2026 — 製品を触って選ぶ2日間",
    host: "RAILHEAD",
    date: "2026-08-06",
    format: "東京ビッグサイト",
    seats: "事前登録制",
    free: true,
    summary: "掲載企業40社が実機デモを持ち込みます。営業トークなしで触れる展示会です。",
  },
  {
    id: "e-04",
    kind: "セミナー",
    title: "個別受注生産のための ERP 選定ワークショップ",
    host: "匠システムズ株式会社",
    date: "2026-08-19",
    format: "大阪 / 会場開催",
    seats: "定員30名",
    free: false,
    summary: "自社の生産形態を持ち込み、Fit&Gap の考え方をその場で手を動かして学びます。",
  },
  {
    id: "e-05",
    kind: "アーカイブ",
    title: "ゼロトラスト移行、最初の90日で何をするか",
    host: "Gatewell",
    date: "2026-06-11",
    format: "アーカイブ動画（52分）",
    seats: "いつでも視聴可",
    free: true,
    summary: "VPN を一気に外さずに移行を始めるための、最初の3か月の進め方。",
  },
  {
    id: "e-06",
    kind: "ウェビナー",
    title: "監査対応を3か月から3週間にした企業の話",
    host: "トラストライン株式会社",
    date: "2026-08-27",
    format: "オンライン",
    seats: "定員200名",
    free: true,
    summary: "証跡収集の自動化で監査シーズンをどう乗り切ったか、担当者が語ります。",
  },
];

export interface Article {
  id: string;
  category: "製品解説" | "業界ニュース" | "AI活用" | "DX事例" | "比較記事" | "ランキング" | "リリース";
  title: string;
  excerpt: string;
  publishedAt: string;
  readMin: number;
}

export const articles: Article[] = [
  {
    id: "a-01",
    category: "比較記事",
    title: "SFA 主要2製品を、定着率の観点だけで比べてみた",
    excerpt:
      "機能比較表はどのメディアにもあります。この記事では「入力され続けるか」という一点に絞って2製品を比較します。",
    publishedAt: "2026-07-14",
    readMin: 8,
  },
  {
    id: "a-02",
    category: "AI活用",
    title: "AI エージェントの PoC が本番に載らない、たった1つの理由",
    excerpt:
      "精度でも費用でもありません。承認プロセスを設計に織り込めているかどうかで結果が分かれています。",
    publishedAt: "2026-07-10",
    readMin: 6,
  },
  {
    id: "a-03",
    category: "ランキング",
    title: "2026年上期 デモ視聴数ランキング TOP10",
    excerpt:
      "RAILHEAD で実際に視聴されたデモを集計しました。検討の初期にどこを見られているかが分かります。",
    publishedAt: "2026-07-07",
    readMin: 4,
  },
  {
    id: "a-04",
    category: "DX事例",
    title: "自治体が5年進まなかったテンプレート整備を、AI で迂回した話",
    excerpt:
      "課題を正面から解かず、前提ごと消す。青葉市役所の議事録業務改善から学べること。",
    publishedAt: "2026-07-02",
    readMin: 7,
  },
  {
    id: "a-05",
    category: "業界ニュース",
    title: "国産 ERP が個別受注生産で選ばれ続ける構造的な理由",
    excerpt:
      "グローバル ERP のアドオン費用が半分を占める構造を、商習慣対応という観点から解きほぐします。",
    publishedAt: "2026-06-28",
    readMin: 9,
  },
  {
    id: "a-06",
    category: "リリース",
    title: "DataCanvas、自然言語でのダッシュボード生成をベータ提供開始",
    excerpt: "Excel ライクな操作を保ったまま、自然言語での作成が選べるようになりました。",
    publishedAt: "2026-06-24",
    readMin: 3,
  },
];
