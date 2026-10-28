# AGENTS.md — AIエージェント向けの運用ルール

このリポジトリで働く AI（Claude Code・Codex など）は、まず [CLAUDE.md](CLAUDE.md) のルールに従ってください。
加えて次を守ります。

- 書き込みは **`src/` 配下のみ**。`.github/`・`.clasp.json`・ルートの文書を変更しない
- ファイルやフォルダを削除しない。不要になったコードは関数ごとコメントで残すか、PR で相談する
- シークレット（Google の鍵・トークン）をコードやログに書かない。Secrets の値を表示しない
- GAS への反映は GitHub Actions が行う。AI が `clasp push` を直接実行しない
- 成果物は PR までで、マージは人が行う
- 確定した変更は `CHANGELOG.md` に新しい順で記録する（PR をマージした人が書く）
