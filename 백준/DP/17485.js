const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17485.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(n, m, arr) {
  let answer = Infinity;

  const dp = Array.from(Array(n), () =>
    Array.from(Array(m), () => Array(3).fill(0))
  );

  // 초기 값은 세 방향 다 같게 설정
  for (let j = 0; j < m; j++) {
    for (let k = 0; k < 3; k++) {
      dp[0][j][k] = arr[0][j];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < 3; k++) {
        // 양 끝 -> 불가능한 곳은 무한대로 표시하고 건너뛰기
        if ((j === 0 && k === 0) || (j === m - 1 && k === 2)) {
          dp[i][j][k] = Infinity;
          continue;
        }

        // 3방향을 살펴보며 이전과 다른 방향 + 현재 값
        if (k === 0) {
          dp[i][j][k] =
            arr[i][j] + Math.min(dp[i - 1][j - 1][1], dp[i - 1][j - 1][2]);
        } else if (k === 1) {
          dp[i][j][k] = arr[i][j] + Math.min(dp[i - 1][j][0], dp[i - 1][j][2]);
        } else {
          dp[i][j][k] =
            arr[i][j] + Math.min(dp[i - 1][j + 1][0], dp[i - 1][j + 1][1]);
        }
      }
    }
  }

  for (let j = 0; j < m; j++) {
    answer = Math.min(answer, Math.min(...dp[n - 1][j]));
  }

  return answer;
}

console.log(solution(n, m, arr));
