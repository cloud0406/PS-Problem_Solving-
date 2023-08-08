const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1715.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const sizes = input.slice(1).map(Number);

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let curIndex = this.heap.length - 1;
    let parIndex = Math.floor(curIndex / 2);

    while (parIndex !== 0 && this.heap[parIndex] > this.heap[curIndex]) {
      [this.heap[curIndex], this.heap[parIndex]] = [
        this.heap[parIndex],
        this.heap[curIndex],
      ];

      curIndex = parIndex;
      parIndex = Math.floor(curIndex / 2);
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop();
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let curIndex = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    while (
      this.heap[curIndex] > this.heap[leftIdx] ||
      this.heap[curIndex] > this.heap[rightIdx]
    ) {
      if (this.heap[leftIdx] > this.heap[rightIdx]) {
        [this.heap[curIndex], this.heap[rightIdx]] = [
          this.heap[rightIdx],
          this.heap[curIndex],
        ];
        curIndex = rightIdx;
      } else {
        [this.heap[curIndex], this.heap[leftIdx]] = [
          this.heap[leftIdx],
          this.heap[curIndex],
        ];
        curIndex = leftIdx;
      }

      leftIdx = curIndex * 2;
      rightIdx = curIndex * 2 + 1;
    }

    return returnValue;
  }

  isEmpty() {
    return this.heap.length === 2;
  }
}

function solution(N, sizes) {
  let answer = 0;
  const heap = new MinHeap();

  for (let size of sizes) {
    heap.push(size);
  }

  while (!heap.isEmpty()) {
    const size = heap.pop() + heap.pop();
    answer += size;
    heap.push(size);
  }

  return answer;
}

console.log(solution(N, sizes));
