class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (true) {
      let smallest = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex][0] < this.heap[smallest][0]
      ) {
        smallest = leftIndex;
      }
      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex][0] < this.heap[smallest][0]
      ) {
        smallest = rightIndex;
      }

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20182.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, start, dest, money] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const weights = new Set();

// 그래프 구성 및 비용 저장
for (let i = 0; i < M; i++) {
  const [u, v, w] = input[i + 1].split(" ").map(Number);
  graph[u].push([v, w]);
  graph[v].push([u, w]);
  weights.add(w);
}

function canGo(x) {
  const dist = Array(N + 1).fill(Infinity);
  const pq = new MinHeap();
  pq.push([0, start, 0]); // [비용, 현재노드, 최대간선]
  dist[start] = 0;

  while (!pq.isEmpty()) {
    const [cost, cur, mav] = pq.pop();

    if (dist[cur] < cost) continue;

    for (const [next, weight] of graph[cur]) {
      if (weight > x) continue; // 다음 경로로 가는 비용이 이분탐색으로 정한 값보다 크면 패스

      const nextDist = cost + weight;
      if (nextDist < dist[next]) {
        dist[next] = nextDist;
        pq.push([nextDist, next, Math.max(mav, weight)]);
      }
    }
  }

  return dist[dest] <= money; // 정해진 돈으로 도착지에 도달할 수 있는지
}

// 이분 탐색 -> 최대 상한 요금이 X원일 때, 시작점으로부터 도착점까지 가진 돈으로 갈 수 있는가?
const sortedWeights = [...weights].sort((a, b) => a - b);
let left = 0;
let right = sortedWeights.length - 1;
let ans = -1;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (canGo(sortedWeights[mid])) {
    ans = sortedWeights[mid];
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(ans);
