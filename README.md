# モーニングコンパス 番組進行表（GAS）

架空の情報番組「モーニングコンパス」の進行表を Google Apps Script（GAS）で管理するリポジトリです。
**Claude Code（Web 版）で直して GitHub にマージするだけで、GAS に反映されます。**
AI の働き方のルールは [CLAUDE.md](CLAUDE.md) にあります。

## アプリを入れなくても動く仕組み

```
ブラウザの Claude Code（claude.ai/code）に「コーナーを1つ足して」と頼む
   ↓
Claude がこのリポジトリを読み、src/Code.js を直して PR を出す
   ↓
人が PR を読んで、マージする（= main に push される）
   ↓
GitHub Actions が起動（.github/workflows/deploy-gas.yml）
   ↓
clasp push で GAS に反映される → GAS エディタを開き直すと変わっている
```

手元の PC には何も入れません。Claude も clasp も、全部ブラウザの向こう側で動きます。

## 同じ仕組みを自分の GAS に入れる（3ステップ）

> 前提: 反映したい GAS プロジェクトがあること（スプレッドシートの「拡張機能 → Apps Script」で開くものでも可）。
> Claude Code（Web 版）を使うには Claude の契約（Pro / Max / Team）が必要です。

### 0. 一度だけ: Apps Script API をオンにする

Google アカウントで https://script.google.com/home/usersettings を開き、**Google Apps Script API** をオンにします。これが無いと clasp が GAS に書き込めません。

### 1. Google の鍵を作って Secret に入れる

`clasp login` を**一度だけ**どこかで実行し、できた認証ファイルの中身を GitHub の Secret に入れます。
PC に Node を入れられない場合は、ブラウザで動く **GitHub Codespaces**（リポジトリの Code → Codespaces → Create）で実行できます。

```bash
npm install -g @google/clasp@3.3.0
clasp login --no-localhost -A ./clasp-auth.json
```

表示された URL をブラウザで開いて許可し、戻ってきたコードを貼ると `clasp-auth.json` ができます。

```bash
gh secret set CLASPRC_JSON < ./clasp-auth.json
```

（`gh` が無ければ、ファイルの中身をコピーして **Settings → Secrets and variables → Actions → New repository secret** に Name `CLASPRC_JSON` で貼る）

> 鍵ファイルはパスワードと同じです。リポジトリにコミットしない・チャットに貼らない。Secret に入れたら手元のファイルは消してください。

### 2. リポジトリに3つのファイルを置く

| ファイル | 役割 | 書くこと |
|---|---|---|
| `.clasp.json` | 反映先 | `scriptId` に GAS の **プロジェクト設定 → スクリプト ID** を貼る。`rootDir` は `src` |
| `src/appsscript.json` | GAS の設定 | GAS エディタの「プロジェクト設定 → マニフェストを表示」の中身。無ければ [src/appsscript.json](src/appsscript.json) をコピー |
| `.github/workflows/deploy-gas.yml` | 反映の手順 | [.github/workflows/deploy-gas.yml](.github/workflows/deploy-gas.yml) をそのまま |

既存の GAS コードがあるなら `src/` に `.js` として置きます（GAS エディタの各ファイルが1本ずつ対応）。

ここまで置いて main に push すると、**Actions** タブに「Deploy to GAS」が1行増え、緑のチェックになれば反映されています。

### 3. Claude Code（Web 版）に頼む

1. https://claude.ai/code を開き、**GitHub を接続**（Claude GitHub App を設置し、対象リポジトリを選ぶ）
2. リポジトリを選んで、やってほしいことを日本語で書く

```
エンディングの前に「視聴者からのお便り」コーナー（5分、メモは「番組公式アカウントに届いた声を紹介」）を追加してください。
src/Code.js の SEGMENTS 配列だけを直して、PR にしてください。
```

3. Claude がブランチに push し、PR を作ります。差分を読んで **Merge**
4. マージの数十秒後に Actions が走り、GAS エディタを開き直すとコードが変わっています

## うまく動かないとき

| 症状 | 見るところ |
|---|---|
| Actions に実行が増えない | ファイル名が `.github/workflows/deploy-gas.yml` か／push 先が `main` か（PR をマージしたか） |
| 「Google の鍵を復元する」で赤× | Secret の **Name の綴り**（`CLASPRC_JSON`）。値が空だとここで止まる |
| 「GAS に反映する」で赤×・`User has not enabled the Apps Script API` | 手順 0 の Apps Script API がオフ。鍵を作った Google アカウントでオンにする |
| 「GAS に反映する」で赤×・`invalid_grant` / `401` | 鍵が古い・貼り損ね。`clasp login` からやり直して Secret を上書き |
| 「GAS に反映する」で赤×・`404` / `Requested entity was not found` | `.clasp.json` の scriptId が違う。GAS の「プロジェクト設定 → スクリプト ID」を貼り直す |
| 緑なのに GAS が変わらない | GAS エディタを再読み込み。`rootDir` が `src` になっているか |
| Claude Code（Web）がリポジトリを出さない | Claude GitHub App の設置対象にそのリポジトリが入っているか |

## 費用と注意

- GitHub Actions の実行時間（public リポジトリは無料・private は月の無料枠あり）と、Claude の契約がかかります。clasp と GAS は無料です。反映1回はおよそ30秒（実測: ジョブ17秒＋待ち数秒）
- 鍵は作った人の Google アカウントの権限で動きます。組織で使うなら専用アカウントで鍵を作ります
- 機密情報を置くリポジトリには Claude を接続しない。AI が読める範囲＝リポジトリ全体です
- GAS エディタで直接直すと、次の反映で上書きされます。直すのは GitHub 側だけにします
