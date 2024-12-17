const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18223.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [V, E, P] = input[0].split(" ").map(Number);
const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 1; i <= E; i++) {
  const [from, to, cost] = input[i].split(" ").map(Number);
  graph[from].push([to, cost]);
  graph[to].push([from, cost]);
}

function dijkstra(start) {
  const distance = Array(V + 1).fill(Infinity); // start 노드에서 각 노드까지의 최단 거리
  const heap = [[0, start]]; // [현재 노드까지의 비용, 현재노드]
  distance[start] = 0;

  while (heap.length > 0) {
    const [cost, curr] = heap.shift();

    if (distance[curr] < cost) continue;

    for (const [next, c] of graph[curr]) {
      const totalCost = cost + c;
      if (totalCost < distance[next]) {
        distance[next] = totalCost;
        heap.push([totalCost, next]);
        heap.sort((a, b) => a[0] - b[0]); // 비용 기준으로 정렬
      }
    }
  }

  return distance;
}

// '1 -> V 최단 거리' 와 '1 -> P -> V 최단 거리' 가 같으면 구출
const result = dijkstra(1);
const directPath = result[V];
const rescuePath = dijkstra(1)[P] + dijkstra(P)[V];

console.log(directPath === rescuePath ? "SAVE HIM" : "GOOD BYE");
