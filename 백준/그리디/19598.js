const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/19598.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const arr = input.map((v) => v.split(" ").map(Number));

function solution(N, arr) {
  let answer = 0;

  const startArr = [];
  const endArr = [];

  // 시작 시간, 끝 시간을 따로 모아서 배열로 만든 후 정렬해둠
  for (let [start, end] of arr) {
    startArr.push(start);
    endArr.push(end);
  }
  startArr.sort((a, b) => a - b);
  endArr.sort((a, b) => a - b);

  let idx = 0;
  let prevEnd = endArr[idx];
  let cnt = 0; // 현재 강의실 개수

  startArr.forEach((start) => {
    cnt++; // 시작할때 강의실 개수 +1

    // 현재 시작 시간 이전에 종료되는 강의실 개수를 카운트 -> 강의실 개수 갱신
    while (prevEnd <= start) {
      prevEnd = endArr[++idx];
      cnt--;
    }

    answer = Math.max(answer, cnt); // 최대 강의실 개수 갱신
  });

  return answer;
}

console.log(solution(N, arr));
