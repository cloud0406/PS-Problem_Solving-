const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17425.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const f = new Array(1000001).fill(0);
const d = new Array(1000001);

// 약수 채우기 (배수 이용)
// f[1의 배수] += 1 , f[2의 배수] += 2, f[3의 배수] += 3, ...
for (let i = 1; i <= 1000000; i++) {
  for (let j = i; j <= 1000000; j += i) {
    f[j] += i;
  }
}

d[0] = 0;
for (let i = 1; i <= 1000000; i++) {
  d[i] = d[i - 1] + f[i]; // 누적합 계산
}

let answer = "";

input.slice(1).forEach((v) => {
  answer += d[v] + "\n";
});

console.log(answer.trim());
