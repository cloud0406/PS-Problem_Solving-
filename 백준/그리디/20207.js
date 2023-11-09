const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20207.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const calendar = Array(366).fill(0);

function solution(n, calendar) {
  let answer = 0;

  for (let i = 1; i < n + 1; i++) {
    const [from, to] = input[i].split(" ").map((v) => +v);

    // 시작일 ~ 끝 날짜 높이 +1 => 새로운 일정이 겹칠수록 높이가 증가
    for (let i = from - 1; i < to; i++) {
      calendar[i] += 1;
    }
  }

  let paper = [];

  calendar.forEach((height) => {
    // 높이가 0이고 paper에 데이터가 담겨 있을 경우 -> 연속된 일정이 끊김 -> 최대 높이를 통해 넓이 구하기
    if (height === 0 && paper.length) {
      answer += paper.length * Math.max(...paper);
      paper = [];
    } else if (height !== 0) {
      // 연속된 일정 배열에 담기
      paper.push(height);
    }
  });

  return answer;
}

console.log(solution(n, calendar));
