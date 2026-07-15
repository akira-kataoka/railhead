import type { Metadata } from "next";
import { AiConsult } from "@/components/ai-consult";

export const metadata: Metadata = {
  title: "AI相談",
  description:
    "業界・従業員数・課題・予算・導入時期を入力すると、AI が最適な製品と概算費用・導入期間を提案します。",
};

export default function AiConsultPage() {
  return <AiConsult />;
}
