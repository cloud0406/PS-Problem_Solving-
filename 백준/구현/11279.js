const fs = require("fs");
const [_, ...input] = fs
  //   .readFileSync("./dev/stdin")
  .readFileSync(__dirname + "/input/11279.txt")
  .toString()
  .trim()
  .split("\n");

// input 문자열 -> 숫자로 전환
const num = input.map((v) => +v);

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // 힙 비어있는지 확인
  empty() {
    return this.heap.length === 0 ? true : false;
  }

  // 교환
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  // 힙 삽입 (마지막 노드에서부터 부모 노드 확인하며 올라옴)
  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  // 삽입 후 이동 알고리즘
  bubbleUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      // 현재 값이 루트로 이동 하면 멈춤
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[parentIndex] >= this.heap[currentIndex]) break; // 부모 값이 현재 값보다 크거나 같으면 정상 -> 멈춤

      // 부모 노드 , 현재 노드 위치 및 인덱스 교환
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  // 최대 값 추출 알고리즘
  extractMax() {
    if (this.heap.length == 1) {
      return this.heap.pop();
    }

    const max = this.heap[0]; // 최댓값 저장
    this.heap[0] = this.heap.pop(); // 마지막 요소, 루트 노드 교체 + pop으로 배열 길이 줄며 원래 루트 노드 값은 삭제됨
    this.sinkDown(0); // 위에서 교체한 마지막 노드의 값을 루트노드에서부터 시작해 위치 정렬

    return max;
  }

  sinkDown(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const length = this.heap.length;

    let largestIndex = index;

    // 왼쪽 자식 노드가 현재 노드보다 크면 인덱스 변경
    if (leftIndex < length && this.heap[leftIndex] > this.heap[largestIndex]) {
      largestIndex = leftIndex;
    }

    // 오른족 자식 노드가 현재 노드보다 크면 인덱스 변경
    if (
      rightIndex < length &&
      this.heap[rightIndex] > this.heap[largestIndex]
    ) {
      largestIndex = rightIndex;
    }

    // 인덱스에 변화가 있으면(노드의 위치가 변경되면) 다시 함수 재실행 -> 변동 없을때까지
    if (largestIndex !== index) {
      this.swap(index, largestIndex);
      this.sinkDown(largestIndex);
    }
  }
}

const answer = [];
const maxHeap = new MaxHeap();
num.forEach((v) => {
  if (v == 0) {
    // input 0, 배열 비어있는 경우 0 삽입
    if (maxHeap.empty()) {
      answer.push(0);
      // // input 0, 배열에 원소 있는 경우 최대값 출력
    } else {
      answer.push(maxHeap.extractMax());
    }
  } else {
    // 자연수인 경우 배열에 삽입
    maxHeap.insert(v);
  }
});

console.log(answer.join("\n"));
