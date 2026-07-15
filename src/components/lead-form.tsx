"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

type Intent = "document" | "trial" | "contact" | "demo";

const intentCopy: Record<Intent, { title: string; body: string; submit: string; done: string }> = {
  document: {
    title: "資料をダウンロード",
    body: "ご入力いただいたメールアドレス宛に、製品資料一式をお送りします。",
    submit: "資料を受け取る",
    done: "資料をお送りしました。メールをご確認ください。",
  },
  trial: {
    title: "無料トライアルを申し込む",
    body: "トライアル環境の発行にはベンダーの確認が入ります。通常1営業日以内にご連絡します。",
    submit: "トライアルを申し込む",
    done: "申込みを受け付けました。1営業日以内にベンダーからご連絡します。",
  },
  contact: {
    title: "ベンダーに問い合わせる",
    body: "ご質問内容をベンダーに直接お送りします。RAILHEAD からの営業連絡は行いません。",
    submit: "問い合わせを送信",
    done: "問い合わせを送信しました。ベンダーから直接ご連絡します。",
  },
  demo: {
    title: "デモを申し込む",
    body: "実機デモ・ハンズオンは日程調整が必要です。ご希望日をお知らせください。",
    submit: "デモを申し込む",
    done: "申込みを受け付けました。日程候補をメールでお送りします。",
  },
};

export function LeadForm({
  product,
  intent,
  variant = "primary",
  label,
}: {
  product: Product;
  intent: Intent;
  variant?: "primary" | "secondary";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const copy = intentCopy[intent];

  const buttonClass =
    variant === "primary"
      ? "w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
      : "w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClass}>
        {label ?? copy.title}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6">
            {sent ? (
              <>
                <p className="text-lg font-bold">送信しました</p>
                <p className="mt-2 text-sm text-muted">{copy.done}</p>
                <p className="mt-4 rounded-lg bg-surface-2 px-3 py-2 text-xs text-muted">
                  ※ デモ環境のため、実際には送信されていません。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSent(false);
                  }}
                  className="mt-5 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg"
                >
                  閉じる
                </button>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <p className="text-lg font-bold">{copy.title}</p>
                <p className="mt-1 text-sm text-muted">{product.name}</p>
                <p className="mt-3 text-sm text-muted">{copy.body}</p>

                <div className="mt-5 space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold">お名前</span>
                    <input
                      required
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold">会社名</span>
                    <input
                      required
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold">メールアドレス</span>
                    <input
                      required
                      type="email"
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </label>
                  {intent === "contact" || intent === "demo" ? (
                    <label className="block">
                      <span className="text-xs font-semibold">
                        {intent === "demo" ? "ご希望日程・確認したいこと" : "ご質問内容"}
                      </span>
                      <textarea
                        required
                        rows={3}
                        className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                      />
                    </label>
                  ) : null}
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:opacity-90"
                  >
                    {copy.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
