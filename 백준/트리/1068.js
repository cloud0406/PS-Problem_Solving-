let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1068.txt"
  )
  .toString()
  .trim()
  .split("\n");

let N = +input[0];
const nodes = input[1].split(" ").map(Number);
const remove = +input[2];

let tree = [];
let answer = 0;
let root;

nodes.forEach((node, idx) => {
  if (node === -1) root = idx;
  // 해당 노드를 부모로 가지는 배열 생성하고, 현재 노드 추가
  if (!tree[node]) tree[node] = [];
  tree[node].push(idx);
});

const dfs = (node) => {
  if (root === remove) return 0;

  // 리프 노드일 경우
  if (!tree[node]) {
    answer++;
    return;
  }

  // 트리에서 해당 노드의 자식 순회
  tree[node].forEach((v) => {
    if (v === remove) {
      // 해당 node의 자식 개수가 1개이고, 그게 제거할 노드일 경우 -> 제거할 노드의 부모 노드가 리프 노드가 되므로 +1
      if (tree[node].length === 1) answer++;
      return;
    }

    dfs(v);
  });

  return answer;
};

console.log(dfs(root));
