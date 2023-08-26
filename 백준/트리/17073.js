const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/17073.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, W] = input[0].split(" ").map(Number);
const nodes = input.slice(1).map((v) => v.split(" ").map(Number));

function soloution(N, W, nodes) {
  let leafCnt = 0;
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let [from, to] of nodes) {
    graph[from].push(to);
    graph[to].push(from);
  }

  // leaf 노드 개수만 세어줌 (root 노드에 leaf가 1개만 달려있을 수 있으니 root노드 건너뛰고 i=2 부터 시작)
  for (let i = 2; i <= N; i++) {
    if (graph[i].length === 1) leafCnt++;
  }

  return W / leafCnt;
}

console.log(soloution(N, W, nodes));
