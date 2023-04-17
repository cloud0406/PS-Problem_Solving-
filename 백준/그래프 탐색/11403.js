const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11403.txt"
  )
  .toString()
  .trim()
  .split("\n");

let N = +input.shift();
let arr = [];

for (const row of input) {
  arr.push(row.split(" ").map(Number));
}

// 플로이드 와샬
function solution(arr, N) {
  for (let k = 0; k < N; k++) {
    for (let from = 0; from < N; from++) {
      for (let to = 0; to < N; to++) {
        // k를 통해서 i -> j 이동이 가능하다면
        if (arr[from][k] && arr[k][to]) arr[from][to] = 1;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    console.log(arr[i].join(" "));
  }
}

solution(arr, N);
