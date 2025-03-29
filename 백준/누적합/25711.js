const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/25711.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [n, q] = input[line++].split(" ").map(Number);

const xValues = input[line++].split(" ").map(Number);
const yValues = input[line++].split(" ").map(Number);

const points = Array(n + 1);
for (let i = 1; i <= n; i++) {
  points[i] = { x: xValues[i - 1], y: yValues[i - 1] };
}

// 정방향과 역방향 누적 거리 배열
const forwardDist = Array(n + 1).fill(0);
const backwardDist = Array(n + 1).fill(0);

// 정방향 누적 거리 계산
for (let i = 1; i < n; i++) {
  const dx = points[i].x - points[i + 1].x;
  const dy = points[i].y - points[i + 1].y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  let multiplier;
  if (points[i].y > points[i + 1].y) multiplier = 1; // 내리막길
  else if (points[i].y === points[i + 1].y) multiplier = 2; // 평지
  else multiplier = 3; // 오르막길

  forwardDist[i + 1] = forwardDist[i] + multiplier * distance;
}

// 역방향 누적 거리 계산
for (let i = n; i > 1; i--) {
  const dx = points[i].x - points[i - 1].x;
  const dy = points[i].y - points[i - 1].y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  let multiplier;
  if (points[i].y > points[i - 1].y) multiplier = 1;
  else if (points[i].y === points[i - 1].y) multiplier = 2;
  else multiplier = 3;

  backwardDist[i - 1] = backwardDist[i] + multiplier * distance;
}

const results = [];
for (let i = 0; i < q; i++) {
  const [s, e] = input[line++].split(" ").map(Number);

  if (s === e) results.push("0");
  else if (s < e) results.push((forwardDist[e] - forwardDist[s]).toString());
  else results.push((backwardDist[e] - backwardDist[s]).toString());
}

console.log(results.join("\n"));
