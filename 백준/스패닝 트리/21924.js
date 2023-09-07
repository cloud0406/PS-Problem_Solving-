const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21924.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[2] - b[2]);

function soloution(N, M, arr) {
  let answer = 0;
  let cnt = 0;

  for (let [a, b, c] of arr) {
    answer += c;
  }

  const parent = Array.from({ length: N + 1 }, (_, i) => i);

  const findParent = (x) => {
    if (x !== parent[x]) parent[x] = findParent(parent[x]);
    return parent[x];
  };

  const union = (a, b) => {
    a = findParent(a);
    b = findParent(b);

    if (a < b) parent[b] = a;
    else parent[a] = b;
  };

  for (let [a, b, c] of arr) {
    if (findParent(a) !== findParent(b)) {
      union(a, b);
      answer -= c;
    }
  }

  for (let i = 1; i < N; i++) {
    if (i === parent[i]) cnt++;
  }

  return cnt > 1 ? -1 : answer;
}

console.log(soloution(N, M, arr));
