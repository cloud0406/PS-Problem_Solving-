const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1647.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let houses = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[2] - b[2]);

function solution() {
  const getParent = (x, parent) => {
    if (parent[x] === x) return x;
    else return (parent[x] = getParent(parent[x], parent));
  };

  const findParent = (a, b, parent) => {
    a = getParent(a, parent);
    b = getParent(b, parent);

    if (a === b) return true;
    else return false;
  };

  const unionParent = (a, b, parent) => {
    a = parent[a];
    b = parent[b];

    if (a < b) parent[b] = a;
    else parent[a] = b;
  };

  // unionFind
  let parent = new Array(N + 1).fill(0);
  for (let i = 0; i <= N; i++) {
    parent[i] = i;
  }

  const cut = (village, parent) => {
    let sum = 0;

    let MST = [];

    for (let i = 0; i < village.length; i++) {
      let [a, b, c] = houses[i];
      // cycle check.
      if (!findParent(a, b, parent)) {
        unionParent(a, b, parent);
        MST.push([a, b, c]);
      }
    }
    // 비용이 젤 높은 간선 자르기.
    MST.pop();
    for (let [from, to, cost] of MST) {
      sum += cost;
    }

    return sum;
  };

  return cut(houses, parent);
}

console.log(solution());
