const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20924.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, r] = input[0].split(" ").map(Number);
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < n - 1; i++) {
  const [a, b, d] = input[i + 1].split(" ").map(Number);
  graph[a].push([b, d]);
  graph[b].push([a, d]);
}

function solution(n, r, graph) {
  const ans = [0, 0];

  const dfs = (u, p, sum, flag) => {
    if (flag === 0) ans[0] = sum;
    else ans[1] = Math.max(ans[1], sum);

    if (flag === 0 && graph[u].length > 2 - (u === r)) {
      flag = 1;
      sum = 0;
    }

    for (const [v, w] of graph[u]) {
      if (v === p) continue;
      dfs(v, u, sum + w, flag);
    }
  };

  dfs(r, r, 0, 0);

  return `${ans[0]} ${ans[1]}`;
}

console.log(solution(n, r, graph));
