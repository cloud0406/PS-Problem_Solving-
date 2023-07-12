const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1939.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const islands = input.slice(1, -1).map((v) => v.split(" ").map(Number));
const [start, end] = input[input.length - 1].split(" ").map(Number);

function solution(N, M, islands, start, end) {
  const graph = Array.from({ length: N + 1 }, () => []);
  let maxWeight = 0;

  for (const [from, to, weight] of islands) {
    graph[from].push([to, weight]);
    graph[to].push([from, weight]);

    if (weight > maxWeight) maxWeight = weight; // 최대 무게를 저장
  }

  const BFS = (cost) => {
    const visited = new Array(N + 1).fill(false);
    const queue = [];
    queue.push(start); // 시작 지점 큐에 넣기
    visited[start] = true;

    let queueIndex = 0; // 큐를 구현해야할까?
    while (queueIndex < queue.length) {
      const city = queue[queueIndex++];

      if (city === end) return true; // 이분 탐색으로 정한 cost(중량 최댓값)로 목적지 도달하면 종료

      // 방문하지 않았고, 비용이 더 큰 경로를 큐에 넣음
      for (let [destination_city, destination_cost] of graph[city]) {
        if (!visited[destination_city] && cost <= destination_cost) {
          visited[destination_city] = true;
          queue.push(destination_city);
        }
      }
    }

    return false; // 목적지 도달 못하면 false
  };

  let left = 0;
  let right = maxWeight;

  while (left <= right) {
    const mid = Math.floor((right + left) / 2);
    if (BFS(mid)) left = mid + 1; // 통과 가능하면 중량 올림
    else right = mid - 1;
  }

  return right;
}

console.log(solution(N, M, islands, start, end));
