import type { NextConfig } from "next";

// GitHub Pages はリポジトリ名のサブパス配下で配信されるため、その時だけ basePath を付ける。
// ローカルの dev / build では素の / で動かしたいので環境変数で切り替える。
const basePath = process.env.GITHUB_PAGES === "true" ? "/railhead" : "";

const nextConfig: NextConfig = {
  // 全ページが静的生成なので、そのまま静的ホスティングに出せる
  output: "export",
  basePath,
  // 静的エクスポートでは next/image の最適化サーバーが使えない（現状 next/image は未使用）
  images: { unoptimized: true },
  // /products/index.html の形で出力し、ディレクトリ配信のホスティングと噛み合わせる
  trailingSlash: true,
};

export default nextConfig;
