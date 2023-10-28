const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17352.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

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

  if (a === b) return 1;
  else return 0;
};

const parent = Array.from({ length: N + 1 }, (_, i) => i);

function solution(N, parent) {
  for (let [a, b] of arr) {
    unionParent(parent, a, b);
  }

  for (let i = 2; i <= N; i++) {
    if (!findParent(parent, 1, i)) return console.log(1, i);
  }
}

solution(N, parent);
