const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20955.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let parents = Array.from({ length: N + 1 }, (_, v) => v);
let cnt = 0;

function findParent(x) {
  if (x !== parents[x]) parents[x] = findParent(parents[x]);

  return parents[x];
}

function union(a, b) {
  a = findParent(a);
  b = findParent(b);

  if (a < b) parents[b] = a;
  else parents[a] = b;
}

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  // 두 뉴런 a,b가 같은 집합 내에 속해있는지 체크
  if (findParent(a) !== findParent(b)) union(a, b);
  else cnt++; // 이미 같은 집합 내에 속해있다면 뉴런을 끊어야함
}

// 모든 뉴런이 연결되어있는지 확인
let parent = findParent(1);
for (let i = 2; i <= N; i++) {
  // 만약 다른 집합에 속해있다면 뉴런 연결, 연산 횟수 증가
  if (findParent(i) !== parent) {
    union(1, i);
    cnt++;
  }
}

console.log(cnt);
