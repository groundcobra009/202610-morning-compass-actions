# モーニングコンパス制作ドキュメント置き場

架空の情報番組「モーニングコンパス」の企画書・構成表・リサーチ・会議メモを置くリポジトリです。
**Issue に `@claude` と書くだけで、AI が文書のたたき台を書いて PR を出します。**
AI の働き方のルールは [CLAUDE.md](CLAUDE.md) にあります。

## アプリを入れなくても動く仕組み

```
あなたが Issue を書く（@claude ＋ 頼みごと）
   ↓
GitHub Actions が起動（.github/workflows/claude.yml）
   ↓
Claude Code がこのリポジトリを読み、docs/ に文書を書く
   ↓
PR が届く → 人が読んで、マージする
```

手元の PC には何も入れません。必要なのは GitHub のブラウザ画面だけです。

## 同じ仕組みを自分のリポジトリに入れる（3ステップ）

> 前提: 自分がそのリポジトリの管理者であること。Claude の契約（Pro / Max / Team）か Claude API のキーが必要です。

### 1. Claude GitHub App を設置する

1. https://github.com/apps/claude を開き **Install**
2. **Only select repositories** で対象のリポジトリだけを選んで **Install**
3. リポジトリの **Settings → GitHub Apps** に Claude が並べば完了

### 2. Secret にトークンを登録する

1. Claude の契約者が、手元の Claude Code で次を実行し、表示されたトークンをコピーする
   ```bash
   claude setup-token
   ```
   （API キー方式の場合は Claude Console で発行したキーを使う）
2. リポジトリの **Settings → Secrets and variables → Actions → New repository secret**
3. Name は次のとおり正確に。Secret に 1. の値を貼って **Add secret**

   | 方式 | Name |
   |---|---|
   | Claude の契約で動かす | `CLAUDE_CODE_OAUTH_TOKEN` |
   | API キーで動かす | `ANTHROPIC_API_KEY` |

   値は保存後に二度と表示されません。コードや Issue に貼らないでください。

### 3. ワークフローのファイルを置く

1. **Code → Add file → Create new file**
2. ファイル名を `.github/workflows/claude.yml` にする
3. [.github/workflows/claude.yml](.github/workflows/claude.yml) の中身をそのまま貼って **Commit changes**
   （API キー方式なら `claude_code_oauth_token:` の行を `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}` に変える）

### 動かしてみる

Issue を1枚立て、本文の先頭に `@claude` を付けて頼みごとを書きます。

```
@claude 架空の情報番組「モーニングコンパス」の企画書の骨子を作って、PRにしてください。

## やること
1. docs/企画書/企画書_骨子.md を日本語で新規作成する
2. 見出しは「番組コンセプト」「ターゲット」「構成（コーナー案3つ）」「差別化ポイント」「今後の検討事項」の5つ
3. 各見出しに2〜4行のたたき台を書く（数字・実在の番組名は使わない）
```

**Actions** タブに実行が1行増え、数分後に Issue へ Claude のコメントと PR へのリンクが付きます。

## うまく動かないとき

| 症状 | 見るところ |
|---|---|
| Actions に実行が増えない | ファイル名が `.github/workflows/claude.yml` か／本文に `@claude` が完全な単語で入っているか（`/claude` `@claude-bot` は不可）／App が**このリポジトリ**に設置されているか |
| 実行はあるが赤× | ログの「Run Claude Code」を開く。認証系の文言なら Secret の**名前の綴り**か値の貼り損ね。権限系なら呼んだ人に write 権限があるか |
| PR が自動で開かない | Claude のコメント内のリンクから PR を作る（仕様） |

## 費用と注意

- GitHub Actions の実行時間（private リポジトリは月の無料枠あり）と、Claude の契約または API 利用料がかかります
- トークンは発行した人の契約に紐づきます。組織で共有するなら API キー方式を使います
- 機密情報を置くリポジトリには入れない。AI が読める範囲＝リポジトリ全体です
