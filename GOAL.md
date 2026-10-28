# GOAL — モーニングコンパス 番組進行表（GitHub Actions × clasp × GAS デモ）

## 1. 目的

Claude Code のアプリを入れられない環境でも、ブラウザの Claude Code（Web 版）と GitHub だけで GAS の開発・反映が回る——その完成形を、TBS 向けセミナー第6回（2026-10-29）で見せるためのデモリポジトリ。

## 2. 対象

- セミナー受講者（TBS メディアテクノロジー局・非エンジニア〜初級。GitHub は第5回で「リポジトリを作ってコミットするだけ」まで経験。GAS はスプレッドシート周りで触ったことがある）
- 講師（当日このリポジトリを「完成形」として投影し、別の空リポジトリで同じ手順をゼロから再現する）

## 3. 完成状態（Definition of Done）

- [ ] `.github/workflows/deploy-gas.yml` が置かれ、main への push で `clasp push` が走る
- [ ] Secret `CLASPRC_JSON` が登録され、`.clasp.json` に反映先の scriptId が入っている
- [ ] Claude Code（Web）で `src/Code.js` を直した PR をマージすると、Actions が緑になり GAS エディタに反映される履歴が残っている
- [ ] 上記を投影したとき、顧客名・個人情報・鍵の値が画面に出ない

## 4. 絶対に守る制約

- 題材は架空の番組「モーニングコンパス」のみ。実在の番組・放送局・数字を出さない
- 鍵（`.clasprc.json` の中身）をリポジトリ・Issue・ログに書かない
- リポジトリは private のまま。公開や第三者への共有はしない

## 5. やらないこと（非スコープ）

- Web アプリの公開デプロイ（`clasp deploy`）。反映は `clasp push` まで
- 参加者のハンズオン用テンプレート（第6回は講師デモのみ）
- Actions の中で Claude を動かすこと（`@claude` 方式は採らない。Claude は Web 版で動く）

## 6. 判断基準

変更を加えるときは「**この作業は §3 の完成状態のどれに効くか**」で判断する。

## 更新ログ（追記のみ）

- 2026-10-28 初版（第6回セミナー用に記入）
- 2026-10-28 方式を「Issue → Actions 内の Claude → PR」から「Web 版 Claude Code → push → Actions → clasp → GAS」へ変更
