const input = require("fs")
  .readFileSync(__dirname + "/input/6416.txt")
  .toString()
  .trim()
  .split("\n");

function play() {
  let line = 0;
  let test = 1;
  let tree = new Map();
  let set = new Set();
  let max = -1;
  while (true) {
    const nodes = input[line].split("  ");
    line += 1;
    for (let node of nodes) {
      const [u, v] = node.split(" ").map(Number);
      if (v === undefined) continue;
      //종료
      if (u === -1 && v === -1) return;

      //케이스 종료
      if (u === 0 && v === 0) {
        //트리 판별 시작
        let isTree = check(tree, set, max);
        if (isTree) console.log(`Case ${test} is a tree.`);
        else console.log(`Case ${test} is not a tree.`);
        tree = new Map();
        set = new Set();
        max = -1;
        test += 1;
      }
      //트리 생성
      else {
        max = Math.max(u, v, max);
        set.add(u);
        set.add(v);
        tree.has(v) ? tree.set(v, tree.get(v).concat(u)) : tree.set(v, [u]);
      }
    }
  }
}

function check(tree, nodes, max) {
  let root = false;
  if (nodes.size === 0) return true; //빈 트리도 트리
  for (let n of nodes) {
    //들어오는 노드가 1개 or 0개여야함
    if (!tree.get(n)) {
      if (root) return false; //root가 두개 이상인 경우 트리 아님
      root = n;
    } else if (tree.get(n).length > 1) return false; //들어오는 간선이 두개 이상인 노드가 있으면 트리 아님
  }
  if (!root) return false;

  //root에서부터 모든 간선 도달 가능한지 체크
  const graph = new Array(max + 1);
  for (let i = 0; i <= max + 1; i++) graph[i] = [];

  const visited = new Array(max + 1).fill(false);
  for (let [child, parent] of tree) {
    graph[parent].push(child);
  }

  dfs(root);
  function dfs(v) {
    visited[v] = true;
    for (let i of graph[v]) {
      if (!visited[i]) dfs(i);
    }
  }

  for (let n of nodes) {
    if (!visited[n]) return false;
  }

  return true;
}

play();
