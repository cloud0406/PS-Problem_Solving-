const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/12978.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));
const visited = Array(N + 1).fill(false);
const tree = Array.from({ length: N + 1 }, () => []);

// 리프 노드에서 계산이 시작되어 상위로 올라감
// dp[leaf][0] = 0 (경찰서 없음) , dp[leaf][1] = 1 (경찰서 있음)
// 최종적으로 dp[1][0]: 루트 마을에 경찰서가 없는 경우의 최소 경찰서 수, dp[1][1]: 루트 마을에 경찰서가 있는 경우의 최소 경찰서 수
function dfs(cur) {
  if (visited[cur]) return;

  visited[cur] = true;

  dp[cur][0] = 0; // 현재 마을에 경찰서를 설치 X
  dp[cur][1] = 1; // 현재 마을에 경찰서를 설치 O

  for (const next of tree[cur]) {
    if (visited[next]) continue;

    dfs(next);

    dp[cur][0] += dp[next][1]; // 현재 마을에 경찰서가 없다면 인접 마을에는 반드시 있어야 함
    dp[cur][1] += Math.min(dp[next][0], dp[next][1]); // 현재 마을에 경찰서가 있다면 인접 마을은 있거나 없거나 상관없음
  }
}

function solution() {
  for (let i = 1; i < N; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    tree[a].push(b);
    tree[b].push(a);
  }

  dfs(1);
  console.log(Math.min(dp[1][0], dp[1][1]));
}

solution();
