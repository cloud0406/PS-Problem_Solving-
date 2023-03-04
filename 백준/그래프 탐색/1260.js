const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input/1260.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, V] = input.shift().split(" ").map(Number);

// 간선
const edges = input.map((v) => v.split(" ").map(Number));

// 그래프 배열 만들기
const graph = [...Array(N + 1)].map(() => []);

// 양방향 그래프 설정
edges.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

// DFS : 스택으로 구현
const dfs = (start) => {
  const stack = [start];
  const visited = Array(N + 1).fill(false);
  const order = [];

  while (stack.length) {
    const node = stack.pop();
    if (!visited[node]) {
      // 방문하지 않은 정점이면
      visited[node] = true; // 방문  표시
      order.push(node); // 방문순서대로 배열에 담음
      stack.push(...graph[node]); // 그래프에서 현재 정점에 연결되어있는 다른 정점들 모두 스택에 추가
    }
  }

  return order.join(" ");
};

// BFS : 큐로 구현
const bfs = (start) => {
  const queue = [start];
  const visited = Array(N + 1).fill(false);
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    if (!visited[node]) {
      visited[node] = true;
      order.push(node);
      queue.push(...graph[node]);
    }
  }

  return order.join(" ");
};

// 방문할 수 있는 정점 여러개면 작은 것을 먼저 방문하므로 미리 오름차순 정렬
graph.forEach((v) => v.sort((a, b) => b - a));
console.log(dfs(V));

graph.forEach((v) => v.sort((a, b) => a - b));
console.log(bfs(V));
