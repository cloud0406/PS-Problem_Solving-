const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/3584.txt"
  )
  .toString()
  .trim()
  .split("\n");

const T = +input.shift();
let index = 0;

for (let i = 0; i < T; i++) {
  const N = +input[index];
  const arr = input
    .slice(index + 1, N + index)
    .map((v) => v.split(" ").map(Number));
  index += N;

  let [nodeA, nodeB] = input[index].split(" ").map(Number);
  index++;

  const tree = {};

  for (let j = 0; j < N - 1; j++) {
    const [parent, child] = arr[j];
    tree[child] = parent;
  }

  const roots = [];

  // 두 노드 중 첫 번째 노드의 부모들을 저장 (루트 노드 제외)
  while (tree[nodeA]) {
    roots.push(nodeA);
    nodeA = tree[nodeA];
  }

  // 두 번째 노드의 부모들을 거슬러 올라가며 첫 번째 노드와 공통 부모인지 체크
  while (tree[nodeB]) {
    if (roots.includes(nodeB)) break;
    nodeB = tree[nodeB];
  }

  console.log(nodeB);
}
