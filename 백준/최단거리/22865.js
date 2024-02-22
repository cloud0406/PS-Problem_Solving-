const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : __dirname + "/input/22865.txt",
    "utf8"
  )
  .trim()
  .split("\n");

const N = +input[0];
const [A, B, C] = input[1].split(" ").map(Number);
const M = +input[2];
const arr = input.slice(3).map((v) => v.split(" ").map(Number));

function dijkstra(graph, start) {
  const distance = new Array(graph.length).fill(Infinity);
  distance[start] = 0;

  const heap = new MinHeap();
  heap.push([0, start]);

  while (!heap.isEmpty()) {
    const [dist, node] = heap.pop();
    if (distance[node] < dist) continue;

    for (const [nextNode, nextDist] of graph[node]) {
      const newDist = dist + nextDist;
      if (newDist < distance[nextNode]) {
        distance[nextNode] = newDist;
        heap.push([newDist, nextNode]);
      }
    }
  }

  return distance;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  heapifyUp(index) {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex][0] < this.heap[parentIndex][0]) {
        [this.heap[currentIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[currentIndex],
        ];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(index) {
    let currentIndex = index;
    const lastIndex = this.heap.length - 1;
    while (true) {
      let leftChildIndex = currentIndex * 2 + 1;
      let rightChildIndex = currentIndex * 2 + 2;
      let minIndex = currentIndex;

      if (
        leftChildIndex <= lastIndex &&
        this.heap[leftChildIndex][0] < this.heap[minIndex][0]
      ) {
        minIndex = leftChildIndex;
      }

      if (
        rightChildIndex <= lastIndex &&
        this.heap[rightChildIndex][0] < this.heap[minIndex][0]
      ) {
        minIndex = rightChildIndex;
      }

      if (minIndex !== currentIndex) {
        [this.heap[currentIndex], this.heap[minIndex]] = [
          this.heap[minIndex],
          this.heap[currentIndex],
        ];
        currentIndex = minIndex;
      } else {
        break;
      }
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(N, A, B, C, M, arr) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let [D, E, L] of arr) {
    graph[D].push([E, L]);
    graph[E].push([D, L]);
  }

  let max_size = 0;
  let answer = 0;

  // 각 지점에서부터 최단거리를 구함
  const dist_a = dijkstra(graph, A);
  const dist_b = dijkstra(graph, B);
  const dist_c = dijkstra(graph, C);

  // i -> A,B,C 중 최단거리 구하고, 그 중 최대값을 찾음
  for (let i = 1; i <= N; i++) {
    const minDist = Math.min(dist_a[i], dist_b[i], dist_c[i]);
    if (max_size < minDist) {
      max_size = minDist;
      answer = i;
    }
  }

  return answer;
}

console.log(solution(N, A, B, C, M, arr));
