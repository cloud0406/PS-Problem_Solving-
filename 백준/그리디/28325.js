const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]); // 굴의 개수
let caves = input[1].split(" ").map(BigInt); // 각 굴의 개미 수 (BigInt로 처리)

// 첫 번째 개미굴이 있는 위치를 찾음
let startIndex = 0;
for (let i = 0; i < N; i++) {
  if (caves[i] > 0n) {
    startIndex = i;
    break;
  }
}

// 개미굴 배열을 재배치 (첫 번째 개미굴부터 시작)
caves = [...caves.slice(startIndex), ...caves.slice(0, startIndex)];

// 처음과 끝이 0인 경우 마지막 요소 제거 (연결 방지)
if (caves[0] === 0n && caves.at(-1) === 0n) {
  caves.pop();
}

// 새로운 배열 길이 갱신
const newN = caves.length;

let answer = 0n; // 최종 개미 수
for (let i = 0; i < newN; i++) {
  if (caves[i] === 0n) {
    // 연속된 0은 1칸씩만 허용
    answer++;
    if (caves[i + 1] === 0n) i++; // 연속된 0이면 건너뜀
  } else {
    // 쪽방 추가
    answer += caves[i];
  }
}

console.log(answer.toString()); // BigInt 값 출력
