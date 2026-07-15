import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "@/components/compare-context";
import { CompareTray } from "@/components/compare-tray";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RAILHEAD — 営業を介さず、製品を自分で確かめる",
    template: "%s | RAILHEAD",
  },
  description:
    "製品検索・比較・デモ体験・AI相談を1か所に集めた B2B プロダクトプラットフォーム。営業に会う前に、自分で確かめて選べます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CompareProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CompareTray />
        </CompareProvider>
      </body>
    </html>
  );
}
