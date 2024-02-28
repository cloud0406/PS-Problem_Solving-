const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18234.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, T] = input[0].split(" ").map(Number);
const carrots = input.slice(1).map((line) => line.split(" ").map(Number));
carrots.sort((a, b) => a[1] - b[1]); // 영양제 값 순으로 오름차순 정렬

let result = 0;
let feeded_days = T - N;

// w<=p이기 때문에 p(영양제)를 기준으로 오름차순 정렬을 한 후에 기다렸다가,
// 최대한 늦게 수확함으로써 최댓값 구함
for (let [w, p] of carrots) {
  result += w + p * feeded_days;
  feeded_days++;
}

console.log(result);
