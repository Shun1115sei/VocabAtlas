# CLAUDE.md — VocabAtlas Project Guide

このファイルは、Claude Code がこのリポジトリで作業する際の指針を提供します。

## プロジェクト概要

**VocabAtlas** は、効率的な英単語学習のための Web フラッシュカードアプリケーションです。
PWA（Progressive Web Apps）対応のモダンな構成で、SRS（間隔反復）・クイズ・検索・Firebase クラウド同期などの機能を備えています。

## 技術スタック

- **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Flexbox/Grid), HTML5
- **Backend (BaaS)**: Firebase (Authentication, Cloud Firestore)
- **Data**: JSON ベースの動的単語データ読み込み
- **PWA**: Service Worker によるオフラインキャッシュ
- **ビルドツール**: なし（フレームワーク不使用の静的サイト）

## ディレクトリ構成

```
VocabAtlas/
├── index.html              # ダッシュボード（ホーム画面・デッキ一覧）
├── login.html              # ログイン画面
├── quiz.html               # クイズモード専用インターフェース
├── 5000_*.html             # 各単語帳フラッシュカードページ
├── kyukyoku_*.html         # 究極単語帳ページ
├── manifest.json           # PWA マニフェスト
├── service-worker.js       # Service Worker
├── assets/
│   ├── css/
│   │   └── style.css       # 全ページ共通のスタイルシート（唯一のCSS）
│   ├── js/
│   │   ├── app.js          # フラッシュカードのメインロジック（FlashcardApp クラス）
│   │   ├── confetti.js     # 完了時の紙吹雪アニメーション
│   │   ├── search.js       # 全文検索エンジン
│   │   ├── quiz.js         # クイズロジック
│   │   ├── srs.js          # SRS アルゴリズム・通知ロジック
│   │   ├── firebase-config.js    # Firebase 設定
│   │   ├── firebase-manager.js   # Firebase 連携・同期処理
│   │   └── auth-guard.js         # 認証ガード
│   ├── data/               # 単語データ（JSON形式、動的に読み込み）
│   │   ├── 5000_*.json     # TOEFL 5000 単語帳データ
│   │   └── kyukyoku_*.json # 究極単語帳データ
│   └── icons/              # PWA・アプリ用アイコン
├── *.py                    # ユーティリティスクリプト（データ変換等）
├── CLAUDE.md               # Claude Code 用プロジェクトガイド（本ファイル）
├── SKILL.md                # 単語帳フラッシュカード生成スキル（/vocab コマンド）
└── README.md               # プロジェクト説明
```

## ローカル開発

```bash
# ローカルサーバー起動（CORS 制限回避のため必須）
python3 -m http.server 8000

# ブラウザでアクセス
# http://localhost:8000
```

Firebase クラウド機能を使うには `assets/js/firebase-config.js` に Firebase プロジェクトキーの設定が必要。

## 厳守すべきコーディングルール

### CSS
- **`assets/css/style.css` のみ** を使用すること
- インライン CSS (`style=""`)、内部 `<style>` ブロックは **禁止**
- 外部 CDN（Bootstrap, Tailwind 等）の追加は **禁止**

### JavaScript
- フラッシュカードページでは `assets/js/app.js` と `assets/js/confetti.js` のみ使用
- HTML ファイル内に複雑な JS ロジックを書かない
- `const app = new FlashcardApp(vocabulary);` で初期化

### HTML 構造
- すべてのフラッシュカード HTML は `AIPROMPT_README.md` に定義されたボイラープレートに **厳密に従う**こと
- クラス名・ID・要素階層を変更しない

### index.html の更新
- **🚨 絶対に `index.html` を全体書き換えしないこと**
- 新しいデッキを追加する場合は、対象カテゴリの `<div class="deck-grid">` 内に新しい `<a>` ブロックを **末尾に追記** するだけ
- 既存のデッキやコードを削除・改変しない

### データ形式
各単語は以下の4フィールドを持つオブジェクト:
```json
{
  "word": "example",
  "phonetic": "[igzǽmpl]",
  "translation": "例",
  "meaning": "詳しい日本語説明。<br>改行にはbrタグを使用。"
}
```

## 主要なタスクパターン

### 新しい単語帳の追加
1. `SKILL.md` の手順に厳密に従う（`/vocab` コマンドで自動実行可能）
2. 単語データの JSON 配列を作成
3. ボイラープレートに基づいて HTML ファイルを生成
4. `index.html` の適切なカテゴリに新しいデッキカードを **追記**

### テーマカラー（デッキカード用）
`theme-blue`, `theme-red`, `theme-green`, `theme-orange`, `theme-gold`, `theme-teal`, `theme-purple`, `theme-brown`

## Git ワークフロー

```bash
git add .
git commit -m "Update: 変更内容の説明"
git push origin main
```
