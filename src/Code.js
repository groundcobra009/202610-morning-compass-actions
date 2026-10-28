/**
 * モーニングコンパス 番組進行表（架空の情報番組）
 *
 * このファイルは GitHub の main に push されると、GitHub Actions が
 * clasp で GAS に反映します。GAS のエディタで直接編集しないでください
 * （次の反映で上書きされます）。
 */

/** 放送開始時刻（HH:MM） */
const ON_AIR_START = '07:00';

/**
 * コーナー一覧。上から順に放送する。
 * minutes は尺（分）。開始時刻は buildRundown() が自動で計算する。
 */
const SEGMENTS = [
  { title: 'オープニング', minutes: 3, note: '今日の見どころを30秒で' },
  { title: '今日のニュース', minutes: 12, note: '上位3本を深掘り' },
  { title: '天気と交通', minutes: 5, note: '通勤・通学向け' },
  { title: '特集: 朝ごはん探訪', minutes: 15, note: 'ロケVTR＋スタジオトーク' },
  { title: 'エンディング', minutes: 5, note: '明日の予告' },
];

/**
 * 開始時刻つきの進行表を組み立てる。
 * @return {{time: string, title: string, minutes: number, note: string}[]}
 */
function buildRundown() {
  const [h, m] = ON_AIR_START.split(':').map(Number);
  let cursor = h * 60 + m;
  return SEGMENTS.map((seg) => {
    const time = `${String(Math.floor(cursor / 60)).padStart(2, '0')}:${String(cursor % 60).padStart(2, '0')}`;
    cursor += seg.minutes;
    return { time, title: seg.title, minutes: seg.minutes, note: seg.note };
  });
}

/** 進行表を文字列にする（ログ・メール・チャット貼り付け用） */
function formatRundown() {
  const rows = buildRundown().map(
    (r) => `${r.time}  ${r.title}（${r.minutes}分） ${r.note}`
  );
  const total = SEGMENTS.reduce((sum, s) => sum + s.minutes, 0);
  return ['モーニングコンパス 進行表', ...rows, `合計 ${total} 分`].join('\n');
}

/** GAS エディタの「実行」で動作確認するための関数。実行ログに進行表が出る */
function logRundown() {
  Logger.log(formatRundown());
}

/** Web アプリとして開いたときの表示 */
function doGet() {
  const rows = buildRundown()
    .map(
      (r) =>
        `<tr><td>${r.time}</td><td>${r.title}</td><td>${r.minutes}</td><td>${r.note}</td></tr>`
    )
    .join('');
  const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<title>モーニングコンパス 進行表</title>
<style>body{font-family:sans-serif;padding:24px}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:6px 12px}</style>
</head><body><h1>モーニングコンパス 進行表</h1>
<table><tr><th>開始</th><th>コーナー</th><th>分</th><th>メモ</th></tr>${rows}</table>
</body></html>`;
  return HtmlService.createHtmlOutput(html).setTitle('モーニングコンパス 進行表');
}
