import { casesByProduct } from "@/lib/data/cases";
import { demosByProduct } from "@/lib/data/demos";
import { products } from "@/lib/data/products";
import { categoryBySlug, challengeBySlug, companySizeLabels, industryBySlug } from "@/lib/data/taxonomy";
import { formatPrice, recommendScore } from "@/lib/query";
import type { CompanySize, Product } from "@/lib/types";

/**
 * 本番では LLM に投げる想定の部分を、キーワード一致で代替したモック。
 * 回答の骨組み（どの情報を根拠に何を答えるか）を先に固めるのが狙い。
 */

interface Topic {
  keywords: string[];
  answer: (product: Product) => string;
}

const topics: Topic[] = [
  {
    keywords: ["価格", "料金", "費用", "いくら", "コスト", "予算"],
    answer: (p) =>
      `${p.name} の価格は ${formatPrice(p)} です。ライセンス体系は「${p.licenseModel}」となっています。` +
      (p.freeTrial
        ? "無料トライアルが用意されているので、契約前に自社データで試せます。"
        : "無料トライアルは提供されていません。デモまたは PoC での評価が前提になります。"),
  },
  {
    keywords: ["トライアル", "無料", "お試し", "試せ", "評価"],
    answer: (p) =>
      p.freeTrial
        ? `${p.name} は無料トライアルに対応しています。トライアル申込みから、実際の環境で自社の運用を想定した検証ができます。`
        : `${p.name} は無料トライアルを提供していません。デモ環境での評価、または有償 PoC での検証が一般的な進め方です。デモセンターから実機デモを申し込めます。`,
  },
  {
    keywords: ["セキュリティ", "監査", "権限", "認証", "安全"],
    answer: (p) => {
      const level = ["", "限定的", "標準的", "十分", "強い", "非常に強い"][p.scores.security];
      return (
        `${p.name} のセキュリティ評価は 5段階中 ${p.scores.security}（${level}）です。` +
        (p.certified
          ? "第三者認証を取得した認定製品で、規制業種での導入実績があります。"
          : "認定製品ではないため、規制の厳しい業種では個別に要件確認が必要です。")
      );
    },
  },
  {
    keywords: ["導入", "期間", "どのくらい", "工数", "難易度", "立ち上げ"],
    answer: (p) => {
      const ease = ["", "非常に重い", "重い", "標準的", "やさしい", "非常にやさしい"][p.scores.ease];
      const span = ["", "12か月以上", "6〜12か月", "3〜6か月", "1〜3か月", "数日〜2週間"][p.scores.ease];
      return `${p.name} の導入難易度は「${ease}」で、標準的な導入期間の目安は ${span} です。サポート評価は 5段階中 ${p.scores.support} です。`;
    },
  },
  {
    keywords: ["ai", "生成ai", "llm", "エージェント", "agent"],
    answer: (p) =>
      p.aiReady
        ? `${p.name} は AI 対応製品です（AI 評価 5段階中 ${p.scores.ai}）。${
            p.features.filter((f) => f.included && /AI|自然言語|エージェント/i.test(f.name))
              .map((f) => f.name)
              .join("、") || "AI 機能"
          }を備えています。デモセンターの AI デモで実際に試せます。`
        : `${p.name} は現時点で AI 機能を主要機能として提供していません。AI 活用が要件に含まれる場合は、同カテゴリの AI 対応製品との比較をおすすめします。`,
  },
  {
    keywords: ["連携", "api", "接続", "インテグレーション", "繋"],
    answer: (p) =>
      `${p.name} の拡張性評価は 5段階中 ${p.scores.extensibility} です。${
        p.faqs.find((f) => /連携|繋|システム/.test(f.question))?.answer ??
        "詳細な連携仕様は製品資料をご確認ください。"
      }`,
  },
  {
    keywords: ["業界", "事例", "実績", "導入企業", "他社"],
    answer: (p) => {
      const inds = p.industrySlugs.map((s) => industryBySlug(s)?.name).filter(Boolean).join("、");
      const cases = casesByProduct(p.id);
      return (
        `${p.name} は ${p.customerCount.toLocaleString("ja-JP")}社に導入されており、対応業界は ${inds} です。` +
        (cases.length
          ? `このサイトには ${cases.map((c) => c.company).join("、")} の事例が掲載されています。`
          : "")
      );
    },
  },
  {
    keywords: ["デモ", "体験", "触"],
    answer: (p) => {
      const ds = demosByProduct(p.id);
      if (!ds.length) return `${p.name} のデモは現在準備中です。`;
      const free = ds.filter((d) => !d.requiresBooking);
      return (
        `${p.name} には ${ds.length}件のデモがあります（${[...new Set(ds.map((d) => d.type))].join("、")}）。` +
        (free.length
          ? `うち ${free.length}件は申込み不要で、このページからすぐ視聴できます。`
          : "いずれも申込みが必要です。")
      );
    },
  },
  {
    keywords: ["規模", "人数", "従業員", "中小", "大企業"],
    answer: (p) =>
      `${p.name} が想定する会社規模は ${p.companySizes.map((s) => companySizeLabels[s]).join("、")} です。この範囲から外れる場合、機能過多または機能不足になりやすいので、同カテゴリの他製品と比較することをおすすめします。`,
  },
  {
    keywords: ["国産", "海外", "日本語", "サポート"],
    answer: (p) =>
      `${p.name} は${p.origin}製品で、サポート評価は 5段階中 ${p.scores.support} です。${
        p.origin === "国産"
          ? "日本語サポートと国内の商習慣への対応が期待できます。"
          : "日本語対応の範囲はプランによって異なる場合があるため、契約前の確認をおすすめします。"
      }`,
  },
];

