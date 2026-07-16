import Link from "next/link";
import type { Product } from "@/lib/types";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "accent" | "warn" | "solid";
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted border-border",
    brand: "bg-brand/10 text-brand border-brand/25",
    accent: "bg-accent/10 text-accent border-accent/25",
    warn: "bg-highlight/10 text-highlight border-highlight/30",
    solid: "grad-brand text-white border-transparent",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] leading-4 font-semibold ${tones[tone]}`}
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
        <span className="absolute inset-0 overflow-hidden text-amber-500" style={{ width: `${pct}%` }}>
          ★★★★★
        </span>
      </span>
      <span className={`${size === "md" ? "text-sm" : "text-xs"} font-bold tabular-nums`}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export function ProductLogo({ product, size = 40 }: { product: Product; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-xl font-black text-white shadow-sm"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(140deg, ${product.accent}, ${product.accent}b0)`,
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
            className={`h-1.5 w-4 rounded-full transition-colors ${
              n <= score ? "grad-brand" : "bg-border"
            }`}
          />
        ))}
      </span>
      <span className="text-xs font-medium text-muted tabular-nums">{label ?? `${score} / 5`}</span>
    </span>
  );
}

/** 実績・効果の数字を主役にするための表示。ここぞという場所にだけ使う */
export function Stat({
  value,
  label,
  sub,
  tone = "default",
}: {
  value: string;
  label: string;
  sub?: string;
  tone?: "default" | "onDark";
}) {
  return (
    <div>
      <p
        className={`text-2xl leading-none font-black tabular-nums sm:text-3xl ${
          tone === "onDark" ? "text-white" : "grad-text"
        }`}
      >
        {value}
      </p>
      <p className={`mt-1.5 text-xs font-semibold ${tone === "onDark" ? "text-white/85" : ""}`}>
        {label}
      </p>
      {sub ? (
        <p className={`text-[11px] ${tone === "onDark" ? "text-white/60" : "text-muted"}`}>{sub}</p>
      ) : null}
    </div>
  );
}

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-[15px]",
  };
  const variants = {
    primary: "grad-brand text-white shadow-md hover:shadow-lg hover:brightness-110",
    secondary: "border border-border bg-surface hover:bg-surface-2 hover:border-accent/40",
    ghost: "text-muted hover:bg-surface-2 hover:text-foreground",
  };
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-xl font-bold transition-all disabled:opacity-40 disabled:pointer-events-none ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "すべて見る",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1.5 text-[11px] font-black tracking-[0.18em] text-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">{title}</h2>
        {description ? <p className="mt-1.5 text-sm text-muted">{description}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="group shrink-0 text-sm font-bold whitespace-nowrap text-accent hover:underline"
        >
          {linkLabel}
          <span className="inline-block transition-transform group-hover:translate-x-0.5"> →</span>
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
    <As className={`rounded-2xl border border-border bg-surface shadow-card ${className}`}>
      {children}
    </As>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <p className="text-lg font-bold">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-muted">{body}</p>
    </div>
  );
}

export function StubNotice({ title, body, items }: { title: string; body: string; items: string[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Badge tone="warn">未実装</Badge>
      <h1 className="mt-3 text-3xl font-black tracking-tight">{title}</h1>
      <p className="mt-3 leading-relaxed text-muted">{body}</p>
      <Card className="mt-8 p-6">
        <p className="text-sm font-bold">このページに載せる予定の内容</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Button href="/" variant="secondary" className="mt-8">
        ← トップへ戻る
      </Button>
    </div>
  );
}
