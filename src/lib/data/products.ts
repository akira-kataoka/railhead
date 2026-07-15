import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "nexus-sales-cloud",
    name: "Nexus Sales Cloud",
    vendor: "Nexus Software",
    logo: "NX",
    accent: "#4f46e5",
    categorySlug: "sfa-crm",
    summary: "商談・予実・活動履歴を1つのタイムラインに統合する、エンタープライズ向け SFA。",
    description:
      "Nexus Sales Cloud は、商談パイプラインと顧客データを単一のタイムラインに集約する SFA / CRM です。営業担当の入力負荷を下げることを設計思想の中心に置いており、メール・カレンダー・名刺の取り込みから活動履歴を自動生成します。予実管理は組織階層に沿って自動集計され、マネージャーは着地見込みを日次で追えます。大規模組織での権限設計・監査要件に対応した実績が豊富です。",
    rating: 4.4,
    reviewCount: 312,
    priceFrom: 9_800,
    priceUnit: "ユーザー / 月",
    licenseModel: "ユーザー課金（年間契約・最低20ライセンス）",
    industrySlugs: ["manufacturing", "finance", "distribution", "retail"],
    challengeSlugs: ["sales-efficiency", "crm", "data"],
    companySizes: ["301-1000", "1001+"],
    cloud: true,
    aiReady: true,
    origin: "海外",
    freeTrial: true,
    certified: true,
    customerCount: 8_400,
    publishedAt: "2025-11-04",
    features: [
      { name: "商談パイプライン管理", included: true },
      { name: "予実管理・着地見込み", included: true, note: "組織階層で自動集計" },
      { name: "活動履歴の自動記録", included: true, note: "メール / カレンダー連携" },
      { name: "モバイルアプリ", included: true },
      { name: "AI 商談スコアリング", included: true, note: "上位プランのみ" },
      { name: "見積・契約書生成", included: true },
      { name: "オンプレミス提供", included: false },
      { name: "ノーコード画面カスタマイズ", included: true },
    ],
    faqs: [
      {
        question: "既存の Excel 管理から移行できますか？",
        answer:
          "CSV / Excel からのインポートウィザードを標準提供しています。項目マッピングを保存でき、初回移行後も差分取り込みが可能です。数万件規模でも数分で完了します。",
      },
      {
        question: "最低契約ライセンス数はありますか？",
        answer:
          "年間契約で最低20ライセンスからのご提供です。20未満の場合はパートナー経由のプランをご案内しています。",
      },
      {
        question: "データはどこに保管されますか？",
        answer:
          "東京リージョンを選択でき、国内保管が可能です。金融・自治体向けには専用テナントのオプションもご用意しています。",
      },
    ],
    scores: { ai: 4, security: 5, extensibility: 5, support: 4, ease: 3 },
    highlights: [
      {
        title: "入力させない設計",
        body: "メール・カレンダー・名刺から活動履歴を自動生成し、営業担当の手入力を最小化します。",
      },
      {
        title: "階層に沿った予実",
        body: "組織ツリーに沿って着地見込みを日次自動集計。マネージャーの集計作業をなくします。",
      },
      {
        title: "監査に耐える権限設計",
        body: "レコード単位の権限とフル監査ログを標準搭載。金融・上場企業での導入実績が豊富です。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 24 },
      { title: "価格・ライセンス体系", pages: 8 },
      { title: "セキュリティホワイトペーパー", pages: 42 },
    ],
  },
  {
    id: "soraho-sfa",
    name: "SORAHO SFA",
    vendor: "ソラホ株式会社",
    logo: "SR",
    accent: "#0891b2",
    categorySlug: "sfa-crm",
    summary: "中堅企業向け。3日で立ち上がる、現場が続けられる国産 SFA。",
    description:
      "SORAHO SFA は、導入のしやすさに振り切った国産 SFA です。テンプレートから選ぶだけで初期設定が完了し、平均3営業日で運用を開始できます。日報とスマホ入力を起点に商談情報が溜まる設計で、SFA が形骸化しやすい中堅企業での定着率の高さが評価されています。国内サポートが標準で付帯し、導入後3か月は専任担当が伴走します。",
    rating: 4.6,
    reviewCount: 198,
    priceFrom: 3_800,
    priceUnit: "ユーザー / 月",
    licenseModel: "ユーザー課金（月額・最低5ライセンス）",
    industrySlugs: ["manufacturing", "distribution", "retail", "education"],
    challengeSlugs: ["sales-efficiency", "crm"],
    companySizes: ["1-50", "51-300", "301-1000"],
    cloud: true,
    aiReady: true,
    origin: "国産",
    freeTrial: true,
    certified: true,
    customerCount: 2_100,
    publishedAt: "2026-01-20",
    features: [
      { name: "商談パイプライン管理", included: true },
      { name: "予実管理・着地見込み", included: true },
      { name: "活動履歴の自動記録", included: true, note: "スマホ・日報起点" },
      { name: "モバイルアプリ", included: true, note: "オフライン入力対応" },
      { name: "AI 商談スコアリング", included: true },
      { name: "見積・契約書生成", included: false, note: "外部連携で対応" },
      { name: "オンプレミス提供", included: false },
      { name: "ノーコード画面カスタマイズ", included: true },
    ],
    faqs: [
      {
        question: "導入にどのくらいかかりますか？",
        answer:
          "業種別テンプレートを選ぶ形式のため、平均3営業日で運用開始しています。データ移行を含む場合でも2週間程度が目安です。",
      },
      {
        question: "サポートは日本語ですか？",
        answer:
          "国内拠点による日本語サポートが標準付帯です。導入後3か月は専任のカスタマーサクセスが定着まで伴走します。",
      },
      {
        question: "他システムと連携できますか？",
        answer:
          "REST API と主要 iPaaS 連携を提供しています。会計・グループウェアはコネクタが用意されています。",
      },
    ],
    scores: { ai: 3, security: 4, extensibility: 3, support: 5, ease: 5 },
    highlights: [
      {
        title: "平均3営業日で稼働",
        body: "業種別テンプレートを選ぶだけ。初期構築フェーズをまるごと省けます。",
      },
      {
        title: "現場が続けられる",
        body: "スマホの日報入力を起点に商談が溜まる設計。入力率90%超の導入企業が多数。",
      },
      {
        title: "国内サポート標準",
        body: "追加費用なしで日本語サポート。導入後3か月は専任担当が伴走します。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 18 },
      { title: "導入スケジュール例", pages: 6 },
    ],
  },
  {
    id: "beacon-ma",
    name: "BeaconMA",
    vendor: "Beacon Labs",
    logo: "BM",
    accent: "#db2777",
    categorySlug: "ma",
    summary: "行動データからスコアを自動生成し、商談化しそうなリードだけを営業に渡す MA。",
    description:
      "BeaconMA は、Web 行動・メール反応・セミナー参加を統合してリードスコアを自動算出する MA プラットフォームです。スコアのしきい値ではなく、過去の商談化実績から機械学習でモデルを組む点が特徴で、営業に渡すリードの質を継続的に改善します。SFA 側の商談結果をフィードバックする双方向連携を標準搭載しています。",
    rating: 4.2,
    reviewCount: 156,
    priceFrom: 120_000,
    priceUnit: "月額（リード5万件まで）",
    licenseModel: "リード件数課金（年間契約）",
    industrySlugs: ["manufacturing", "finance", "retail", "education"],
    challengeSlugs: ["marketing", "sales-efficiency", "data"],
    companySizes: ["51-300", "301-1000", "1001+"],
    cloud: true,
    aiReady: true,
    origin: "海外",
    freeTrial: true,
    certified: true,
    customerCount: 3_600,
    publishedAt: "2025-09-12",
    features: [
      { name: "リードスコアリング", included: true, note: "商談実績から自動学習" },
      { name: "シナリオ / ステップメール", included: true },
      { name: "ランディングページ作成", included: true },
      { name: "SFA 双方向連携", included: true },
      { name: "ABM（企業単位のターゲティング）", included: true },
      { name: "広告連携", included: true },
      { name: "国内データセンター", included: false },
      { name: "オンプレミス提供", included: false },
    ],
    faqs: [
      {
        question: "スコアリングの設定は難しくありませんか？",
        answer:
          "過去の商談化データを取り込むと初期モデルが自動生成されます。ルールを手で組む必要はなく、運用しながら精度が上がります。",
      },
      {
        question: "リード件数を超えたらどうなりますか？",
        answer:
          "自動停止はせず、超過分は従量課金となります。上限到達前にアラートが出ます。",
      },
    ],
    scores: { ai: 5, security: 4, extensibility: 4, support: 3, ease: 2 },
    highlights: [
      {
        title: "スコアを手で組まない",
        body: "商談化の実績から機械学習でモデルを生成。ルール設計の運用負荷がありません。",
      },
      {
        title: "営業に渡した後まで計測",
        body: "SFA の商談結果を学習に戻す双方向連携で、リードの質が継続的に改善します。",
      },
      {
        title: "ABM 標準搭載",
        body: "個人ではなく企業単位でのターゲティングと計測に対応しています。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 32 },
      { title: "スコアリング設計ガイド", pages: 20 },
    ],
  },
  {
    id: "leadflow",
    name: "リードフロー",
    vendor: "フロースタイル株式会社",
    logo: "LF",
    accent: "#e11d48",
    categorySlug: "ma",
    summary: "BtoB 商材に絞った国産 MA。展示会・セミナー起点のリード管理に強い。",
    description:
      "リードフローは、BtoB の商習慣に合わせて設計された国産 MA です。展示会での名刺一括取り込み、セミナー申込みからフォローまでを1つの導線でカバーします。海外製 MA にありがちな機能過多を避け、リード獲得から商談化までの最短距離に機能を絞っています。名刺 OCR とセミナー管理を標準で内包する点が国内ユーザーに評価されています。",
    rating: 4.3,
    reviewCount: 87,
    priceFrom: 48_000,
    priceUnit: "月額（リード1万件まで）",
    licenseModel: "リード件数課金（月額契約可）",
    industrySlugs: ["manufacturing", "distribution", "education", "healthcare"],
    challengeSlugs: ["marketing", "sales-efficiency"],
    companySizes: ["1-50", "51-300", "301-1000"],
    cloud: true,
    aiReady: false,
    origin: "国産",
    freeTrial: true,
    certified: false,
    customerCount: 640,
    publishedAt: "2026-02-08",
    features: [
      { name: "リードスコアリング", included: true, note: "ルールベース" },
      { name: "シナリオ / ステップメール", included: true },
      { name: "ランディングページ作成", included: true },
      { name: "SFA 双方向連携", included: false, note: "片方向連携のみ" },
      { name: "ABM（企業単位のターゲティング）", included: false },
      { name: "名刺 OCR 取り込み", included: true, note: "展示会での一括取り込み" },
      { name: "セミナー / ウェビナー管理", included: true },
      { name: "国内データセンター", included: true },
    ],
    faqs: [
      {
        question: "展示会の名刺はどう取り込みますか？",
        answer:
          "スマホでまとめて撮影すると OCR で自動データ化され、そのままフォローシナリオに載せられます。重複は自動で名寄せされます。",
      },
      {
        question: "月額契約はできますか？",
        answer: "年間契約のほか、月額契約にも対応しています。繁忙期だけ増枠する運用も可能です。",
      },
    ],
    scores: { ai: 2, security: 4, extensibility: 3, support: 5, ease: 4 },
    highlights: [
      {
        title: "展示会・セミナーに強い",
        body: "名刺 OCR とセミナー管理を標準内包。オフライン起点のリードを取りこぼしません。",
      },
      {
        title: "機能を絞った設計",
        body: "BtoB のリード獲得から商談化までに機能を限定。使わない機能にお金を払いません。",
      },
      { title: "国内データセンター", body: "データは国内保管。月額契約にも対応しています。" },
    ],
    documents: [
      { title: "製品概要資料", pages: 16 },
      { title: "展示会フォロー運用ガイド", pages: 12 },
    ],
  },
  {
    id: "lumen-analytics",
    name: "Lumen Analytics",
    vendor: "Lumen Data",
    logo: "LA",
    accent: "#0d9488",
    categorySlug: "bi",
    summary: "全社のデータを1つのセマンティックレイヤーに束ねる、エンタープライズ BI。",
    description:
      "Lumen Analytics は、部門ごとにバラバラな指標定義を1つのセマンティックレイヤーに統一する BI プラットフォームです。「売上」の定義が部門で食い違う、という典型的な問題を、指標をコードで一元管理することで解消します。数億行規模でも応答するクエリエンジンを備え、ダッシュボードは自然言語でも生成できます。",
    rating: 4.5,
    reviewCount: 241,
    priceFrom: 240_000,
    priceUnit: "月額（10ユーザーから）",
    licenseModel: "ユーザー課金 + データ容量課金（年間契約）",
    industrySlugs: ["manufacturing", "finance", "distribution", "retail"],
    challengeSlugs: ["data", "dx", "ai"],
    companySizes: ["301-1000", "1001+"],
    cloud: true,
    aiReady: true,
    origin: "海外",
    freeTrial: false,
    certified: true,
    customerCount: 5_200,
    publishedAt: "2025-10-01",
    features: [
      { name: "セマンティックレイヤー（指標の一元定義）", included: true },
      { name: "自然言語でのダッシュボード生成", included: true },
      { name: "大規模データ対応", included: true, note: "数億行規模で検証済み" },
      { name: "権限・行レベルセキュリティ", included: true },
      { name: "リアルタイム更新", included: true },
      { name: "オンプレミス提供", included: true, note: "追加費用" },
      { name: "無料トライアル", included: false, note: "PoC 契約で対応" },
      { name: "日本語 UI", included: true },
    ],
    faqs: [
      {
        question: "トライアルはできますか？",
        answer:
          "無料トライアルは提供していませんが、4週間の有償 PoC をご用意しています。本契約時に PoC 費用は充当されます。",
      },
      {
        question: "既存の DWH に繋がりますか？",
        answer:
          "主要な DWH / データレイクにネイティブ接続します。データを移動させずクエリを投げる構成が基本です。",
      },
    ],
    scores: { ai: 5, security: 5, extensibility: 5, support: 4, ease: 2 },
    highlights: [
      {
        title: "指標定義を一元化",
        body: "「売上」の定義が部門で食い違う問題を、セマンティックレイヤーで根本から解消します。",
      },
      {
        title: "データを移動させない",
        body: "既存 DWH にネイティブ接続。ETL パイプラインを新設せずに始められます。",
      },
      {
        title: "自然言語でダッシュボード",
        body: "「先月の地域別粗利を出して」と書くだけでダッシュボードが生成されます。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 38 },
      { title: "アーキテクチャ解説", pages: 46 },
      { title: "PoC 実施要領", pages: 10 },
    ],
  },
  {
    id: "datacanvas",
    name: "DataCanvas",
    vendor: "キャンバスデータ株式会社",
    logo: "DC",
    accent: "#65a30d",
    categorySlug: "bi",
    summary: "Excel を触る感覚で使える国産 BI。情シスに頼らず現場が分析できる。",
    description:
      "DataCanvas は、Excel の操作感をそのまま持ち込んだ国産 BI ツールです。ピボットテーブルに慣れた現場担当者が、トレーニングなしでダッシュボードを組めることを目標に設計されています。基幹システムからの日次取り込みはコネクタで完結し、情シスの工数をかけずに全社展開できる点が中堅企業に支持されています。",
    rating: 4.1,
    reviewCount: 134,
    priceFrom: 6_000,
    priceUnit: "ユーザー / 月",
    licenseModel: "ユーザー課金（月額契約可）",
    industrySlugs: ["manufacturing", "distribution", "retail", "government", "education"],
    challengeSlugs: ["data", "dx"],
    companySizes: ["1-50", "51-300", "301-1000"],
    cloud: true,
    aiReady: true,
    origin: "国産",
    freeTrial: true,
    certified: false,
    customerCount: 1_450,
    publishedAt: "2026-03-02",
    features: [
      { name: "セマンティックレイヤー（指標の一元定義）", included: false },
      { name: "自然言語でのダッシュボード生成", included: true, note: "ベータ提供" },
      { name: "大規模データ対応", included: false, note: "1000万行程度が目安" },
      { name: "権限・行レベルセキュリティ", included: true },
      { name: "リアルタイム更新", included: false, note: "日次 / 時間単位" },
      { name: "オンプレミス提供", included: false },
      { name: "Excel ライクな操作", included: true },
      { name: "日本語 UI", included: true },
    ],
    faqs: [
      {
        question: "情シスの手を借りずに使えますか？",
        answer:
          "コネクタ設定さえ済めば、現場担当者がピボットテーブル感覚でダッシュボードを作成できます。作成研修は不要という導入企業がほとんどです。",
      },
      {
        question: "どのくらいのデータ量まで扱えますか？",
        answer:
          "1000万行程度までを推奨しています。これを超える規模ではエンタープライズ BI の併用をご提案しています。",
      },
    ],
    scores: { ai: 3, security: 3, extensibility: 3, support: 4, ease: 5 },
    highlights: [
      {
        title: "研修が要らない",
        body: "Excel のピボット操作をそのまま持ち込んだ UI。現場が自分でダッシュボードを組めます。",
      },
      {
        title: "コネクタで日次取り込み",
        body: "主要な国産基幹システムのコネクタを標準提供。ETL を書く必要がありません。",
      },
      { title: "1ユーザーから始められる", body: "月額・最低ライセンス数なし。部門単位で試せます。" },
    ],
    documents: [
      { title: "製品概要資料", pages: 20 },
      { title: "コネクタ一覧", pages: 14 },
    ],
  },
  {
    id: "agentforge",
    name: "AgentForge",
    vendor: "Forge Systems",
    logo: "AF",
    accent: "#7c3aed",
    categorySlug: "ai-agent",
    summary: "社内システムを繋いだ AI エージェントを、コードを書かずに構築・運用する基盤。",
    description:
      "AgentForge は、業務プロセスを自律実行する AI エージェントを構築するためのプラットフォームです。既存の SaaS や基幹システムをツールとしてエージェントに接続し、承認フローを挟みながら実行させられます。エージェントの実行ログは全てトレース可能で、どの判断でどのデータを参照したかを監査できる点が、規制業種での採用理由になっています。",
    rating: 4.3,
    reviewCount: 96,
    priceFrom: 180_000,
    priceUnit: "月額（実行1万回まで）",
    licenseModel: "実行回数課金（年間契約）",
    industrySlugs: ["manufacturing", "finance", "distribution", "retail", "healthcare"],
    challengeSlugs: ["ai", "dx", "sales-efficiency"],
    companySizes: ["301-1000", "1001+"],
    cloud: true,
    aiReady: true,
    origin: "海外",
    freeTrial: true,
    certified: true,
    customerCount: 1_180,
    publishedAt: "2026-01-15",
    features: [
      { name: "ノーコードでのエージェント構築", included: true },
      { name: "既存システムのツール接続", included: true, note: "MCP / REST" },
      { name: "承認フロー（Human-in-the-loop）", included: true },
      { name: "実行トレース・監査ログ", included: true },
      { name: "オンプレミス提供", included: true, note: "追加費用" },
      { name: "マルチエージェント連携", included: true },
      { name: "日本語 UI", included: true },
      { name: "国内データセンター", included: true },
    ],
    faqs: [
      {
        question: "エージェントが誤った判断をしないか心配です。",
        answer:
          "重要な操作の前に承認ステップを挟めます。全ての判断は参照データ付きでトレースされ、後から検証できます。",
      },
      {
        question: "既存システムとどう繋ぎますか？",
        answer:
          "MCP と REST API に対応しています。主要 SaaS は既製コネクタがあり、独自システムも OpenAPI 定義から接続できます。",
      },
      {
        question: "実行回数を超えた場合は？",
        answer: "従量課金に移行します。上限到達前にアラート通知され、自動停止させる設定も可能です。",
      },
    ],
    scores: { ai: 5, security: 4, extensibility: 5, support: 3, ease: 2 },
    highlights: [
      {
        title: "全ての判断を監査できる",
        body: "どの判断でどのデータを参照したかを完全トレース。規制業種でも通せます。",
      },
      {
        title: "承認を挟める",
        body: "重要な操作の前に人間の承認ステップを差し込めます。いきなり全自動にする必要がありません。",
      },
      {
        title: "既存システムをそのまま活かす",
        body: "MCP / REST で既存の SaaS・基幹をツール化。作り直しは不要です。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 28 },
      { title: "エージェント設計ガイド", pages: 36 },
      { title: "セキュリティホワイトペーパー", pages: 30 },
    ],
  },
  {
    id: "koyomi-ai",
    name: "こよみAI",
    vendor: "コヨミ株式会社",
    logo: "KY",
    accent: "#ea580c",
    categorySlug: "ai-agent",
    summary: "議事録・稟議・報告書。日本企業の文書業務に特化した国産 AI アシスタント。",
    description:
      "こよみAI は、日本企業の文書業務に対象を絞った AI アシスタントです。会議の音声から議事録を生成し、そのまま稟議書や報告書の下書きに変換します。社内の過去文書を参照して文体・様式を合わせる点が特徴で、テンプレートを整備しなくても組織の書式に沿った文書が出てきます。データは国内で処理され、学習にも利用されません。",
    rating: 4.5,
    reviewCount: 173,
    priceFrom: 1_500,
    priceUnit: "ユーザー / 月",
    licenseModel: "ユーザー課金（月額契約可）",
    industrySlugs: ["government", "healthcare", "education", "finance", "manufacturing"],
    challengeSlugs: ["ai", "dx"],
    companySizes: ["1-50", "51-300", "301-1000", "1001+"],
    cloud: true,
    aiReady: true,
    origin: "国産",
    freeTrial: true,
    certified: true,
    customerCount: 3_900,
    publishedAt: "2026-04-10",
    features: [
      { name: "ノーコードでのエージェント構築", included: false },
      { name: "議事録の自動生成", included: true, note: "音声・オンライン会議から" },
      { name: "社内文書を参照した文体合わせ", included: true },
      { name: "稟議・報告書テンプレート", included: true },
      { name: "実行トレース・監査ログ", included: true },
      { name: "オンプレミス提供", included: false },
      { name: "日本語 UI", included: true },
      { name: "国内データセンター", included: true, note: "学習利用なし" },
    ],
    faqs: [
      {
        question: "入力したデータが学習に使われませんか？",
        answer:
          "使用しません。処理は国内リージョンで完結し、入力・出力ともにモデルの学習には一切利用されない契約です。",
      },
      {
        question: "自社の書式に合わせられますか？",
        answer:
          "過去の社内文書を読み込ませることで、テンプレートを作らなくても文体・様式が自動的に揃います。",
      },
      {
        question: "自治体でも使えますか？",
        answer:
          "国内データセンターでの処理と第三者認証取得済みで、自治体での導入実績があります。",
      },
    ],
    scores: { ai: 4, security: 5, extensibility: 2, support: 5, ease: 5 },
    highlights: [
      {
        title: "テンプレート整備が要らない",
        body: "過去の社内文書を参照して文体・様式を自動で合わせます。事前準備なしで組織の書式になります。",
      },
      {
        title: "会議から稟議まで一続き",
        body: "音声から議事録を作り、そのまま稟議・報告書の下書きに変換できます。",
      },
      {
        title: "国内処理・学習利用なし",
        body: "データは国内リージョンで完結。学習には一切利用しません。自治体・医療での実績あり。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 22 },
      { title: "セキュリティ・データ取扱説明書", pages: 18 },
    ],
  },
  {
    id: "zerogate",
    name: "ZeroGate",
    vendor: "Gatewell",
    logo: "ZG",
    accent: "#0369a1",
    categorySlug: "security",
    summary: "VPN を廃止し、アプリ単位のアクセス制御に移行するゼロトラスト基盤。",
    description:
      "ZeroGate は、ネットワーク境界に依存しないアクセス制御を実現するゼロトラストプラットフォームです。VPN を段階的に廃止し、ユーザー・デバイス・コンテキストに基づいてアプリケーション単位で認可します。既存の ID 基盤と連携し、アプリを改修せずに導入できる構成が基本です。デバイスの状態を継続的に評価し、条件を外れたセッションは即座に遮断します。",
    rating: 4.4,
    reviewCount: 208,
    priceFrom: 1_200,
    priceUnit: "ユーザー / 月",
    licenseModel: "ユーザー課金（年間契約・最低100ライセンス）",
    industrySlugs: ["finance", "government", "healthcare", "manufacturing"],
    challengeSlugs: ["security", "dx"],
    companySizes: ["301-1000", "1001+"],
    cloud: true,
    aiReady: false,
    origin: "海外",
    freeTrial: true,
    certified: true,
    customerCount: 6_700,
    publishedAt: "2025-08-22",
    features: [
      { name: "アプリ単位のアクセス制御", included: true },
      { name: "デバイス状態の継続評価", included: true },
      { name: "既存 ID 基盤連携（SAML / OIDC）", included: true },
      { name: "VPN 置き換え", included: true },
      { name: "監査ログ・レポート", included: true },
      { name: "国内データセンター", included: true },
      { name: "オンプレミス提供", included: true, note: "ハイブリッド構成" },
      { name: "日本語 UI", included: true },
    ],
    faqs: [
      {
        question: "既存アプリの改修は必要ですか？",
        answer:
          "不要です。コネクタをアプリの前段に置く構成のため、アプリ側に手を入れずに導入できます。",
      },
      {
        question: "VPN を一度に廃止する必要がありますか？",
        answer:
          "ありません。アプリ単位で段階的に移行できます。多くの企業が半年〜1年かけて並行運用しながら移行しています。",
      },
    ],
    scores: { ai: 2, security: 5, extensibility: 4, support: 4, ease: 3 },
    highlights: [
      {
        title: "アプリを改修しない",
        body: "コネクタを前段に置く構成。既存アプリに手を入れずゼロトラストに移行できます。",
      },
      {
        title: "段階的に VPN を外せる",
        body: "アプリ単位で移行可能。並行運用しながら少しずつ VPN を廃止できます。",
      },
      {
        title: "セッションを継続評価",
        body: "ログイン時だけでなく、デバイス状態を継続監視。条件を外れたら即遮断します。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 26 },
      { title: "VPN 移行ガイド", pages: 34 },
      { title: "セキュリティホワイトペーパー", pages: 52 },
    ],
  },
  {
    id: "trustline",
    name: "TRUSTLINE",
    vendor: "トラストライン株式会社",
    logo: "TL",
    accent: "#475569",
    categorySlug: "security",
    summary: "監査対応の証跡集めを自動化する、国内規制に特化したガバナンス基盤。",
    description:
      "TRUSTLINE は、内部統制・監査対応の証跡収集を自動化する国産のガバナンス基盤です。各システムのアクセス権限とその変更履歴を横断的に収集し、監査法人の要求フォーマットで出力します。国内の規制・ガイドラインの改定に追従してチェック項目が更新されるため、自社で要件を追い続ける必要がありません。上場企業・自治体での導入が中心です。",
    rating: 4.2,
    reviewCount: 64,
    priceFrom: 150_000,
    priceUnit: "月額（接続10システムまで）",
    licenseModel: "接続システム数課金（年間契約）",
    industrySlugs: ["finance", "government", "healthcare"],
    challengeSlugs: ["security", "dx", "data"],
    companySizes: ["301-1000", "1001+"],
    cloud: true,
    aiReady: false,
    origin: "国産",
    freeTrial: false,
    certified: true,
    customerCount: 380,
    publishedAt: "2025-12-05",
    features: [
      { name: "アプリ単位のアクセス制御", included: false, note: "権限の可視化・棚卸のみ" },
      { name: "権限棚卸の自動化", included: true },
      { name: "既存 ID 基盤連携（SAML / OIDC）", included: true },
      { name: "監査法人フォーマットでの出力", included: true },
      { name: "監査ログ・レポート", included: true },
      { name: "国内規制・ガイドライン追従", included: true },
      { name: "国内データセンター", included: true },
      { name: "無料トライアル", included: false, note: "デモ環境で評価可" },
    ],
    faqs: [
      {
        question: "監査法人への提出資料をそのまま作れますか？",
        answer:
          "主要監査法人の要求フォーマットに対応したテンプレートを標準提供しています。多くの企業で追加加工なく提出されています。",
      },
      {
        question: "ガイドライン改定への対応は？",
        answer:
          "国内の規制・ガイドライン改定に合わせてチェック項目が自動更新されます。自社で追う必要はありません。",
      },
    ],
    scores: { ai: 1, security: 5, extensibility: 3, support: 5, ease: 3 },
    highlights: [
      {
        title: "証跡集めが自動で終わる",
        body: "各システムの権限と変更履歴を横断収集。監査シーズンの手作業がなくなります。",
      },
      {
        title: "規制改定に自動追従",
        body: "国内ガイドラインの改定に合わせてチェック項目が更新されます。",
      },
      {
        title: "監査法人フォーマット対応",
        body: "主要監査法人の要求様式で出力可能。追加加工なしで提出できます。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 24 },
      { title: "監査対応運用ガイド", pages: 28 },
    ],
  },
  {
    id: "meridian-erp",
    name: "Meridian ERP",
    vendor: "Meridian Global",
    logo: "ME",
    accent: "#1d4ed8",
    categorySlug: "erp",
    summary: "会計・購買・生産・人事を単一データモデルで統合するグローバル ERP。",
    description:
      "Meridian ERP は、会計・購買・生産・人事を単一のデータモデルで統合する基幹システムです。海外拠点を含む連結決算を前提に設計されており、複数通貨・複数会計基準を標準でサポートします。導入は業種別テンプレートをベースに構成するアプローチで、フルスクラッチに比べて期間を短縮できますが、それでも1年規模のプロジェクトになるのが一般的です。",
    rating: 4.0,
    reviewCount: 189,
    priceFrom: 800_000,
    priceUnit: "月額（50ユーザーから）",
    licenseModel: "ユーザー課金 + モジュール課金（年間契約・複数年）",
    industrySlugs: ["manufacturing", "distribution", "retail", "finance"],
    challengeSlugs: ["dx", "data"],
    companySizes: ["1001+"],
    cloud: true,
    aiReady: true,
    origin: "海外",
    freeTrial: false,
    certified: true,
    customerCount: 2_800,
    publishedAt: "2025-07-16",
    features: [
      { name: "会計・購買・生産・人事の統合", included: true },
      { name: "複数通貨・複数会計基準", included: true },
      { name: "連結決算", included: true },
      { name: "業種別テンプレート", included: true },
      { name: "オンプレミス提供", included: true },
      { name: "日本語 UI", included: true, note: "一部モジュールは英語" },
      { name: "無料トライアル", included: false },
      { name: "AI 需要予測", included: true, note: "追加モジュール" },
    ],
    faqs: [
      {
        question: "導入期間はどのくらいですか？",
        answer:
          "業種別テンプレートを利用しても、標準的には10〜18か月です。拠点数と既存システムの連携範囲で大きく変動します。",
      },
      {
        question: "海外拠点にも展開できますか？",
        answer:
          "複数通貨・複数会計基準を標準サポートしており、40か国以上での稼働実績があります。",
      },
    ],
    scores: { ai: 3, security: 5, extensibility: 5, support: 3, ease: 1 },
    highlights: [
      {
        title: "単一データモデル",
        body: "会計・購買・生産・人事が同じデータを見ます。モジュール間の突合作業がなくなります。",
      },
      {
        title: "連結決算を前提に設計",
        body: "複数通貨・複数会計基準を標準サポート。40か国以上での稼働実績があります。",
      },
      {
        title: "業種別テンプレート",
        body: "ゼロから設計せず、業種のひな形をベースに構成。期間とリスクを圧縮します。",
      },
    ],
    documents: [
      { title: "製品概要資料", pages: 56 },
      { title: "導入方法論・標準スケジュール", pages: 44 },
      { title: "モジュール一覧・価格", pages: 22 },
    ],
  },
  {
    id: "takumi-erp",
    name: "匠ERP",
    vendor: "匠システムズ株式会社",
    logo: "TK",
    accent: "#b45309",
    categorySlug: "erp",
    summary: "日本の製造業の現場に合わせた国産 ERP。個別受注生産に強い。",
    description:
      "匠ERP は、日本の中堅製造業に対象を絞った国産 ERP です。個別受注生産・多品種少量といった、海外製 ERP が苦手とする生産形態を標準機能でカバーします。日本の商習慣（締め請求、手形、検収基準）に最初から対応しているため、アドオン開発を大幅に減らせます。導入は平均6か月で、国内パートナーによる伴走が前提の提供形態です。",
    rating: 4.2,
    reviewCount: 112,
    priceFrom: 320_000,
    priceUnit: "月額（30ユーザーから）",
    licenseModel: "ユーザー課金 + モジュール課金（年間契約）",
    industrySlugs: ["manufacturing", "distribution"],
    challengeSlugs: ["dx", "data"],
    companySizes: ["51-300", "301-1000", "1001+"],
    cloud: true,
    aiReady: false,
    origin: "国産",
    freeTrial: false,
    certified: true,
    customerCount: 720,
    publishedAt: "2026-02-24",
    features: [
      { name: "会計・購買・生産・人事の統合", included: true, note: "人事は外部連携" },
      { name: "個別受注生産・多品種少量対応", included: true },
      { name: "日本の商習慣対応（締め請求・手形・検収）", included: true },
      { name: "複数通貨・複数会計基準", included: false },
      { name: "連結決算", included: false },
      { name: "オンプレミス提供", included: true },
      { name: "日本語 UI", included: true },
      { name: "無料トライアル", included: false, note: "デモ環境で評価可" },
    ],
    faqs: [
      {
        question: "個別受注生産に対応していますか？",
        answer:
          "標準機能で対応しています。海外製 ERP でアドオンが必要になる多品種少量・個別受注の生産形態を前提に設計されています。",
      },
      {
        question: "海外拠点があります。使えますか？",
        answer:
          "複数通貨・連結決算には対応していません。海外拠点を含む連結が必要な場合はグローバル ERP をご検討ください。",
      },
      {
        question: "導入期間はどのくらいですか？",
        answer: "平均6か月です。国内パートナーが要件定義から本稼働まで伴走します。",
      },
    ],
    scores: { ai: 2, security: 4, extensibility: 4, support: 5, ease: 3 },
    highlights: [
      {
        title: "個別受注生産が標準機能",
        body: "海外製 ERP でアドオンになりがちな多品種少量・個別受注を、最初から想定した設計です。",
      },
      {
        title: "商習慣対応でアドオン削減",
        body: "締め請求・手形・検収基準に標準対応。カスタマイズ費用を大きく圧縮できます。",
      },
      { title: "平均6か月で稼働", body: "国内パートナーが要件定義から本稼働まで伴走します。" },
    ],
    documents: [
      { title: "製品概要資料", pages: 30 },
      { title: "生産管理モジュール詳細", pages: 26 },
    ],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);
