const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1689.txt"
  )
  .toString()
  .trim()
  .split("\n");

let n = +input[0];
let lines = [];
let answer = 0;

for (let i = 1; i <= n; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  lines.push([a, 1]);
  lines.push([b, -1]);
}

lines.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1]; // 같은 좌표에서는 끝점(-1)이 앞에 오도록
  return a[0] - b[0]; // 좌표에 따라 정렬
});

let cnt = 0;
for (let i = 0; i < lines.length; i++) {
  cnt += lines[i][1]; // 선분 시작(1) 또는 끝(-1)을 반영
  answer = Math.max(cnt, answer); // 최대 겹치는 선분 개수 업데이트
}

console.log(answer);
