class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18513.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const water = input[1].split(" ").map(Number);

function solution(N, K, water) {
  const queue = new Queue();
  const set = new Set();

  // 불행도를 최소로 해야하기 때문에 샘터의 위치를 기준으로 실행
  for (let i = 0; i < N; i++) {
    queue.push(water[i]);
    set.add(water[i]);
  }

  let answer = 0;
  let cnt = 0;
  let distance = 1;

  while (!queue.isEmpty()) {
    let repeat = queue.size();

    // 특정 시점의 큐에 같이 들어있는 좌표들은 샘터와의 distance가 같다.
    while (repeat) {
      const cur = queue.front();
      queue.pop();

      // 샘터 기준 +1, -1 위치에 집 세움
      for (let dir of [1, -1]) {
        const next = cur + dir;

        if (set.has(next)) continue; // 이미 집 있다면 건너뜀

        queue.push(next); // 해당 좌표 기준 +-1 위치에 또 집을 지어야하기 때문에 큐에 넣어줌
        set.add(next);
        cnt++;
        answer += distance; // 불행도 계산

        if (cnt === K) return answer; // 총 집의 개수가 K개일 경우 종료
      }

      repeat--;
    }

    distance++; // 거리를 하나씩 늘려가며 집 지음, 처음 거리 1인 집들 다 짓고 -> 거리 2인 집 짓고...
  }
}

console.log(solution(N, K, water));
