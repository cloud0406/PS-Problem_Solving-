const input = require("fs")
  .readFileSync(__dirname + "/input/20438.txt")
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

function solution(input) {
  /* input 정리 */
  const [N, K, Q, M] = input[0];
  const sleeps = input[1];
  const students = input[2].filter((student) => !sleeps.includes(student));

  /* 문제 풀이 */
  const preSum = [0, 0, 0];

  for (let i = 3; i <= N + 2; i++) {
    preSum[i] = preSum[i - 1];

    if (sleeps.includes(i)) continue;

    for (const student of students) {
      if (i % student === 0) {
        preSum[i] += 1;
        break;
      }
    }
  }

  let answer = "";
  for (let i = 3; i < M + 3; i++) {
    const [S, E] = input[i];
    answer += E - S + 1 - (preSum[E] - preSum[S - 1]) + "\n";
  }

  console.log(answer.substring(0, answer.length - 1));
}

solution(input);
