const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22116.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const grid = input.slice(1).map((row) => row.split(" ").map(Number));

const DIRECTIONS = {
  dx: [0, 0, 1, -1],
  dy: [1, -1, 0, 0],
};

class PriorityQueue {
  constructor() {
    this.values = [];
    this.size = 0;
  }

  enqueue(cost, row, col) {
    this.values.push([cost, row, col]);
    this.size++;
    this.bubbleUp();
  }

  dequeue() {
    if (this.size === 0) return null;
    this.size--;

    if (this.size === 0) {
      return this.values.pop();
    }

    const min = this.values[0];
    this.values[0] = this.values.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let idx = this.size - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[parentIdx][0] <= this.values[idx][0]) break;

      [this.values[parentIdx], this.values[idx]] = [
        this.values[idx],
        this.values[parentIdx],
      ];
      idx = parentIdx;
    }
  }

  bubbleDown() {
    let idx = 0;
    while (true) {
      let minIdx = idx;
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;

      if (
        leftIdx < this.size &&
        this.values[leftIdx][0] < this.values[minIdx][0]
      ) {
        minIdx = leftIdx;
      }
      if (
        rightIdx < this.size &&
        this.values[rightIdx][0] < this.values[minIdx][0]
      ) {
        minIdx = rightIdx;
      }

      if (minIdx === idx) break;

      [this.values[idx], this.values[minIdx]] = [
        this.values[minIdx],
        this.values[idx],
      ];
      idx = minIdx;
    }
  }

  isEmpty() {
    return this.size === 0;
  }
}

function dijkstra() {
  const distances = Array.from({ length: n }, () => Array(n).fill(Infinity));
  distances[0][0] = 0;

  const pq = new PriorityQueue();
  pq.enqueue(0, 0, 0);

  while (!pq.isEmpty()) {
    const [curCost, curRow, curCol] = pq.dequeue();

    if (distances[curRow][curCol] < curCost) continue;

    for (let dir = 0; dir < 4; dir++) {
      const nextRow = curRow + DIRECTIONS.dy[dir];
      const nextCol = curCol + DIRECTIONS.dx[dir];

      if (isOutOfBounds(nextRow, nextCol)) continue;

      const nextCost = Math.max(
        curCost,
        Math.abs(grid[curRow][curCol] - grid[nextRow][nextCol])
      );

      if (distances[nextRow][nextCol] > nextCost) {
        distances[nextRow][nextCol] = nextCost;
        pq.enqueue(nextCost, nextRow, nextCol);
      }
    }
  }
  return distances;
}

function isOutOfBounds(row, col) {
  return row < 0 || col < 0 || row >= n || col >= n;
}

const distances = dijkstra();
console.log(distances[n - 1][n - 1]);
