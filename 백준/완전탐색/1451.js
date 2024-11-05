const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1451.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const rectangle = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

// 입력받은 전체 직사각형 저장
for (let i = 1; i <= n; i++) {
  const lineInput = [0].concat(input[i].split("").map(Number));
  rectangle[i] = lineInput;
}

let ans = 0;
const sum = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

// 리스트 s는 입력받은 직사각형의 1,1부터 영역 내 모든 수의 합을 저장
for (let row = 1; row <= n; row++) {
  for (let col = 1; col <= m; col++) {
    sum[row][col] =
      sum[row - 1][col] +
      sum[row][col - 1] -
      sum[row - 1][col - 1] +
      rectangle[row][col];
  }
}

const sumCal = (x1, y1, x2, y2) =>
  sum[x2][y2] - sum[x2][y1 - 1] - sum[x1 - 1][y2] + sum[x1 - 1][y1 - 1];

// 첫 번째 경우: 전체 직사각형을 세로로만 분할한 경우
for (let i = 1; i < m - 1; i++) {
  for (let j = i + 1; j < m; j++) {
    const r1 = sumCal(1, 1, n, i);
    const r2 = sumCal(1, i + 1, n, j);
    const r3 = sumCal(1, j + 1, n, m);
    ans = Math.max(ans, r1 * r2 * r3);
  }
}

// 두 번째 경우: 전체 직사각형을 가로로만 분할한 경우
for (let i = 1; i < n - 1; i++) {
  for (let j = i + 1; j < n; j++) {
    const r1 = sumCal(1, 1, i, m);
    const r2 = sumCal(i + 1, 1, j, m);
    const r3 = sumCal(j + 1, 1, n, m);
    ans = Math.max(ans, r1 * r2 * r3);
  }
}

// 세 번째 경우: 전체 세로 분할 후 우측 가로 분할한 경우
for (let i = 1; i < m; i++) {
  for (let j = 1; j < n; j++) {
    const r1 = sumCal(1, 1, n, i);
    const r2 = sumCal(1, i + 1, j, m);
    const r3 = sumCal(j + 1, i + 1, n, m);
    ans = Math.max(ans, r1 * r2 * r3);
  }
}

// 네 번째 경우: 전체 세로 분할 후 좌측 가로 분할한 경우
for (let i = 1; i < n; i++) {
  for (let j = 1; j < m; j++) {
    const r1 = sumCal(1, 1, i, j);
    const r2 = sumCal(i + 1, 1, n, j);
    const r3 = sumCal(1, j + 1, n, m);
    ans = Math.max(ans, r1 * r2 * r3);
  }
}

// 다섯 번째 경우: 전체 가로 분할 후 하단 세로 분할한 경우
for (let i = 1; i < n; i++) {
  for (let j = 1; j < m; j++) {
    const r1 = sumCal(1, 1, i, m);
    const r2 = sumCal(i + 1, 1, n, j);
    const r3 = sumCal(i + 1, j + 1, n, m);
    ans = Math.max(ans, r1 * r2 * r3);
  }
}

// 여섯 번째 경우: 전체 가로 분할 후 상단 세로 분할한 경우
for (let i = 1; i < n; i++) {
  for (let j = 1; j < m; j++) {
    const r1 = sumCal(1, 1, i, j);
    const r2 = sumCal(1, j + 1, i, m);
    const r3 = sumCal(i + 1, 1, n, m);
    ans = Math.max(ans, r1 * r2 * r3);
  }
}

console.log(ans);
