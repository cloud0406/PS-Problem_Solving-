const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1240.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const tree = input.slice(1, N).map((v) => v.split(" ").map(Number));
const distances = input.slice(N).map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
tree.forEach(([from, to, distance]) => {
  graph[from].push([to, distance]);
  graph[to].push([from, distance]);
});

const bfs = (from, to) => {
  const queue = [[from, 0]];
  const visited = Array(N + 1).fill(false);

  while (queue.length) {
    const [cur, sum_distance] = queue.shift();

    if (cur === to) return sum_distance; // 현재 출발점과 도착점이 같으면 거리 반환

    for (const [next, dist] of graph[cur]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, dist + sum_distance]); // 큐에 이어진 정점 및 거리+누적 거리 담기
      }
    }
  }
};

for (const [from, to] of distances) {
  console.log(bfs(from, to));
}
