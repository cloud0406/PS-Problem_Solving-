const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10216.txt"
  )
  .toString()
  .trim()
  .split("\n");

let index = 0;
const T = +input[index++];

function getParent(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
}

function union(parent, a, b) {
  const parentA = getParent(parent, a);
  const parentB = getParent(parent, b);

  if (parentA < parentB) parent[parentB] = parentA;
  else parent[parentA] = parentB;
}

for (let t = 0; t < T; t++) {
  const N = +input[index++];
  const camps = [];
  const parent = Array(N)
    .fill()
    .map((_, i) => i);

  // 진영 정보
  for (let i = 0; i < N; i++) {
    const [x, y, r] = input[index++].split(" ").map(Number);
    camps.push([x, y, r]);
  }

  // 통신 범위가 겹치는 진영끼리 연결
  for (let i = 0; i < N; i++) {
    const [x1, y1, r1] = camps[i];
    for (let j = i + 1; j < N; j++) {
      const [x2, y2, r2] = camps[j];
      // 두 진영 사이의 거리가 통신 범위 합보다 작거나 같으면 연결
      if (Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) <= r1 + r2) {
        union(parent, i, j);
      }
    }
  }

  const groups = new Set();
  for (let i = 0; i < N; i++) {
    groups.add(getParent(parent, i));
  }

  console.log(groups.size);
}
