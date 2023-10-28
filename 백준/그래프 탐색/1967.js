const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1967.txt"
  )
  .toString()
  .trim()
  .split("\n");

const sol = (input) => {
  const N = +input[0];
  if (N === 1) return 0; // N=1 이면 지름은 0이다.
  input = input.slice(1);
  const tree = Array.from({ length: N + 1 }, () => new Array());
  input.map((str) => {
    const [from, to, dist] = str.split(" ").map(Number);
    tree[from].push([to, dist]);
    tree[to].push([from, dist]);
  }); // tree배열의 인덱스에 노드에 연결된 다른 노드와 거리 정보를 배열 쌍으로 넣어준다.
  tree.sort((a, b) => a[0] - b[0]);

  function bfs(s) {
    const check = new Array(N + 1).fill(0); // 체크 배열을 bfs함수 내에 선언해주는 것이 더 깔끔하다.
    const queue = [];
    queue.push([s, 0]);
    let max = { node: 0, dist: 0 }; // max 변수에는 최대 거리와 최대 거리인 노드 정보가 들어간다.
    while (queue.length) {
      const [node, dist] = queue.shift();
      if (check[node]) continue;
      check[node] = 1;
      if (max.dist < dist) max = { node, dist }; // 최대 거리이면, max 변수를 갱신한다.
      for (let [nextNode, nextDist] of tree[node]) {
        queue.push([nextNode, dist + nextDist]); // 다음 노드와 노드까지의 누적 거리를 큐에 넣어준다.
      }
    }
    return max; // s 노드를 시작으로 모든 노드를 방문하면 max 변수에는 최대 거리 정보가 들어있다.
  }

  return bfs(bfs(1).node).dist;
  // bfs(N)의 결과는 max 객체이므로, bfs를 2번 반복한 결과 값의 dist는 최대 거리이다.
};

console.log(sol(input));
