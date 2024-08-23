const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2533.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < n; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = Array(n + 1).fill(0);

// DP 배열: dp[i][0]은 i번 노드가 얼리 어답터가 아닐 때, dp[i][1]은 i번 노드가 얼리어답터일 때
const dp = Array.from({ length: n + 1 }, () => [0, 0]);

const dfs = (start) => {
  visited[start] = 1;

  // 리프 노드인 경우
  if (graph[start].length === 0) {
    dp[start][1] = 1;
    dp[start][0] = 0;
  } else {
    for (const i of graph[start]) {
      if (!visited[i]) {
        dfs(i);
        dp[start][1] += Math.min(dp[i][0], dp[i][1]);
        dp[start][0] += dp[i][1];
      }
    }
    // 자신을 얼리어답터로 선택할 경우
    dp[start][1] += 1;
  }
};

dfs(1);

// 루트 노드가 얼리어답터가 아니거나 얼리어답터일 때 중 최소값을 출력
console.log(Math.min(dp[1][0], dp[1][1]));
