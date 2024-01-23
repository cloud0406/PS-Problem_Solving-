const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15681.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, R, Q] = input[0].split(" ").map(Number);
const tree = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
  const [from, to] = input[i].split(" ").map(Number);
  tree[from].push(to);
  tree[to].push(from);
}

const visit = Array(N + 1).fill(-1);

const dfs = (now) => {
  visit[now] = 1;
  for (const i of tree[now]) {
    if (visit[i] === -1) visit[now] += dfs(i);
  }

  return visit[now];
};

dfs(R);

let answer = [];

for (let i = N; i < N + Q; i++) {
  answer.push(visit[+input[i]]);
}

console.log(answer.join("\n"));
