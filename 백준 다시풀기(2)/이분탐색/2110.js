const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2110.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const dist = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

function solution() {
  let left = 1;
  let right = dist[N - 1] - dist[0]; // 거리 최대값 -> 제일 먼 곳 - 제일 가까운 곳

  while (left <= right) {
    // mid: 가장 인접한 두 공유기 사이 거리
    const mid = Math.floor((left + right) / 2);

    // 첫 번째 좌표 공유기 설치
    let prevInstall = dist[0];
    let cnt = 1;

    // '이전 설치 좌표 ~ 현재 좌표 거리'가 가정한 mid값 보다 작아서 공유기 설치 불가면 다음 좌표로 패스
    // 아니면 공유기 설치
    for (const cur of dist) {
      if (cur - prevInstall < mid) continue;

      prevInstall = cur;
      cnt++;
    }

    // mid 값으로 공유기 전부 설치 못하면 거리 줄이기 / 전부 설치 가능하면 거리 더 늘리기
    if (cnt < C) right = mid - 1;
    else left = mid + 1;
  }

  console.log(right);
}

solution();
