const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11000.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
let lectures = [];
for (let i = 1; i <= N; i++) {
  lectures.push(input[i].split(" ").map(Number));
}

function solution(N, lectures) {
  const schedules = [];
  // 시간대별로 배열에 입력
  lectures.forEach((lecture) => {
    schedules.push({ time: lecture[0], start: 1 });
    schedules.push({ time: lecture[1], start: -1 });
  });

  schedules.sort((a, b) =>
    a.time === b.time ? a.start - b.start : a.time - b.time
  );

  let answer = 0;
  let cnt = 0;

  schedules.forEach((schedule) => {
    // 한 강의가 시작되면
    if (schedule.start === 1) cnt++; // 강의실 사용
    else if (schedule.start === -1) cnt--; // 강의 종료

    answer = Math.max(answer, cnt);
  });

  return answer;
}

console.log(solution(N, lectures));
