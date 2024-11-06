const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/24891.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [L, N] = input[0].split(" ").map(Number);
let arr = input.slice(1, N + 1);
let ans = new Array(5);
let visited = new Array(N).fill(false);
let flag = false;

function solution(cnt) {
  if (cnt === L) {
    if (!flag) {
      let sign = true;

      for (let i = 0; i < L; i++) {
        for (let j = i + 1; j < L; j++) {
          if (ans[i][j] !== ans[j][i]) {
            sign = false;
            break;
          }
        }
        if (!sign) break;
      }
      if (sign) {
        flag = true;
        console.log(ans.join("\n"));
      }
    }
  } else {
    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      ans[cnt] = arr[i];
      solution(cnt + 1);
      visited[i] = false;
    }
  }
}

arr.sort();
solution(0);

if (!flag) console.log("NONE");
