const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16971.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  const [N, M] = input[0].split(" ").map(Number);
  const matrix = input.slice(1).map((v) => v.split(" ").map(Number));

  let sum = 0; // 배열의 합
  const r = Array(N).fill(0); // N번째 행의 합
  const c = Array(M).fill(0); // M번째 열의 합

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const v = matrix[i][j];
      // 가장자리 4변에 속하는 경우
      if (i === 0 || i === N - 1 || j === 0 || j === M - 1) {
        // 꼭지점에 속하는 경우: 한 번만 사용됨
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === M - 1) ||
          (i === N - 1 && j === 0) ||
          (i === N - 1 && j === M - 1)
        ) {
          r[i] += v;
          c[j] += v;
          sum += v;
        } else {
          // 4변에 속하지만 꼭지점이 아닌 경우: 두 번 사용됨
          r[i] += 2 * v;
          c[j] += 2 * v;
          sum += 2 * v;
        }
      } else {
        // 가장자리 아닌 내부에 속하는 요소들은 4번 사용됨
        r[i] += 4 * v;
        c[j] += 4 * v;
        sum += 4 * v;
      }
    }
  }

  function changeRowOrCol() {
    let tmp = -Infinity;

    // 가장자리 행,열들과 내부 행,열들을 교환하여 최대값을 찾음
    // 가장자리 행,열 들은 사용 횟수가 1,2....2,1 이고 / 내부 행,열들은 사용 횟수가 2,4 ... 4,2 이므로
    // 변경시 2배, 1/2배 처리
    for (let i = 1; i < N - 1; i++) {
      tmp = Math.max(tmp, sum - Math.floor(r[i] / 2) + r[0]);
      tmp = Math.max(tmp, sum - Math.floor(r[i] / 2) + r[N - 1]);
    }
    for (let i = 1; i < M - 1; i++) {
      tmp = Math.max(tmp, sum - Math.floor(c[i] / 2) + c[0]);
      tmp = Math.max(tmp, sum - Math.floor(c[i] / 2) + c[M - 1]);
    }

    sum = Math.max(sum, tmp);
  }

  changeRowOrCol();
  console.log(sum);
}

solution();
