const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22856.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const Tree = {};

for (let i = 0; i < N; i++) {
  const [a, b, c] = input[i + 1].split(" ").map(Number);
  Tree[a] = [b, c];
}

let count = 0;

function DFS1(Node, visit) {
  visit[Node] = true;

  if (!visit[Tree[Node][0]] && Tree[Node][0] !== -1) {
    DFS1(Tree[Node][0], visit);
    count++;
  }
  if (!visit[Tree[Node][1]] && Tree[Node][1] !== -1) {
    DFS1(Tree[Node][1], visit);
    count++;
  }
}

let count2 = 0;

function DFS2(Node, visit) {
  visit[Node] = true;

  if (!visit[Tree[Node][1]] && Tree[Node][1] !== -1) {
    DFS2(Tree[Node][1], visit);
    count2++;
  }
}

const visit1 = Array(N + 1).fill(false);
DFS1(1, visit1);

const visit2 = Array(N + 1).fill(false);
DFS2(1, visit2);

console.log(2 * count - count2);
