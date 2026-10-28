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
