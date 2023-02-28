const input = require("fs")
  .readFileSync(__dirname + "/input/11725.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const edges = input.map((e) => e.split(" ").map(Number));
const tree = Array.from(Array(n + 1), () => []);
edges.forEach(([from, to]) => {
  tree[from].push(to);
  tree[to].push(from);
});

const solution = () => {
  const answer = Array(n + 1);
  const visited = new Array(n + 1).fill(false);

  const queue = [1]; // 루트 노드 추가

  // 큐에서 하나씩 제거하며 자식 노드 검사
  while (queue.length) {
    const cur = queue.shift();
    visited[cur] = true;

    for (let next of tree[cur]) {
      if (!visited[next]) {
        answer[next] = cur; // 해당 인덱스에 부모 노드 저장
        visited[next] = true;
        queue.push(next);
      }
    }
  }

  return answer.slice(2).join("\n");
};

console.log(solution());
