const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15789.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

// C: 시작 노드, H: 제외할 노드, K: 연결할 횟수
const [C, H, K] = input[M + 1].split(" ").map(Number);
const check = Array(N + 1).fill(0);

const bfs = (start) => {
  const queue = [start];
  check[start] = start;
  let cnt = 1;

  while (queue.length > 0) {
    const cur = queue.shift();
    for (const next of graph[cur]) {
      if (!check[next]) {
        queue.push(next);
        check[next] = start;
        cnt += 1;
      }
    }
  }

  return cnt;
};

// 연결된 컴포넌트의 크기를 저장할 배열
const countSet = [];
let initPower = 0;

// 모든 노드 BFS 수행
for (let i = 1; i <= N; i++) {
  if (!check[i]) {
    const componentSize = bfs(i);
    countSet.push({ size: componentSize, leader: i });

    if (check[C] === i) {
      initPower = componentSize;
    }
  }
}

// 초기 전력
let power = initPower;

// 크기 기준으로 내림차순 정렬
countSet.sort((a, b) => b.size - a.size);

let k = K;
for (const { size, leader } of countSet) {
  if (k <= 0) break;
  if (check[leader] !== check[C] && check[leader] !== check[H]) {
    power += size;
    k -= 1;
  }
}

console.log(power);
