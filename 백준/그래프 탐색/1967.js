const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1967.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];

const tree = Array.from({ length: N + 1 }, () => new Array());
input.slice(1).map((str) => {
  const [from, to, dist] = str.split(" ").map(Number);
  tree[from].push([to, dist]);
  tree[to].push([from, dist]);
});
tree.sort((a, b) => a[0] - b[0]);

function solution(N, tree) {
  if (N === 1) return 0; // N=1 이면 지름은 0이다.

  const bfs = (start) => {
    const visited = new Array(N + 1).fill(0);
    const queue = [];
    queue.push([start, 0]);

    let max = { node: 0, dist: 0 }; // max 변수에는 최대 거리와 최대 거리인 노드 정보가 들어간다.

    while (queue.length) {
      const [node, dist] = queue.shift();

      if (!visited[node]) {
        visited[node] = true;

        if (max.dist < dist) max = { node, dist }; // 최대 거리이면, max 변수를 갱신한다.

        for (let [nextNode, nextDist] of tree[node]) {
          queue.push([nextNode, dist + nextDist]); // 다음 노드와 노드까지의 누적 거리를 큐에 넣어준다.
        }
      }
    }

    return max;
  };

  return bfs(bfs(1).node).dist; // 1번에서 가장 큰 노드 탐색 -> 해당 노드와 가장 먼 거리 리턴
}

console.log(solution(N, tree));
