const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14719.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const blocks = input[1].split(" ").map(Number);

let answer = 0;

// 가장 왼쪽, 오른쪽 블락은 물이 찰 수 없으므로 사이의 블락만 체크
for (let i = 1; i < W - 1; i++) {
  const leftMax = Math.max(...blocks.slice(0, i));
  const rightMax = Math.max(...blocks.slice(i + 1));
  const minHeight = Math.min(leftMax, rightMax);

  if (blocks[i] < minHeight) answer += minHeight - blocks[i];
}

console.log(answer);
