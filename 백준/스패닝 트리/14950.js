const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14950.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, t] = input[0].split(" ").map(Number);
const roads = input.slice(1).map((v) => v.split(" ").map(Number));

roads.sort((a, b) => a[2] - b[2]);

const parents = Array.from({ length: N + 1 }, (_, i) => i);

const find = (parents, x) => {
  if (parents[x] !== x) parents[x] = find(parents, parents[x]);

  return parents[x];
};

const union = (parents, a, b) => {
  a = find(parents, a);
  b = find(parents, b);

  if (a < b) parents[b] = a;
  else parents[a] = b;
};

let result = 0;
let line = 0;

for (let road of roads) {
  const [A, B, C] = road;

  if (find(parents, A) !== find(parents, B)) {
    union(parents, A, B);
    result += C;
    line++;
  }

  // 간선 개수 N-1개 되면 종료
  if (line === N - 1) break;
}

// 최종 비용 + 추가 비용 t 계산
// t + 2t + 3t + ... + (N-2)t = (N-2)(N-1)/2 * t
result += (((N - 2) * (N - 1)) / 2) * t;

console.log(result);
