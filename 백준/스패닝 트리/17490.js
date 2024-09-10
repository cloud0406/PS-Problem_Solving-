const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17490.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input[0].split(" ").map(Number);
const parent = Array.from({ length: n + 1 }, (_, i) => i);
const construction = Array(n + 1).fill(false);
const costs = [0, ...input[1].split(" ").map(Number)]; // 돌 비용

// 공사 구간 처리
for (let i = 2; i < 2 + m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  const large = Math.max(a, b);
  const small = Math.min(a, b);

  // 일반적으로 두 강의동 중 큰쪽에 표시
  // 처음과 마지막 강의동이 연결되어 있을 경우, 1번 강의동에 표시
  if (large === n && small === 1) construction[1] = true;
  else construction[large] = true;
}

const getParent = (x) => {
  if (parent[x] !== x) parent[x] = getParent(parent[x]);
  return parent[x];
};

// 돌 비용이 낮은쪽을 부모로 설정
const unionParent = (x, y) => {
  const a = getParent(x);
  const b = getParent(y);

  if (costs[a] > costs[b]) parent[a] = b;
  else parent[b] = a;
};

// 1번부터 한 바퀴 돌면서 공사 구간 제외하고 이웃이랑 묶기
for (let i = 1; i < n; i++) {
  if (!construction[i + 1]) unionParent(i, i + 1);
}

// 마지막 강의동과 1번 강의동이 연결되어 있을 경우 묶기
if (!construction[1]) unionParent(1, n);

// 최소 돌 비용 계산
let total = 0;
let unionCnt = 0;

for (let i = 1; i <= n; i++) {
  const root = getParent(i);
  // 각 집합의 루트 노드인 경우 비용 더하기
  if (root === i) {
    total += costs[i]; // 루트 노드의 비용 더하기 (위에서 가장 비용이 작은 강의실을 부모로 설정했기 때문에)
    unionCnt++;
  }
}

console.log(total <= k || unionCnt <= 1 ? "YES" : "NO");
