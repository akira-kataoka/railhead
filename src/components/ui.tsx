import Link from "next/link";
import type { Product } from "@/lib/types";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "accent" | "warn";
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted border-border",
    brand: "bg-brand/10 text-brand border-brand/25",
    accent: "bg-accent/10 text-accent border-accent/25",
    warn: "bg-amber-500/10 text-amber-600 border-amber-500/25 dark:text-amber-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] leading-4 font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const pct = (rating / 5) * 100;
  return (
    <span className="inline-flex items-center gap-1" aria-label={`5点満点中 ${rating.toFixed(1)}点`}>
      <span className={`relative ${size === "md" ? "text-base" : "text-xs"} leading-none`} aria-hidden>
        <span className="text-border">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden text-amber-500"
          style={{ width: `${pct}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span className={`${size === "md" ? "text-sm" : "text-xs"} font-semibold tabular-nums`}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export function ProductLogo({ product, size = 40 }: { product: Product; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg font-bold text-white"
      style={{
        width: size,
        height: size,
        background: product.accent,
        fontSize: size * 0.36,
      }}
      aria-hidden
    >
      {product.logo}
    </span>
  );
}

export function ScoreBar({ score, label }: { score: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`h-1.5 w-4 rounded-full ${n <= score ? "bg-accent" : "bg-border"}`}
          />
        ))}
      </span>
      <span className="text-xs text-muted tabular-nums">{label ?? `${score} / 5`}</span>
    </span>
  );
}

export function SectionHeading({
  title,
  description,
  href,
  linkLabel = "すべて見る",
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-accent hover:underline whitespace-nowrap"
        >
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As className={`rounded-xl border border-border bg-surface ${className}`}>{children}</As>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted">{body}</p>
    </div>
  );
}

export function StubNotice({ title, body, items }: { title: string; body: string; items: string[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Badge tone="warn">未実装</Badge>
      <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-3 text-muted">{body}</p>
      <Card className="mt-8 p-6">
        <p className="text-sm font-semibold">このページに載せる予定の内容</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Link href="/" className="mt-8 inline-block text-sm font-medium text-accent hover:underline">
        ← トップへ戻る
      </Link>
    </div>
  );
}
