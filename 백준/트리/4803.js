const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/4803.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
let testCase = 1;

while (true) {
  const [n, m] = input[line].split(" ").map(Number);
  if (n === 0 && m === 0) break;

  const arr = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i <= m; i += 1) {
    const [from, to] = input[i + line].split(" ").map(Number);
    arr[from].push(to);
    arr[to].push(from);
  }

  let visited = new Array(n + 1).fill(false);
  let cnt = 0;

  for (let i = 1; i <= n; i += 1) {
    if (!visited[i]) {
      if (!isCycle(i, 0, visited, arr)) cnt += 1;
    }
  }

  if (cnt > 1) {
    console.log(`Case ${testCase}: A forest of ${cnt} trees.`);
  } else if (cnt === 1) {
    console.log(`Case ${testCase}: There is one tree.`);
  } else {
    console.log(`Case ${testCase}: No trees.`);
  }

  line += m + 1;
  testCase++;
}

//사이클 판별
function isCycle(from, prev, visited, array) {
  //from는 현재 노드, 방문 처리
  visited[from] = true;
  for (let y of array[from]) {
    // 다음 노드를 방문한 적이 없다면, 다음 노드 기준 사이클 판별
    if (!visited[y]) {
      if (isCycle(y, from, visited, array)) return true;
    } else if (y !== prev) return true; //방문한 적이 있고, 직전 노드가 아니라면 사이클
  }
  return false;
}
