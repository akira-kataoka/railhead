"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Badge, EmptyState } from "@/components/ui";
import {
  categories,
  challenges,
  companySizeLabels,
  companySizes,
  industries,
  priceBands,
} from "@/lib/data/taxonomy";
import {
  activeFilterCount,
  emptyFilters,
  filterProducts,
  sortLabels,
  type ProductFilters,
  type SortKey,
} from "@/lib/query";
import type { CompanySize, Origin } from "@/lib/types";

const origins: Origin[] = ["国産", "海外"];

/** URL のクエリ文字列 <-> フィルタ状態。ページをリロード・共有しても絞り込みが残るようにする */
const parseFilters = (params: URLSearchParams): ProductFilters => {
  const list = (key: string) => params.get(key)?.split(",").filter(Boolean) ?? [];
  return {
    q: params.get("q") ?? "",
    categories: list("cat"),
    industries: list("ind"),
    challenges: list("ch"),
    priceBands: list("price"),
    companySizes: list("size").filter((v): v is CompanySize =>
      (companySizes as string[]).includes(v),
    ),
    origins: list("origin").filter((v): v is Origin => (origins as string[]).includes(v)),
    cloud: params.get("cloud") === "1",
    aiReady: params.get("ai") === "1",
    freeTrial: params.get("trial") === "1",
    certified: params.get("cert") === "1",
  };
};

const buildQuery = (filters: ProductFilters, sort: SortKey) => {
  const params = new URLSearchParams();
  const setList = (key: string, values: string[]) => {
    if (values.length) params.set(key, values.join(","));
  };
  if (filters.q.trim()) params.set("q", filters.q.trim());
  setList("cat", filters.categories);
  setList("ind", filters.industries);
  setList("ch", filters.challenges);
  setList("price", filters.priceBands);
  setList("size", filters.companySizes);
  setList("origin", filters.origins);
  if (filters.cloud) params.set("cloud", "1");
  if (filters.aiReady) params.set("ai", "1");
  if (filters.freeTrial) params.set("trial", "1");
  if (filters.certified) params.set("cert", "1");
  if (sort !== "recommended") params.set("sort", sort);
  return params.toString();
};

function CheckRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 shrink-0 accent-[var(--accent)]"
      />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {hint ? <span className="shrink-0 text-xs text-muted tabular-nums">{hint}</span> : null}
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <p className="mb-1.5 text-xs font-bold tracking-wide text-muted">{title}</p>
      {children}
    </div>
  );
}

export function ProductBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );
  const sort = (searchParams.get("sort") as SortKey) ?? "recommended";
  const [draftQuery, setDraftQuery] = useState(filters.q);
  const [panelOpen, setPanelOpen] = useState(false);

  const apply = useCallback(
    (next: ProductFilters, nextSort: SortKey = sort) => {
      const qs = buildQuery(next, nextSort);
      router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
    },
    [router, sort],
  );

  const toggleIn = useCallback(
    <K extends keyof ProductFilters>(key: K, value: string) => {
      const current = filters[key] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      apply({ ...filters, [key]: next });
    },
    [filters, apply],
  );

  const toggleFlag = useCallback(
    (key: "cloud" | "aiReady" | "freeTrial" | "certified") => {
      apply({ ...filters, [key]: !filters[key] });
    },
    [filters, apply],
  );

  const results = useMemo(() => filterProducts(filters, sort), [filters, sort]);
  const count = activeFilterCount(filters);

  const panel = (
    <div className="divide-y divide-border">
      <FilterGroup title="カテゴリ">
        {categories.map((c) => (
          <CheckRow
            key={c.slug}
            label={c.name}
            checked={filters.categories.includes(c.slug)}
            onChange={() => toggleIn("categories", c.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="業界">
        {industries.map((i) => (
          <CheckRow
            key={i.slug}
            label={i.name}
            checked={filters.industries.includes(i.slug)}
            onChange={() => toggleIn("industries", i.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="課題">
        {challenges.map((c) => (
          <CheckRow
            key={c.slug}
            label={c.name}
            checked={filters.challenges.includes(c.slug)}
            onChange={() => toggleIn("challenges", c.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="価格">
        {priceBands.map((b) => (
          <CheckRow
            key={b.id}
            label={b.label}
            checked={filters.priceBands.includes(b.id)}
            onChange={() => toggleIn("priceBands", b.id)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="会社規模">
        {companySizes.map((s) => (
          <CheckRow
            key={s}
            label={companySizeLabels[s]}
            checked={filters.companySizes.includes(s)}
            onChange={() => toggleIn("companySizes", s)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="提供元">
        {origins.map((o) => (
          <CheckRow
            key={o}
            label={o}
            checked={filters.origins.includes(o)}
            onChange={() => toggleIn("origins", o)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="その他の条件">
        <CheckRow label="クラウド" checked={filters.cloud} onChange={() => toggleFlag("cloud")} />
        <CheckRow label="AI対応" checked={filters.aiReady} onChange={() => toggleFlag("aiReady")} />
        <CheckRow
          label="無料トライアル"
          checked={filters.freeTrial}
          onChange={() => toggleFlag("freeTrial")}
        />
        <CheckRow
          label="認定製品"
          checked={filters.certified}
          onChange={() => toggleFlag("certified")}
        />
      </FilterGroup>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">製品を探す</h1>
        <p className="mt-1.5 text-sm text-muted">
          条件で絞り込み、気になる製品を最大4件まで比較リストに追加できます。
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply({ ...filters, q: draftQuery });
        }}
        className="mb-6 flex gap-2"
        role="search"
      >
        <input
          type="search"
          value={draftQuery}
          onChange={(e) => setDraftQuery(e.target.value)}
          placeholder="製品名・ベンダー名・機能で検索"
          aria-label="製品を検索"
          className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
        >
          検索
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="mb-2 flex items-center justify-between lg:mb-0">
            <button
              type="button"
              onClick={() => setPanelOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium lg:hidden"
              aria-expanded={panelOpen}
            >
              絞り込み
              {count > 0 ? (
                <span className="grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white tabular-nums">
                  {count}
                </span>
              ) : null}
            </button>
            {count > 0 ? (
              <button
                type="button"
                onClick={() => {
                  setDraftQuery("");
                  apply(emptyFilters);
                }}
                className="text-xs font-medium text-accent hover:underline"
              >
                条件をクリア
              </button>
            ) : null}
          </div>

          <div
            className={`rounded-xl border border-border bg-surface px-4 lg:block ${
              panelOpen ? "block" : "hidden"
            }`}
          >
            {panel}
          </div>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              <span className="font-bold text-foreground tabular-nums">{results.length}</span> 件
              {count > 0 ? `（${count}件の条件で絞り込み中）` : null}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">並び替え</span>
              <select
                value={sort}
                onChange={(e) => apply(filters, e.target.value as SortKey)}
                className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm outline-none focus:border-accent"
              >
                {Object.entries(sortLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filters.q ? (
            <div className="mb-4 flex items-center gap-2">
              <Badge tone="accent">検索: {filters.q}</Badge>
              <button
                type="button"
                onClick={() => {
                  setDraftQuery("");
                  apply({ ...filters, q: "" });
                }}
                className="text-xs text-muted hover:underline"
              >
                解除
              </button>
            </div>
          ) : null}

          {results.length === 0 ? (
            <EmptyState
              title="条件に合う製品が見つかりませんでした"
              body="絞り込み条件を減らすか、AI相談で要件を伝えると近い製品を提案します。"
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
