const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9489.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  let index = 0;

  while (true) {
    const [n, k] = input[index++].split(" ").map(Number);

    if (n === 0) break;

    const nodes = input[index++].split(" ").map(Number);
    const tree = {};

    let curIdx = -1;

    for (let i = 1; i < nodes.length; i++) {
      // 이전 노드와의 차이가 1보다 클 경우 -> 연속된 노드가 아닐 경우
      if (nodes[i] - nodes[i - 1] > 1) curIdx++;

      // 자식 관계 만들기
      if (!tree[nodes[curIdx]]) tree[nodes[curIdx]] = [];
      tree[nodes[curIdx]].push(nodes[i]);

      // 부모 관계 만들기
      if (!tree[nodes[i]]) tree[nodes[i]] = [];
      tree[nodes[i]].push(nodes[curIdx]);
      console.log(tree);
    }

    // k의 부모, 조상(부모의 직속 부모) 노드 찾기
    if (curIdx === -1) {
      console.log(0);
      continue;
    }

    const k_par = tree[k][0]; // 직속 부모
    if (k_par > k) {
      console.log(0);
      continue;
    }

    const k_anc = tree[k_par][0]; // 부모의 직속 부모
    if (k_anc > k_par) {
      console.log(0);
      continue;
    }

    // 사촌 개수 구하기 -> K의 부모의 형제들의 자식 개수 세기
    let sib = 0;
    for (const par of tree[k_anc]) {
      if (par < k_anc || par === k_par) continue;
      sib += tree[par].slice(1).length; // 첫 번째 요소는 부모이므로 다음 요소부터 카운팅 해줌
    }

    console.log(sib);
  }
}

solution();
