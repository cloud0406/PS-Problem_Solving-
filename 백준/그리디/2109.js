const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2109.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const lectures = input // 비용순 정렬
  .slice(1)
  .map((e) => e.split(" ").map(Number))
  .sort((a, b) => b[0] - a[0]);

function solution(n, lectures) {
  let answer = 0;
  const reservation = new Array(10001).fill(false);

  // 가장 비용 큰 것 부터 강연 일정 예약
  // 강연은 최대한 데드라인에 맞춰 뒤로 미뤄 예약하고, 해당 날에 이미 예약 차있다면 하루씩 앞당겨서 체크 한 후 예약
  for (let [payment, deadline] of lectures) {
    for (let day = deadline; day > 0; day--) {
      if (!reservation[day]) {
        answer += payment;
        reservation[day] = true;
        break;
      }
    }
  }

  return answer;
}

console.log(solution(n, lectures));
