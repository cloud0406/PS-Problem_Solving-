const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/25682.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1);

const black = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
const white = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

// 누적합 계산
for (let row = 0; row < N; row++) {
  for (let col = 0; col < M; col++) {
    // 해당 위치가 검은색이어야 하는지 판단 (row + col이 짝수면 시작색과 같아야 함)
    const shouldBeBlack = (row + col) % 2 === 0;
    const current = board[row][col];

    // 각 시작색에 대해 다시 칠해야 하는지 체크
    black[row + 1][col + 1] = shouldBeBlack === (current === "B") ? 0 : 1;
    white[row + 1][col + 1] = shouldBeBlack === (current === "W") ? 0 : 1;

    // 누적합 계산
    black[row + 1][col + 1] +=
      black[row][col + 1] + black[row + 1][col] - black[row][col];
    white[row + 1][col + 1] +=
      white[row][col + 1] + white[row + 1][col] - white[row][col];
  }
}

// 부분 체스판에서 최소 변경 횟수
let minChanges = Infinity;
for (let row = K; row <= N; row++) {
  for (let col = K; col <= M; col++) {
    // 각 시작색에 대해 부분 체스판의 변경 횟수 계산
    const blackCount =
      black[row][col] -
      black[row - K][col] -
      black[row][col - K] +
      black[row - K][col - K];
    const whiteCount =
      white[row][col] -
      white[row - K][col] -
      white[row][col - K] +
      white[row - K][col - K];

    minChanges = Math.min(minChanges, blackCount, whiteCount);
  }
}

console.log(minChanges);
