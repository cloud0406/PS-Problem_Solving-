const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20665.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, T, P] = input[0].split(" ").map(Number);
let times = [];
for (let i = 1; i <= T; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  times.push([start, end]);
}

times.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let last = Array(N + 1).fill(0);
let info = Array.from({ length: N + 1 }, () => []);

info[1].push(times[0]);
last[1] = times[0][1];

for (let t = 1; t < T; t++) {
  const [start, end] = times[t];
  let temp = [];

  for (let i = 1; i <= N; i++) {
    if (start < last[i]) {
      temp.push(i);
    }
  }

  let maxDist = 0;
  let minIdx = 1;

  for (let j = 1; j <= N; j++) {
    let v = 101;
    for (let k of temp) {
      v = Math.min(Math.abs(j - k), v);
    }
    if (v === 0) continue;
    if (v > maxDist) {
      maxDist = v;
      minIdx = j;
    }
  }

  last[minIdx] = end;
  info[minIdx].push([start, end]);
}

let answer = 720;

for (let i = 0; i < info[P].length; i++) {
  const [s, e] = info[P][i];
  const si = Math.floor(s / 100),
    sj = s % 100,
    ei = Math.floor(e / 100),
    ej = e % 100;

  let val;
  if (ej - sj < 0) {
    val = (ei - si - 1) * 60 + (60 - (sj - ej));
  } else {
    val = (ei - si) * 60 + (ej - sj);
  }

  answer -= val;
}

console.log(answer);
