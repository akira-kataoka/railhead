import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "c-nexus-01",
    productId: "nexus-sales-cloud",
    company: "大和精密工業株式会社",
    industrySlug: "manufacturing",
    companySize: "1001+",
    challengeSlugs: ["sales-efficiency", "data"],
    title: "商談情報が担当者の頭の中にしかない状態から、全社で見える予実へ",
    before:
      "商談の進捗が担当者ごとの Excel に散在し、月次の予実集計に営業事務が3日かかっていた。着地見込みは月末まで分からず、期末の追い込みが常に博打になっていた。",
    solution:
      "Nexus Sales Cloud を全国8拠点420名に展開。メール・カレンダー連携で活動履歴を自動生成し、担当者の入力を商談ステージの更新だけに絞った。予実は組織階層に沿って自動集計される構成にした。",
    effect:
      "月次集計の3日がゼロになり、着地見込みが日次で見えるようになった。マネージャーが期中に手を打てるようになり、四半期の予実乖離が縮小した。",
    roi: "年間3,400万円の工数削減 / 投資回収 14か月",
    hasVideo: true,
    interview: {
      quote:
        "入力させないという設計思想が決め手でした。過去に2回 SFA が形骸化していたので、現場が入力し続けられるかだけを見ていました。",
      person: "営業企画部長",
    },
  },
  {
    id: "c-nexus-02",
    productId: "nexus-sales-cloud",
    company: "みなと信用金庫",
    industrySlug: "finance",
    companySize: "1001+",
    challengeSlugs: ["crm", "security"],
    title: "監査要件を満たしながら、渉外担当の顧客情報を一元化",
    before:
      "顧客情報が勘定系と渉外の手控えに二重管理されており、監査のたびにアクセス履歴の証跡を手作業で集めていた。",
    solution:
      "レコード単位の権限設計とフル監査ログを前提に Nexus Sales Cloud を導入。東京リージョンの専用テナント構成とし、勘定系とは日次で連携する形にした。",
    effect:
      "顧客情報の二重管理が解消し、監査時の証跡収集が自動化された。渉外担当が訪問前に顧客の全接点を確認できるようになった。",
    roi: "監査対応工数を年間 800 時間削減",
    hasVideo: false,
    interview: {
      quote:
        "金融の権限要件に最初から応えられる製品は多くありません。そこがクリアできたので、あとは現場の使い勝手の話に集中できました。",
      person: "システム部 次長",
    },
  },
  {
    id: "c-soraho-01",
    productId: "soraho-sfa",
    company: "サンライズ物流株式会社",
    industrySlug: "distribution",
    companySize: "51-300",
    challengeSlugs: ["sales-efficiency"],
    title: "過去2回失敗した SFA 導入。3度目に定着率92%まで持っていけた理由",
    before:
      "過去に2度 SFA を導入したが、いずれも入力されずに1年で停止。営業40名の商談情報は依然として日報のメール本文にあった。",
    solution:
      "SORAHO SFA の業種テンプレートを使い、3営業日で運用開始。既存の日報習慣をそのまま入口にし、スマホ入力から商談が自動で溜まる形にした。専任担当が3か月伴走した。",
    effect:
      "入力率は初月から92%。過去2回と違い、現場が「日報を書くだけ」で済むため運用が続いている。商談の停滞が可視化され、放置案件が減った。",
    roi: "年間 620 万円の工数削減 / 投資回収 8か月",
    hasVideo: true,
    interview: {
      quote:
        "機能で選ぶのをやめました。現場が続けられるかどうかだけで選んだ結果がこれです。3日で立ち上がったのも大きい。",
      person: "営業本部 副本部長",
    },
  },
  {
    id: "c-beacon-01",
    productId: "beacon-ma",
    company: "株式会社テクノフィールド",
    industrySlug: "manufacturing",
    companySize: "301-1000",
    challengeSlugs: ["marketing", "sales-efficiency"],
    title: "営業が「MA から来るリードは使えない」と言わなくなるまで",
    before:
      "MA のスコアはマーケ部門が手で組んだルールベース。営業に渡したリードの商談化率が4%に留まり、営業側がリードを無視するようになっていた。",
    solution:
      "BeaconMA に切り替え、過去2年の商談化実績からスコアリングモデルを自動生成。SFA の商談結果を学習に戻す双方向連携を組んだ。",
    effect:
      "商談化率が4%から17%へ。営業がリードを開くようになり、マーケと営業の対立が解消した。ルールのメンテナンス工数もなくなった。",
    roi: "商談化率 4% → 17% / 年間受注額 +2.8億円",
    hasVideo: true,
    interview: {
      quote:
        "スコアを人間が組んでいたのが根本原因でした。実績から学習させた瞬間に、営業の反応が変わりました。",
      person: "マーケティング部 部長",
    },
  },
  {
    id: "c-leadflow-01",
    productId: "leadflow",
    company: "株式会社メディカルサポート",
    industrySlug: "healthcare",
    companySize: "51-300",
    challengeSlugs: ["marketing"],
    title: "展示会で集めた名刺の6割が死んでいた。フォロー着手を当日中に",
    before:
      "展示会で年間3,000枚の名刺を獲得していたが、データ化に2週間かかり、フォロー開始時には熱が冷めていた。約6割が一度も接触されないまま滞留していた。",
    solution:
      "リードフローの名刺 OCR で、展示会当日にその場で一括取り込み。重複を自動名寄せし、当日中にフォローシナリオへ投入する運用に変えた。",
    effect:
      "フォロー着手が2週間後から当日へ。未接触リードがほぼゼロになり、展示会経由の商談数が2.4倍になった。",
    roi: "展示会経由の商談数 2.4倍 / 投資回収 5か月",
    hasVideo: false,
    interview: {
      quote:
        "名刺のデータ化が2週間かかっていた、という一点がボトルネックでした。そこだけ潰したら数字が変わりました。",
      person: "マーケティング課 課長",
    },
  },
  {
    id: "c-lumen-01",
    productId: "lumen-analytics",
    company: "株式会社ノースリテール",
    industrySlug: "retail",
    companySize: "1001+",
    challengeSlugs: ["data", "dx"],
    title: "「売上」の定義が部門で3種類あった。会議の最初の30分が数字合わせだった",
    before:
      "経営会議のたびに、営業・経理・店舗開発が持ち寄る数字が合わず、冒頭30分が定義のすり合わせに消えていた。意思決定が1サイクル遅れる状態が常態化。",
    solution:
      "Lumen Analytics のセマンティックレイヤーに、全社の指標定義をコードとして集約。既存 DWH にはネイティブ接続し、データを移動させない構成にした。",
    effect:
      "全部門が同じ定義の数字を見るようになり、会議冒頭の数字合わせが消滅した。ダッシュボードは各部門が自然言語で自作するようになった。",
    roi: "経営会議の意思決定リードタイム 3週間 → 5日",
    hasVideo: true,
    interview: {
      quote:
        "ツールを入れたというより、指標の定義を決め切ったのが本質でした。製品はそれを強制する仕組みとして機能しました。",
      person: "経営企画本部 データ戦略室長",
    },
  },
  {
    id: "c-datacanvas-01",
    productId: "datacanvas",
    company: "橋本電機株式会社",
    industrySlug: "manufacturing",
    companySize: "301-1000",
    challengeSlugs: ["data", "dx"],
    title: "情シス2名で全社の分析依頼を捌いていた状態からの脱却",
    before:
      "現場からの分析依頼が情シス2名に集中し、依頼から回答まで平均2週間。情シスは依頼処理に忙殺され、本来のシステム企画に手が回らなかった。",
    solution:
      "DataCanvas を全社180ユーザーに展開。基幹システムからの日次取り込みはコネクタで組み、現場が自分でダッシュボードを作れる状態にした。研修は実施していない。",
    effect:
      "分析依頼の8割が現場で完結するようになり、情シスへの依頼が週20件から4件に減少。回答リードタイムも2週間から即日になった。",
    roi: "情シス工数を月120時間削減 / 投資回収 11か月",
    hasVideo: false,
    interview: {
      quote:
        "研修をやらなくても現場が使い始めたのが驚きでした。Excel と同じ操作、というのは本当だったということです。",
      person: "情報システム部 主任",
    },
  },
  {
    id: "c-agentforge-01",
    productId: "agentforge",
    company: "セントラル商事株式会社",
    industrySlug: "distribution",
    companySize: "1001+",
    challengeSlugs: ["ai", "sales-efficiency"],
    title: "1日400件の見積依頼。AI エージェントに承認付きで任せた",
    before:
      "問い合わせメールからの見積作成が1日400件。担当6名が在庫と価格表を照合しながら手作業で作成し、繁忙期は翌日回しが常態化していた。",
    solution:
      "AgentForge で見積作成エージェントを構築。メールを起点に在庫・価格表を参照して見積を生成し、金額しきい値を超える案件だけ人間の承認を挟む設計にした。全判断はトレース可能。",
    effect:
      "見積の平均返答時間が翌日から18分に短縮。担当6名は例外対応と与信判断に集中できるようになった。誤りは承認ステップで捕捉されている。",
    roi: "見積返答 翌日 → 18分 / 年間 5,200 時間削減",
    hasVideo: true,
    interview: {
      quote:
        "いきなり全自動にはできませんでした。承認を挟める設計だったから、現場の合意が取れたんです。",
      person: "業務改革推進室 室長",
    },
  },
  {
    id: "c-koyomi-01",
    productId: "koyomi-ai",
    company: "青葉市役所",
    industrySlug: "government",
    companySize: "1001+",
    challengeSlugs: ["ai", "dx"],
    title: "議事録作成に月間900時間。自治体の文書業務に AI を通した",
    before:
      "各課の会議議事録の作成に、全庁で月間およそ900時間を費やしていた。書式が課ごとに異なり、テンプレート整備の話が5年間進まなかった。",
    solution:
      "こよみAI を全庁1,200名に展開。過去の庁内文書を読み込ませ、テンプレートを新規整備せずに各課の書式へ自動で合わせる形にした。国内処理・学習利用なしの条件が採用の前提だった。",
    effect:
      "議事録作成時間が月900時間から210時間へ。テンプレート整備という積年の課題を回避したまま、書式は自然に揃った。",
    roi: "月間 690 時間の削減 / 投資回収 7か月",
    hasVideo: false,
    interview: {
      quote:
        "テンプレートを作る話が5年進まなかった。それを作らずに済ませられたのが、この製品を選んだ理由です。",
      person: "総務課 情報政策係長",
    },
  },
  {
    id: "c-zerogate-01",
    productId: "zerogate",
    company: "千秋相互保険株式会社",
    industrySlug: "finance",
    companySize: "1001+",
    challengeSlugs: ["security", "dx"],
    title: "VPN 集中で在宅勤務が回らない。1年かけてアプリ単位の認可へ",
    before:
      "在宅勤務の拡大で VPN が飽和し、朝の接続に20分待ちが発生。VPN を通ればすべての内部ネットワークに到達できる構成もリスクとして指摘されていた。",
    solution:
      "ZeroGate を導入し、アプリ単位の認可へ段階的に移行。既存アプリの前段にコネクタを置く構成としたため、アプリの改修はゼロ。1年かけて VPN と並行運用しながら切り替えた。",
    effect:
      "VPN の接続待ちが解消し、アクセス範囲がアプリ単位に限定された。デバイス状態の継続評価により、条件を外れた端末は即座に遮断される。",
    roi: "VPN 運用コスト 年間 4,100万円削減",
    hasVideo: true,
    interview: {
      quote:
        "一度に切り替えるのは無理だと分かっていました。アプリ単位で少しずつ外せる、という点が現実的でした。",
      person: "情報セキュリティ部 部長",
    },
  },
  {
    id: "c-trustline-01",
    productId: "trustline",
    company: "北陸ホールディングス株式会社",
    industrySlug: "finance",
    companySize: "1001+",
    challengeSlugs: ["security", "data"],
    title: "監査シーズンに内部統制チームが3か月潰れる状態を終わらせた",
    before:
      "監査対応のたびに、30以上のシステムから権限情報と変更履歴を手作業で収集。内部統制チーム4名が年3か月をこの作業に費やしていた。",
    solution:
      "TRUSTLINE を主要システムに接続し、権限と変更履歴の収集を自動化。監査法人の要求フォーマットでの出力までを標準機能で賄った。",
    effect:
      "証跡収集が自動化され、監査対応期間が3か月から3週間に短縮。ガイドライン改定への追従も製品側で行われるようになった。",
    roi: "監査対応 3か月 → 3週間 / 年間 1,900 時間削減",
    hasVideo: false,
    interview: {
      quote:
        "毎年同じ資料を手で作っていました。フォーマットまで合わせて出せるので、追加の加工がありません。",
      person: "内部監査室 室長",
    },
  },
  {
    id: "c-takumi-01",
    productId: "takumi-erp",
    company: "越前工機株式会社",
    industrySlug: "manufacturing",
    companySize: "301-1000",
    challengeSlugs: ["dx", "data"],
    title: "海外製 ERP の見積はアドオンが半分。個別受注生産に国産で応えた",
    before:
      "個別受注・多品種少量の生産形態のため、海外製 ERP の見積では費用の約半分がアドオン開発だった。締め請求と手形の処理も標準では賄えなかった。",
    solution:
      "匠ERP を採用。個別受注生産と日本の商習慣が標準機能で賄えたため、アドオンを最小限に抑えた。国内パートナーが要件定義から本稼働まで伴走した。",
    effect:
      "アドオン開発費を当初見積比で 68% 圧縮し、6か月で本稼働。受注から原価が締まるまでが一気通貫になった。",
    roi: "アドオン開発費 68% 削減 / 導入期間 6か月",
    hasVideo: true,
    interview: {
      quote:
        "うちの作り方に標準で対応している、というだけで金額が半分になりました。合わせにいく必要がなかった。",
      person: "生産管理部 部長",
    },
  },
];

export const casesByProduct = (productId: string) =>
  caseStudies.filter((c) => c.productId === productId);
