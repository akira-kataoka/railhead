export type CompanySize = "1-50" | "51-300" | "301-1000" | "1001+";

export type Origin = "国産" | "海外";

export type DemoType =
  | "動画デモ"
  | "紙芝居デモ"
  | "実機デモ"
  | "ハンズオン"
  | "Agentデモ"
  | "AIデモ";

/** 1=低 / 5=高。比較表のバー表示に使う */
export type Score = 1 | 2 | 3 | 4 | 5;

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Challenge {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Feature {
  name: string;
  /** 該当機能を備えるか。false は「比較表で×を出す」ために明示的に持つ */
  included: boolean;
  note?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  role: string;
  company: string;
  industrySlug: string;
  rating: number;
  title: string;
  body: string;
  postedAt: string;
}

export interface Demo {
  id: string;
  productId: string;
  type: DemoType;
  title: string;
  description: string;
  /** 分 */
  durationMin: number;
  industrySlugs: string[];
  scenario: string;
  /** 実機デモ・ハンズオンは申込みが要る */
  requiresBooking: boolean;
  views: number;
}

export interface CaseStudy {
  id: string;
  productId: string;
  company: string;
  industrySlug: string;
  companySize: CompanySize;
  challengeSlugs: string[];
  title: string;
  before: string;
  solution: string;
  effect: string;
  roi: string;
  hasVideo: boolean;
  interview: { quote: string; person: string };
}

export interface Product {
  id: string;
  name: string;
  vendor: string;
  /** ロゴ代わりのモノグラム */
  logo: string;
  accent: string;
  categorySlug: string;
  summary: string;
  description: string;
  rating: number;
  reviewCount: number;
  /** 月額・円。0 は無料あり */
  priceFrom: number;
  priceUnit: string;
  licenseModel: string;
  industrySlugs: string[];
  challengeSlugs: string[];
  companySizes: CompanySize[];
  cloud: boolean;
  aiReady: boolean;
  origin: Origin;
  freeTrial: boolean;
  certified: boolean;
  customerCount: number;
  publishedAt: string;
  features: Feature[];
  faqs: Faq[];
  scores: {
    ai: Score;
    security: Score;
    extensibility: Score;
    support: Score;
    /** 高いほど「導入がやさしい」。比較表では導入難易度として反転表示する */
    ease: Score;
  };
  highlights: { title: string; body: string }[];
  documents: { title: string; pages: number }[];
}
