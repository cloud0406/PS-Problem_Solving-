const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1027.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const buildings = input[1].split(" ").map(Number);

function solution(N, buildings) {
  let answer = 0;

  for (let cur = 0; cur < N; cur++) {
    let rightMax = -Infinity;
    let leftMax = Infinity;
    const x1 = cur;
    const y1 = buildings[cur];
    let cnt = 0;

    // 오른쪽 빌딩 탐색
    //  오른쪽 빌딩은 기울기가 이전보다 커야 사이 건물 볼 수 있음
    for (let right = cur + 1; right < N; right++) {
      const x2 = right;
      const y2 = buildings[right];
      const inclination = (y2 - y1) / (x2 - x1);
      if (inclination > rightMax) {
        cnt++;
        rightMax = inclination;
      }
    }

    // 왼쪽 빌딩 탐색
    // 왼쪽 건물은 기울기가 이전보다 작아야 사이 건물 볼 수 있음
    for (let left = cur - 1; left >= 0; left--) {
      const x2 = left;
      const y2 = buildings[left];
      const inclination = (y2 - y1) / (x2 - x1);
      if (inclination < leftMax) {
        cnt++;
        leftMax = inclination;
      }
    }

    answer = Math.max(answer, cnt);
  }

  return answer;
}

console.log(solution(N, buildings));
