let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1461.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [N, M] = input.shift().split(" ").map(Number);
let Books = input.shift().split(" ").map(Number);

// 왼쪽, 오른쪽 내림차순 정렬
let Left = Books.filter((v) => v < 0).sort((a, b) => {
  return Math.abs(b) - Math.abs(a);
});

let Right = Books.filter((v) => v > 0).sort((a, b) => {
  return Math.abs(b) - Math.abs(a);
});

let Distance = 0;
let max = 0;

// 거리가 먼 것부터 M개씩 가져다 놓으며 왕복 거리 계산
let leftIdx = 0;
while (Left.length > leftIdx) {
  Distance += Math.abs(Left[leftIdx]) * 2;
  max = max < Math.abs(Left[leftIdx]) ? Math.abs(Left[leftIdx]) : max;
  leftIdx += M;
}

// 위와 동일.
let rightIdx = 0;
while (Right.length > rightIdx) {
  Distance += Math.abs(Right[rightIdx]) * 2;
  max = max < Math.abs(Right[rightIdx]) ? Math.abs(Right[rightIdx]) : max;
  rightIdx += M;
}

// 전체 걸음수에서 마지막 걸음수는 빼준다.
console.log(Distance - max);
