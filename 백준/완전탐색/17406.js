const filePath =
  process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17406.txt";
const [n, ...input] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(N, M, K, input) {
  const rotationArr = input.slice(-K);
  let A = input.slice(0, N).map((r) => [...r]);
  let clone = new Array(N).fill(null).map((_, idx) => [...A[idx]]);

  function rotate(startR, startC, size) {
    for (let box = 0; box < size; box++) {
      const endR = startR + size * 2;
      const endC = startC + size * 2;

      //좌우
      for (let r = endR - box; r > startR + box; r--) {
        clone[r - 1][startC + box] = A[r][startC + box];
        clone[r][endC - box] = A[r - 1][endC - box];
      }

      //상하
      for (let c = endC - box; c > startC + box; c--) {
        clone[startR + box][c] = A[startR + box][c - 1];
        clone[endR - box][c - 1] = A[endR - box][c];
      }
    }
    A = Array.from(new Array(N), (_, idx) => [...clone[idx]]);
  }

  let result = Infinity;
  const visited = new Array(K).fill(false);
  function dfs(arr) {
    if (arr.length === K) {
      for (let i = 0; i < K; i++) {
        const [r, c, size] = rotationArr[arr[i]];
        rotate(r - size - 1, c - size - 1, size);
      }
      for (const row of A) {
        result = Math.min(
          result,
          row.reduce((prev, cur) => prev + cur, 0)
        );
      }
      A = input.slice(0, N).map((r) => [...r]);
      clone = new Array(N).fill(null).map((_, idx) => [...A[idx]]);
      return;
    }

    for (let i = 0; i < K; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs([...arr, i]);
        visited[i] = false;
      }
    }
  }

  dfs([]);
  return result;
}

const arr = n.split(" ").map(Number);
const answer = solution(
  arr[0],
  arr[1],
  arr[2],
  input.map((r) => r.split(" ").map(Number))
);

console.log(answer);
