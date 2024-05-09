const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/17406.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  const [N, M, K] = input[0].split(" ").map(Number);
  let answer = Infinity;
  let boards;

  // 회전 연산 담아두기
  const rotateOperations = input
    .slice(1 + N)
    .map((str) => str.split(" ").map(Number));

  dfs(0, []);

  return answer;

  function dfs(L, orders) {
    // orders에 회전 연산에 순서를 담고, k개가 되면 회전 연산 수행
    if (orders.length === K) {
      boards = input.slice(1, 1 + N).map((row) => row.split(" ").map(Number));

      orders.forEach((order) => rotate(...rotateOperations[order]));

      // 회전 후 배열 A 최솟값 갱신
      boards.forEach((row) => {
        const min = row.reduce((acc, val) => acc + val, 0);
        answer = Math.min(answer, min);
      });

      return;
    }

    // 배열 A 회전 연산 순서 정하기
    for (let i = 0; i < K; i++) {
      if (orders.includes(i)) continue;
      dfs(L + 1, [...orders, i]);
    }
  }

  // 회전 연산
  function rotate(r, c, s) {
    const n = 2 * s + 1; // 회전할 배열의 크기
    const startR = r - s - 1;
    const startC = c - s - 1;

    const result = Array.from({ length: n }, () => new Array(n).fill(0));

    // 회전 연산 당 s회만큼 반복해야 배열 내부를 모두 회전시킬 수 있다.
    for (let i = 0; i < s; i++) {
      let sr = i,
        sc = i;

      // 위쪽 행 이동
      for (let j = 0; j < 4; j++) {
        while (sr === i && sc >= i && sc < n - 1 - i) {
          result[sr][sc + 1] = boards[startR + sr][startC + sc];
          sc++;
        }

        // 오른쪽 열 이동
        while (sr >= i && sr < n - 1 - i && sc === n - 1 - i) {
          result[sr + 1][sc] = boards[startR + sr][startC + sc];
          sr++;
        }

        // 아랫쪽 행 이동
        while (sr === n - 1 - i && sc > i && sc <= n - 1 - i) {
          result[sr][sc - 1] = boards[startR + sr][startC + sc];
          sc--;
        }

        // 왼쪽 열 이동
        while (sr > i && sr <= n - 1 - i && sc === i) {
          result[sr - 1][sc] = boards[startR + sr][startC + sc];
          sr--;
        }
      }
    }

    // 가운데 지점은 회전 수행 x -> 그대로 복사
    result[s][s] = boards[startR + s][startC + s];

    // 최종 회전 결과 복사
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        boards[startR + i][startC + j] = result[i][j];
      }
    }
  }
}

console.log(solution());
