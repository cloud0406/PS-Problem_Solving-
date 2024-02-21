const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/12893.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const enemies = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, enemies) {
  const parent = Array.from({ length: N + 1 }, (_, i) => i);
  const enemy = new Array(N + 1).fill(0);

  const getParent = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = getParent(parent[x]));
  };

  const union = (a, b) => {
    a = getParent(a);
    b = getParent(b);

    if (a < b) parent[b] = a;
    if (b < a) parent[a] = b;
  };

  for (const [a, b] of enemies) {
    if (getParent(a) === getParent(b)) return 0; // 주어진 적대 관계가 우호 관계일 경우 모순

    // 적군이 있다면 그룹화, 없다면 적군 추가
    if (enemy[a]) union(b, enemy[a]);
    else enemy[a] = b;

    if (enemy[b]) union(a, enemy[b]);
    else enemy[b] = a;
  }

  return 1;
}

console.log(solution(N, M, enemies));
