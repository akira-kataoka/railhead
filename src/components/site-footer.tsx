import Link from "next/link";

const columns = [
  {
    title: "探す",
    links: [
      { href: "/products", label: "製品を探す" },
      { href: "/industries", label: "業界から探す" },
      { href: "/challenges", label: "課題から探す" },
      { href: "/compare", label: "製品比較" },
      { href: "/ai-consult", label: "AI相談" },
    ],
  },
  {
    title: "体験する",
    links: [
      { href: "/demos", label: "デモセンター" },
      { href: "/cases", label: "導入事例" },
      { href: "/events", label: "ウェビナー・イベント" },
      { href: "/columns", label: "コラム・ナレッジ" },
    ],
  },
  {
    title: "相談する",
    links: [
      { href: "/consultants", label: "コンサルタント" },
      { href: "/partners", label: "パートナー企業" },
    ],
  },
  {
    title: "管理",
    links: [
      { href: "/mypage", label: "マイページ" },
      { href: "/vendor", label: "掲載企業管理画面" },
      { href: "/admin", label: "管理者画面" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded bg-brand text-sm font-black text-brand-fg">
                R
              </span>
              <span className="text-[15px] font-black tracking-[0.14em]">RAILHEAD</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              営業を介さず、製品を自分で確かめて選ぶための
              B2B プロダクトプラットフォーム。
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold tracking-wide">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-muted hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted">
          RAILHEAD — B2B Sales Demonstration Platform.
          掲載している企業名・製品名・数値はすべて架空のデモデータです。
        </p>
      </div>
    </footer>
  );
}
