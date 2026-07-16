"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCompare } from "@/components/compare-context";

const nav = [
  { href: "/products", label: "製品を探す" },
  { href: "/industries", label: "業界から探す" },
  { href: "/challenges", label: "課題から探す" },
  { href: "/demos", label: "デモセンター" },
  { href: "/cases", label: "導入事例" },
  { href: "/consultants", label: "コンサルタント" },
  { href: "/partners", label: "パートナー" },
  { href: "/events", label: "ウェビナー" },
  { href: "/columns", label: "コラム" },
];

export function Logo() {
  return (
    <span className="flex shrink-0 items-center gap-2">
      <span className="grad-brand grid h-7 w-7 place-items-center rounded-lg text-sm font-black text-white shadow-sm">
        R
      </span>
      <span className="text-[15px] font-black tracking-[0.14em]">RAILHEAD</span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { ids } = useCompare();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="ml-2 hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-lg px-2.5 py-1.5 text-[13px] font-bold transition-colors ${
                isActive(item.href)
                  ? "text-accent"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="grad-brand absolute inset-x-2.5 -bottom-px h-0.5 rounded-full" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/compare"
            className="hidden items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-[13px] font-bold transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            比較
            {ids.length > 0 ? (
              <span className="grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-black text-white tabular-nums">
                {ids.length}
              </span>
            ) : null}
          </Link>
          <Link
            href="/ai-consult"
            className="grad-brand rounded-xl px-3.5 py-1.5 text-[13px] font-black text-white shadow-sm transition-all hover:brightness-110"
          >
            ✦ AIに相談
          </Link>
          <Link
            href="/mypage"
            className="hidden rounded-xl border border-border px-3 py-1.5 text-[13px] font-bold transition-colors hover:bg-surface-2 lg:inline-block"
          >
            マイページ
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-border px-2.5 py-1.5 text-[13px] xl:hidden"
            aria-expanded={open}
            aria-label="メニューを開く"
          >
            ☰
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface xl:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-3">
            {[...nav, { href: "/compare", label: "製品比較" }, { href: "/mypage", label: "マイページ" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-bold ${
                    isActive(item.href) ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface-2"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
