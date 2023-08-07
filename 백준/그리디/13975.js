const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13975.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [T, ...testcase] = input;

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

function solution(T, testcase) {
  for (let i = 0; i < T; i++) {
    let answer = 0;

    const heap = new MinHeap();
    testcase[i * 2 + 1].split(" ").forEach((i) => heap.push(+i));

    while (!heap.isEmpty()) {
      const size = heap.pop() + heap.pop();
      answer += size;
      heap.push(size);
    }

    console.log(answer);
  }
}

solution(T, testcase);
