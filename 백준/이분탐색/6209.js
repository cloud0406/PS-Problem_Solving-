const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6209.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [d, n, m] = input[0].split(" ").map(Number);
const rocks = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);
rocks.push(d);

function solution(d, n, m, rocks) {
  let answer = 0;
  let left = 0;
  let right = d;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 돌섬 거리 최소값
    let cur = (cnt = 0); // 현재 위치, 돌섬 제거 개수

    // 현재 돌섬 ~ 다음 돌섬까지 거리가 설정한 값보다 작으면 돌섬 제거 개수 증가,
    // 아니면 (건널 수 있으면) 현재 돌섬을 다음 돌섬으로 변경
    for (let stone of rocks) {
      if (stone - cur < mid) cnt++;
      else cur = stone;
    }

    // m보다 많이 제거 했을 경우 거리 최소 값을 줄이고, 반대의 경우는 늘림
    if (cnt > m) {
      right = mid - 1;
    } else {
      answer = mid;
      left = mid + 1;
    }
  }

  return answer;
}

console.log(solution(d, n, m, rocks));
