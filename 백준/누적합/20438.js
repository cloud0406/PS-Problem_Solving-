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
  // 졸고 있는 학생은 미리 빼줌
  const students = input[2].filter((student) => !sleeps.includes(student));

  const preSum = [0, 0, 0];

  for (let i = 3; i <= N + 2; i++) {
    preSum[i] = preSum[i - 1];

    // 졸고 있는 학생은 패스
    if (sleeps.includes(i)) continue;

    // 출석 코드 받은 학생들의 배수에 해당하면 preSum에서 1증가
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
