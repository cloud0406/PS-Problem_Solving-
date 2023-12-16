let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16986.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [N, K] = input[0].split(" ").map(Number);
let wBoard = input.slice(1, 1 + N).map((str) => str.split(" ").map(Number));
let hands = input.slice(1 + N).map((str) => str.split(" ").map((v) => +v - 1));
let flag = false;
let vis = Array(N).fill(0);

function dfs(arr) {
  if (arr.length == N) {
    hands.unshift([...arr]);
    let pIdx = [0, 0, 0];
    let wCnt = [0, 0, 0];
    let p1 = 0,
      p2 = 1;

    while (Math.max(...wCnt) != K) {
      let hand1 = hands[p1][pIdx[p1]++];
      let hand2 = hands[p2][pIdx[p2]++];

      let res = wBoard[hand1][hand2];
      let other = 3 - p1 - p2;

      if (res == 2) {
        // p1 승
        wCnt[p1]++;
        p2 = other;
      } else if (res == 1) {
        // 무승부
        let later = Math.max(p1, p2);
        wCnt[later]++;
        p1 = later;
        p2 = other;
      } else {
        wCnt[p2]++;
        p1 = p2;
        p2 = other;
      }
      if (pIdx[0] >= N) break;
    }
    if (wCnt[0] == K) {
      flag = true;
      return true;
    }

    hands.shift();
    return;
  }
  for (let i = 0; i < N; i++) {
    if (vis[i]) continue;
    vis[i] = 1;
    if (dfs([...arr, i])) return true;
    vis[i] = 0;
  }
}

function solution() {
  dfs([]);
  return flag ? 1 : 0;
}
console.log(solution());
