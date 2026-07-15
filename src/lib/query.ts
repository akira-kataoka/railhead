import { products } from "@/lib/data/products";
import { priceBands } from "@/lib/data/taxonomy";
import type { CompanySize, Origin, Product } from "@/lib/types";

export interface ProductFilters {
  q: string;
  categories: string[];
  industries: string[];
  challenges: string[];
  priceBands: string[];
  companySizes: CompanySize[];
  cloud: boolean;
  aiReady: boolean;
  origins: Origin[];
  freeTrial: boolean;
  certified: boolean;
}

export const emptyFilters: ProductFilters = {
  q: "",
  categories: [],
  industries: [],
  challenges: [],
  priceBands: [],
  companySizes: [],
  cloud: false,
  aiReady: false,
  origins: [],
  freeTrial: false,
  certified: false,
};

export type SortKey = "recommended" | "rating" | "reviews" | "price-asc" | "price-desc" | "newest";

export const sortLabels: Record<SortKey, string> = {
  recommended: "おすすめ順",
  rating: "評価が高い順",
  reviews: "レビューが多い順",
  "price-asc": "価格が安い順",
  "price-desc": "価格が高い順",
  newest: "新着順",
};

const matchesPriceBand = (product: Product, bandIds: string[]) => {
  if (bandIds.length === 0) return true;
  return bandIds.some((id) => {
    const band = priceBands.find((b) => b.id === id);
    if (!band) return false;
    return product.priceFrom >= band.min && product.priceFrom <= band.max;
  });
};

const matchesText = (product: Product, q: string) => {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    product.name,
    product.vendor,
    product.summary,
    product.description,
    ...product.features.map((f) => f.name),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
};

/** 「おすすめ順」のスコア。評価・レビュー数・認定・導入社数を混ぜた見せかけのランキング */
export const recommendScore = (product: Product) =>
  product.rating * 20 +
  Math.log10(product.reviewCount + 1) * 8 +
  Math.log10(product.customerCount + 1) * 4 +
  (product.certified ? 6 : 0);

export const filterProducts = (filters: ProductFilters, sort: SortKey = "recommended") => {
  const result = products.filter((product) => {
    if (!matchesText(product, filters.q)) return false;
    if (filters.categories.length && !filters.categories.includes(product.categorySlug)) return false;
    if (
      filters.industries.length &&
      !filters.industries.some((slug) => product.industrySlugs.includes(slug))
    )
      return false;
    if (
      filters.challenges.length &&
      !filters.challenges.some((slug) => product.challengeSlugs.includes(slug))
    )
      return false;
    if (!matchesPriceBand(product, filters.priceBands)) return false;
    if (
      filters.companySizes.length &&
      !filters.companySizes.some((size) => product.companySizes.includes(size))
    )
      return false;
    if (filters.cloud && !product.cloud) return false;
    if (filters.aiReady && !product.aiReady) return false;
    if (filters.origins.length && !filters.origins.includes(product.origin)) return false;
    if (filters.freeTrial && !product.freeTrial) return false;
    if (filters.certified && !product.certified) return false;
    return true;
  });

  const sorted = [...result];
  switch (sort) {
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "reviews":
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "price-asc":
      sorted.sort((a, b) => a.priceFrom - b.priceFrom);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.priceFrom - a.priceFrom);
      break;
    case "newest":
      sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      break;
    default:
      sorted.sort((a, b) => recommendScore(b) - recommendScore(a));
  }
  return sorted;
};

export const activeFilterCount = (filters: ProductFilters) =>
  filters.categories.length +
  filters.industries.length +
  filters.challenges.length +
  filters.priceBands.length +
  filters.companySizes.length +
  filters.origins.length +
  (filters.cloud ? 1 : 0) +
  (filters.aiReady ? 1 : 0) +
  (filters.freeTrial ? 1 : 0) +
  (filters.certified ? 1 : 0);

export const formatPrice = (product: Product) => {
  if (product.priceFrom === 0) return "無料プランあり";
  return `${product.priceFrom.toLocaleString("ja-JP")}円〜 / ${product.priceUnit}`;
};

export const formatPriceShort = (product: Product) => {
  if (product.priceFrom === 0) return "無料〜";
  if (product.priceFrom >= 10_000) return `${(product.priceFrom / 10_000).toLocaleString("ja-JP")}万円〜`;
  return `${product.priceFrom.toLocaleString("ja-JP")}円〜`;
};
