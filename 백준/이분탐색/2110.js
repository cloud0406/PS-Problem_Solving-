const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2110.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const distance = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

function soloution() {
  let left = 1; // 공유기 거리가 될 수 있는 최소 값
  let right = distance[N - 1] - distance[0]; // 공유기 거리 최대값 (제일 먼 곳 - 제일 가까운 곳)

  while (left <= right) {
    // 가장 인접한 두 공유기 사이 거리를 mid로 가정
    const mid = Math.floor((left + right) / 2);

    // 첫 번째 좌표부터 공유기 설치하고 탐색
    let prevInstall = distance[0];
    let count = 1;

    // 모든 좌표 탐색
    for (const curLocation of distance) {
      // '이전 설치 좌표 ~ 현재 좌표 거리'가 가정한 mid값 보다 작아서 공유기 설치 불가면 다음 좌표로 패스
      if (curLocation - prevInstall < mid) continue;
      // 아니면 공유기 현재 위치에 설치하고 설치 개수 세어줌
      prevInstall = curLocation;
      count++;
    }

    // 가정한 mid 값으로 공유기를 전부 설치 못하면 공유기간의 거리를 줄여보고, 전부 설치 가능하면 공유기간의 거리를 더 늘려서 시도해본다
    if (count < C) right = mid - 1;
    else left = mid + 1;
  }

  console.log(right);
}

soloution();
