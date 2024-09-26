const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13905.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const [s, e] = input[1].split(" ").map(Number);
const info = input.slice(2).map((e) => e.split(" ").map(Number));

function solution(n, m, s, e, info) {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  const findParent = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = findParent(parent[x]));
  };

  const union = (x, y) => {
    const a = findParent(x);
    const b = findParent(y);
    if (a === b) return;

    if (a < b) parent[b] = a;
    else parent[a] = b;
  };

  const isSameParent = (x, y) => findParent(x) === findParent(y);

  info.sort((a, b) => b[2] - a[2]); // 다리 무게제한 내림차순 정렬

  // 무거운 무게 순으로 다리 연결 시도 -> 숭이와 혜빈이 연결된 순간 종료
  for (const [h1, h2, k] of info) {
    if (isSameParent(h1, h2)) continue;
    union(h1, h2);
    if (isSameParent(s, e)) return k;
  }

  return 0; // 연결 안되면 0
}

console.log(solution(n, m, s, e, info));
