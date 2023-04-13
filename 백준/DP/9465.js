const [T, ...input] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/9465.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(T, cases) {
  for (let i = 0; i < T; i++) {
    const N = cases[i * 3];
    const line1 = cases[i * 3 + 1].split(" ").map(Number);
    const line2 = cases[i * 3 + 2].split(" ").map(Number);

    // 1. 두 개의 행에서 아무것도 선택 x
    // 2. 위의 행 선택
    // 3. 아래 행 선택
    const dp = [[0, line1[0], line2[0]]];

    // 해당 열에서 위의 3가지 경우를 실행했을때의 가능한 최대값을 해당 인덱스에 담아둠
    for (let j = 1; j < N; j++) {
      dp[j] = [
        Math.max(...dp[j - 1]), // 아무 것도 선택 x : 이전 열 최대 값
        line1[j] + Math.max(dp[j - 1][0], dp[j - 1][2]), // 위의 행 선택 : 이전 열 아무것도 선택 x, 아래 행 선택 중 최대 값
        line2[j] + Math.max(dp[j - 1][0], dp[j - 1][1]), // 아래 행 선택 : 이전 열 아무것도 선택 x, 위의 행 선택 중 최대 값
      ];
    }

    console.log(Math.max(...dp[N - 1]));
  }
}

solution(T, input);
