# CHANGELOG — モーニングコンパス制作ドキュメント置き場（GitHub Actions × Claude Code デモ）

確定した変更の履歴。**マージされた変更だけ**を新しい順に記録する。
議論・試行錯誤の経緯はIssueに書く（記録の使い分けは ai-company の CLAUDE.md §4.6）。

記録項目: 日付／バージョンまたはIssue番号／変更対象／変更内容／変更理由／影響範囲

---

## 2026-10-28 — 案件開始

- **変更対象**: リポジトリ全体
- **変更内容**: 案件ディレクトリを新設（clone-firstフロー）
- **変更理由**: モーニングコンパス制作ドキュメント置き場（GitHub Actions × Claude Code デモ） の作業開始
- **影響範囲**: なし（初期化）

## 2026-10-28 — Claude Code の受け入れ準備

- **変更対象**: `.github/workflows/claude.yml`・`CLAUDE.md`・`AGENTS.md`・`GOAL.md`・`README.md`・`docs/`
- **変更内容**: `@claude` で動くワークフロー、AI の働き方ルール、3ステップ手順、フォルダ構成と会議メモの見本を追加
- **変更理由**: TBS 第6回セミナー（10/29）の完成版デモとして使うため
- **影響範囲**: Secret `CLAUDE_CODE_OAUTH_TOKEN` と Claude GitHub App の設置は別途（手作業）

## 2026-10-28 — 方式を clasp × GAS に変更

- **変更対象**: `.github/workflows/deploy-gas.yml`（新規）・`.clasp.json`（新規）・`src/Code.js`・`src/appsscript.json`（新規）・`CLAUDE.md`・`AGENTS.md`・`GOAL.md`・`README.md`。旧 `.github/workflows/claude.yml` と `docs/` は `_archive/a-plan-issue-claude/` へ退避（git 管理外）
- **変更内容**: 「Issue に `@claude` → Actions 内で Claude が文書を書く」構成から、「Web 版 Claude Code で `src/` を直す → PR をマージ → Actions が `clasp push` → GAS に反映」構成へ変更
- **変更理由**: セミナーの題材が「GAS の反映を GitHub Actions に任せる」であることが 10/28 夜に確定したため（Claude のトークンは不要になり、Secret は Google の鍵 `CLASPRC_JSON` に変わった）
- **影響範囲**: Secret `CLASPRC_JSON` の登録と `.clasp.json` の scriptId 記入は別途（手作業）
