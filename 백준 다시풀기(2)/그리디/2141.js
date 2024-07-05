const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2141.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const villages = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

function solution(N, villages) {
  let all = villages.reduce((acc, cur) => acc + cur[1], 0);
  let sum = 0;

  for (let [village, people] of villages) {
    sum += people;
    // 인구수의 중간값에 가장 가까운 마을에 우체국이 설치
    if (sum >= all / 2) return village;
  }
}

console.log(solution(N, villages));
