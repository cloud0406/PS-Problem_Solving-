const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16562.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, k] = input[0].split(" ").map(Number);
const costs = [0, ...input[1].split(" ").map(Number)];
const friends = input.slice(2).map((v) => v.split(" ").map(Number));

function soloution(N, M, k, consts, friends) {
  let answer = 0;
  const parents = Array.from({ length: N + 1 }, (_, i) => i);

  const find = (x) => {
    if (parents[x] === x) return x;
    parents[x] = find(parents[x]);
    return parents[x];
  };

  const union = (a, b) => {
    a = find(a);
    b = find(b);
    if (a !== b) {
      if (costs[a] <= costs[b]) parents[b] = a;
      else parents[a] = b;
    }
  };

  for (let [v, w] of friends) {
    union(v, w);
  }

  parents.forEach((value, idx) => {
    if (value === idx) answer += costs[idx];
  });

  return answer > k ? "Oh no" : answer;
}

console.log(soloution(N, M, k, costs, friends));
