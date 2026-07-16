import { ProductLogo, Stars } from "@/components/ui";
import { productById } from "@/lib/data/products";
import { formatPriceShort } from "@/lib/query";

/**
 * ヒーロー右の飾り。実データを使った「比較中の見た目」を見せて、
 * このサイトで何ができるのかを説明せずに伝える。装飾なので aria-hidden。
 */
const picks = ["soraho-sfa", "nexus-sales-cloud", "koyomi-ai"]
  .map(productById)
  .filter((p) => p !== undefined);

export function HeroPreview() {
  return (
    <div className="pointer-events-none select-none" aria-hidden>
      <div className="rise space-y-3" style={{ animationDelay: "360ms" }}>
        {picks.map((p, i) => (
          <div
            key={p.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface/85 p-3.5 shadow-lg backdrop-blur"
            style={{
              // 少しずつずらして、重なったカードを覗き見ているように見せる
              marginLeft: `${i * 22}px`,
              transform: `rotate(${(i - 1) * 0.7}deg)`,
            }}
          >
            <ProductLogo product={p} size={38} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black">{p.name}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <Stars rating={p.rating} />
                <span className="text-[11px] text-muted">{formatPriceShort(p)}</span>
              </div>
            </div>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-accent text-[11px] font-black text-white">
              ✓
            </span>
          </div>
        ))}

        <div
          className="grad-brand ml-[66px] flex items-center justify-between rounded-2xl px-4 py-3 shadow-xl"
          style={{ transform: "rotate(0.7deg)" }}
        >
          <span className="text-xs font-black text-white">3件を比較中</span>
          <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-black text-slate-900">
            比較する →
          </span>
        </div>
      </div>
    </div>
  );
}
