const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16202.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const edge = [];
let answer = [];

for (let i = 0; i < M; i++) {
  const [u, v] = input[i + 1].split(" ").map(Number);
  edge.push([i + 1, u, v]);
}

for (let i = 0; i < K; i++) {
  let disjoint = new Array(N + 1).fill().map((_, idx) => idx);
  let total = 0;

  for (let j = 0; j < edge.length; j++) {
    let x = Find(edge[j][1], disjoint);
    let y = Find(edge[j][2], disjoint);

    if (x !== y) {
      if (x > y) disjoint[x] = y;
      else disjoint[y] = x;

      total += edge[j][0];
    }
  }

  let check = new Set();

  for (let j = 1; j <= N; j++) {
    if (!check.has(Find(j, disjoint))) check.add(Find(j, disjoint));
  }

  if (check.size > 1) answer.push(0);
  else answer.push(total);

  edge.shift();
}

function Find(x, disjoint) {
  if (x !== disjoint[x]) disjoint[x] = Find(disjoint[x], disjoint);

  return disjoint[x];
}

console.log(answer.join(" "));