export function answerProductQuestion(product: Product, question: string): string {
  const q = question.toLowerCase();

  const hit = topics.find((t) => t.keywords.some((k) => q.includes(k.toLowerCase())));
  if (hit) return hit.answer(product);

  // 製品固有の FAQ に寄せられそうなら、そちらを返す
  const faq = product.faqs.find((f) =>
    f.question
      .toLowerCase()
      .split(/[、。？\s]/)
      .filter((w) => w.length > 2)
      .some((w) => q.includes(w)),
  );
  if (faq) return faq.answer;

  return `${product.name} について、その観点はまだ学習データに含まれていません。価格・セキュリティ・導入期間・連携・デモ・導入実績といった切り口であればお答えできます。個別の要件は「お問い合わせ」からベンダーに直接確認できます。`;
}

export const suggestedQuestions = [
  "価格はいくらですか？",
  "導入にどのくらいかかりますか？",
  "セキュリティ要件は満たせますか？",
  "既存システムと連携できますか？",
  "無料で試せますか？",
];

export interface ConsultInput {
  industrySlug: string;
  companySize: CompanySize | "";
  challengeSlugs: string[];
  budget: string;
  timeline: string;
  note: string;
}

export interface Recommendation {
  product: Product;
  score: number;
  reasons: string[];
  concerns: string[];
  monthlyCost: number;
  monthlyCostNote: string;
  durationLabel: string;
}

const budgetCeilings: Record<string, number> = {
  "〜10万円 / 月": 100_000,
  "10〜50万円 / 月": 500_000,
  "50〜200万円 / 月": 2_000_000,
  "200万円 / 月〜": Number.MAX_SAFE_INTEGER,
};

export const budgetOptions = Object.keys(budgetCeilings);
export const timelineOptions = ["1か月以内", "3か月以内", "6か月以内", "1年以内", "未定"];

const seatsFor = (size: CompanySize | ""): number => {
  switch (size) {
    case "1-50":
      return 20;
    case "51-300":
      return 80;
    case "301-1000":
      return 250;
    case "1001+":
      return 600;
    default:
      return 80;
  }
};

/** ユーザー課金の製品は席数を掛け、固定費の製品はそのまま。概算なので桁感が合えばよい */
const estimateMonthlyCost = (product: Product, size: CompanySize | "") => {
  const perSeat = product.priceUnit.includes("ユーザー");
  if (!perSeat) {
    return { cost: product.priceFrom, note: `${product.priceUnit}の最小構成` };
  }
  const seats = seatsFor(size);
  return { cost: product.priceFrom * seats, note: `${seats}ユーザー想定` };
};

