const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/19641.txt"
  )
  .toString()
  .trim()
  .split("\n");

let N = +input[0];
let nodes = Array.from({ length: N + 1 }, () => []);
let answer = [];

for (let i = 1; i <= N; i++) {
  const q = input[i].split(" ").map(Number);

  nodes[q[0]].push(q[1]);
  nodes[q[1]].push(q[0]);
}

let root = +input[N + 1];
let visit = Array(N + 1).fill(false);
let dp = Array.from({ length: N + 1 }, () => [0, 0]);

function dfs(cur, field) {
  visit[cur] = true;

  let ret = field;
  dp[cur][0] = ret;
  nodes[cur].sort((a, b) => a - b);

  for (let next of nodes[cur]) {
    if (visit[next]) continue;
    ret = dfs(next, ret + 1);
  }

  dp[cur][1] = ret + 1;
  return dp[cur][1];
}

dfs(root, 1);

for (let i = 1; i <= N; i++) {
  answer.push([i, dp[i][0], dp[i][1]]);
}

console.log(answer.join("\n").split(",").join(" "));
