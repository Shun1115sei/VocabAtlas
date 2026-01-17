# VocabAtlas — Modern English Vocabulary Flashcard App

VocabAtlasは、効率的な英単語学習のために開発された最新のWebアプリケーションです。
従来の静的HTMLから、PWA（Progressive Web Apps）対応のモダンなシングルページアプリケーション（SPA）ライクな構成に生まれ変わりました。

## ✨ 主な新機能 (New Features)

### 1. 🧠 スマート学習 (Advanced Learning)
- **Spaced Repetition System (SRS)**: 忘却曲線に基づいた復習アルゴリズム（SM-2簡易版）を搭載。
- **Global Quiz Mode**: 収録されている全単語からランダムに出題される「総合クイズ」機能。
- **復習リマインダー**: アプリ起動時に、復習が必要な単語がある場合に通知でお知らせします。

### 2. 🔍 強力な検索機能 (Global Search)
- **日本語検索対応**: 英単語だけでなく、日本語の意味（例：「輸入」）からも検索可能。
- **詳細検索**: 全単語帳を横断して瞬時に検索できます。

### 3. ☁️ クラウド同期 (Cloud Sync)
- **Firebase連携**: 
  - **Googleログイン**: どのデバイスからでも学習状況を引き継げます。
  - **進捗同期**: 覚えた単語（Known）や、SRSによる復習スケジュールをクラウドに保存。

### 4. 🎨 モダンUI/UX
- **Glassmorphism Design**: ボタンやUIにトレンドの「すりガラス」表現を採用。
- **Mobile First**: スマホ操作に最適化されたレイアウト（親指操作しやすいボタン配置）。
- **Dark/Light Theme**: 洗練されたカラーパレット。

## 🛠 技術スタック (Tech Stack)

- **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Flexbox/Grid), HTML5
- **Backend (BaaS)**: Firebase (Authentication, Cloud Firestore)
- **Data Architecture**: JSON-based Vocabulary Logic (Dynamic Loading)
- **PWA**: Service Workerによるオフラインキャッシュ対応

## 📂 ディレクトリ構成

```
VocabAtlas/
├── index.html          # ダッシュボード（ホーム画面）
├── quiz.html           # クイズモード専用インターフェース
├── assets/
│   ├── js/
│   │   ├── app.js      # メインアプリケーションロジック
│   │   ├── search.js   # 全文検索エンジン
│   │   ├── quiz.js     # クイズロジック
│   │   ├── srs.js      # SRSアルゴリズム・通知ロジック
│   │   └── firebase-*.js # クラウド連携
│   ├── css/            # 共通スタイルシート
│   └── data/           # 単語データ（JSON形式）
└── *.html              # 各単語帳ビューアー（JSローダー）
```

## 🚀 始め方 (How to Run)

### ローカル開発環境

1. プロジェクトをクローン
   ```bash
   git clone https://github.com/Shun1115sei/VocabAtlas.git
   ```
2. ローカルサーバーを起動（CORS制限回避のため必要）
   ```bash
   python3 -m http.server 8000
   ```
3. ブラウザでアクセス
   `http://localhost:8000`

### Firebase設定
クラウド機能を利用するには、`assets/js/firebase-config.js` に独自のFirebaseプロジェクトキーを設定する必要があります。

## 📝 ライセンス
本プロジェクトは学習・個人利用を目的としています。
データの二次配布等はご遠慮ください。
