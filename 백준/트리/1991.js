const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1991.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const tree = {};

for (let i = 0; i < N; i++) {
  const [node, left, right] = input[i].split(" ");
  tree[node] = [left, right];
}

function solution(N, tree) {
  let answer = "";

  // 전위 순회 : 루트 -> 왼쪽 자식 -> 오른쪽 자식
  function preorder(node) {
    if (node === ".") return;

    const [left, right] = tree[node];
    answer += node;
    preorder(left);
    preorder(right);
  }

  // 중위 순회 : 왼쪽 자식 -> 루트 -> 오른쪽 자식
  function inorder(node) {
    if (node === ".") return;

    const [left, right] = tree[node];
    inorder(left);
    answer += node;
    inorder(right);
  }

  // 후위 순회 : 왼쪽 자식 -> 오른쪽 자식 -> 루트
  function postorder(node) {
    if (node === ".") return;

    const [left, right] = tree[node];
    postorder(left);
    postorder(right);
    answer += node;
  }

  preorder("A");
  answer += "\n";
  inorder("A");
  answer += "\n";
  postorder("A");

  console.log(answer);
}

solution(N, tree);
