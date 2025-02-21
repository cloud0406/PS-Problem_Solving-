const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1911.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);
// 시작 위치 기준 정렬
const pools = input
  .slice(1)
  .map((line) => line.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

let count = 0;
let current = 0; // 현재 마지막 널빤지 위치

for (let [start, end] of pools) {
  // 마지막 널빤지 위치, 웅덩이 시작점 중 뒤 좌표로 갱신
  if (start > current) current = start;

  // 웅덩이 덮는데 필요한 널빤지 계산
  while (current < end) {
    current += L;
    count++;
  }
}

console.log(count);
