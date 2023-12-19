const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20040.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  const parent = Array.from({ length: N }, (_, idx) => idx);

  const getParent = (parent, x) => {
    if (parent[x] === x) return x;
    return (parent[x] = getParent(parent, parent[x]));
  };

  const unionParent = (parent, a, b) => {
    a = getParent(parent, a);
    b = getParent(parent, b);

    if (a < b) parent[b] = a;
    else parent[a] = b;
  };

  const findParent = (parent, a, b) => {
    a = getParent(parent, a);
    b = getParent(parent, b);

    return a === b;
  };

  for (let i = 0; i < M; i++) {
    let [a, b] = arr[i];

    if (findParent(parent, a, b)) return i + 1;

    unionParent(parent, a, b);
  }

  return 0;
}

console.log(solution(N, M, arr));
