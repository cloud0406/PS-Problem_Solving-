const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/19539.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const h = input[1].split(" ").map(Number);

let cnt = 0;

// 1. 높이 3의 배수인지 체크
if (h.reduce((sum, val) => sum + val, 0) % 3 === 0) {
  for (let i = 0; i < h.length; i++) {
    cnt += Math.floor(h[i] / 2);
  }

  // 2. 2로 나눈 몫의 합이 사과나무들의 높이를 더한 값을 3으로 나눈 몫보다 크거나 같은지 체크
  if (cnt >= h.reduce((sum, val) => sum + val, 0) / 3) {
    console.log("YES");
  } else {
    console.log("NO");
  }
} else {
  console.log("NO");
}
