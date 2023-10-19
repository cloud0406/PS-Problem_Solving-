const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1711.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const dots = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, dots) {
  let answer = 0;

  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        const dot1 = dots[i];
        const dot2 = dots[j];
        const dot3 = dots[k];

        // 세 선분의 길이를 제곱으로 구함 , a^2, b^2, c^2
        const d1 =
          Math.pow(dot1[0] - dot2[0], 2) + Math.pow(dot1[1] - dot2[1], 2);
        const d2 =
          Math.pow(dot2[0] - dot3[0], 2) + Math.pow(dot2[1] - dot3[1], 2);
        const d3 =
          Math.pow(dot3[0] - dot1[0], 2) + Math.pow(dot3[1] - dot1[1], 2);

        // 피타고라스 : a^2 + b^2 = c^2 -> a^2 + b^2 + c^2 = 2c^2
        if (2 * Math.max(d1, d2, d3) === d1 + d2 + d3) answer++;
      }
    }
  }

  return answer;
}

console.log(solution(N, dots));