const durationFor = (product: Product) =>
  ["", "12か月以上", "6〜12か月", "3〜6か月", "1〜3か月", "数日〜2週間"][product.scores.ease];

export function recommendProducts(input: ConsultInput): Recommendation[] {
  const ceiling = budgetCeilings[input.budget] ?? Number.MAX_SAFE_INTEGER;
  const wantsFast = input.timeline === "1か月以内" || input.timeline === "3か月以内";
  const note = input.note.toLowerCase();

  const scored = products.map((product) => {
    const reasons: string[] = [];
    const concerns: string[] = [];
    let score = recommendScore(product) * 0.1;

    if (input.industrySlug && product.industrySlugs.includes(input.industrySlug)) {
      score += 30;
      reasons.push(`${industryBySlug(input.industrySlug)?.name}での導入実績があります`);
    } else if (input.industrySlug) {
      score -= 25;
      concerns.push(`${industryBySlug(input.industrySlug)?.name}向けの主要な対応業界には含まれていません`);
    }

    const matchedChallenges = input.challengeSlugs.filter((s) => product.challengeSlugs.includes(s));
    score += matchedChallenges.length * 22;
    if (matchedChallenges.length) {
      const names = matchedChallenges.map((s) => challengeBySlug(s)?.name).filter(Boolean);
      reasons.push(`挙げていただいた課題のうち「${names.join("・")}」に直接効きます`);
    }
    const unmatched = input.challengeSlugs.filter((s) => !product.challengeSlugs.includes(s));
    if (unmatched.length && matchedChallenges.length) {
      const names = unmatched.map((s) => challengeBySlug(s)?.name).filter(Boolean);
      concerns.push(`「${names.join("・")}」はこの製品の対象外で、別製品との組み合わせが必要です`);
    }

    if (input.companySize && product.companySizes.includes(input.companySize)) {
      score += 20;
      reasons.push(`${companySizeLabels[input.companySize]}規模を想定した製品です`);
    } else if (input.companySize) {
      score -= 20;
      concerns.push(
        `想定規模は${product.companySizes.map((s) => companySizeLabels[s]).join("、")}で、ご入力の規模とはずれがあります`,
      );
    }

    const { cost, note: costNote } = estimateMonthlyCost(product, input.companySize);
    if (cost <= ceiling) {
      score += 18;
      reasons.push(`概算費用がご予算の範囲に収まります`);
    } else {
      score -= 30;
      concerns.push(`概算費用がご予算を上回ります（${costNote}）`);
    }

    if (wantsFast) {
      if (product.scores.ease >= 4) {
        score += 20;
        reasons.push(`${durationFor(product)}で立ち上がるため、ご希望の時期に間に合います`);
      } else if (product.scores.ease <= 2) {
        score -= 25;
        concerns.push(`標準的な導入期間が${durationFor(product)}で、ご希望の時期には収まりません`);
      }
    }

    if (note) {
      if (/国産|日本|国内/.test(note) && product.origin === "国産") {
        score += 12;
        reasons.push("国産製品で、国内サポート・商習慣への対応が期待できます");
      }
      if (/ai|生成/.test(note) && product.aiReady) {
        score += 12;
        reasons.push(`AI 機能を備えています（AI 評価 ${product.scores.ai}/5）`);
      }
      if (/セキュリティ|監査|規制/.test(note) && product.scores.security >= 4) {
        score += 12;
        reasons.push(`セキュリティ評価が ${product.scores.security}/5 と高い水準です`);
      }
    }

    if (product.freeTrial) {
      score += 6;
      reasons.push("無料トライアルがあり、契約前に検証できます");
    }

    return {
      product,
      score,
      reasons: reasons.slice(0, 4),
      concerns: concerns.slice(0, 2),
      monthlyCost: cost,
      monthlyCostNote: costNote,
      durationLabel: durationFor(product),
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

export const categoryNameOf = (product: Product) => categoryBySlug(product.categorySlug)?.name ?? "";
