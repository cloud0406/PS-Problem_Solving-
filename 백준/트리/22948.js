const fs = require("fs");

class Node {
  constructor(node, cnt, allNode) {
    this.node = node;
    this.cnt = cnt;
    this.allNode = allNode;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class PriorityQueue {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  enqueue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  dequeue() {
    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    return root;
  }

  peek() {
    return this.heap[0];
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const element = this.heap[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (this.compare(parent, element) <= 0) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swapIndex = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.compare(leftChild, element) < 0) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && this.compare(rightChild, element) < 0) ||
          (swapIndex !== null && this.compare(rightChild, leftChild) < 0)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }
}

const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22948.txt"
  )
  .toString()
  .trim()
  .split("\n");

let idx = 0;

const N = parseInt(input[idx++]);
const nodeList = Array.from({ length: N + 1 }, () => []);
const pq = new PriorityQueue((a, b) => a.x - b.x);
pq.enqueue(new Point(-10000000, 0));
pq.enqueue(new Point(10000000, 0));

for (let i = 0; i < N; i++) {
  const [k, x, r] = input[idx++].split(" ").map(Number);
  pq.enqueue(new Point(x - r, k));
  pq.enqueue(new Point(x + r, k));
}

makeTree(pq, -1);

const [from, to] = input[idx++].split(" ").map(Number);
const visit = new Array(N + 1).fill(false);
const que = [];
visit[from] = true;
que.push(new Node(from, 1, "" + from));

while (que.length > 0) {
  const now = que.shift();
  if (now.node === to) {
    console.log(now.cnt);
    console.log(now.allNode);
    return;
  }
  for (const next of nodeList[now.node]) {
    if (visit[next]) continue;
    visit[next] = true;
    que.push(new Node(next, now.cnt + 1, now.allNode + " " + next));
  }
}

function makeTree(pq, parents) {
  const now = pq.dequeue();
  if (parents !== -1) {
    nodeList[parents].push(now.y);
    nodeList[now.y].push(parents);
  }
  while (now.y !== pq.peek().y) {
    makeTree(pq, now.y);
  }
  pq.dequeue();
}
