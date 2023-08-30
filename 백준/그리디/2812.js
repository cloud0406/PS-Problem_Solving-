const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2812.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [N, K] = input[0].split(" ").map(Number);
const nums = input[1].split("").map(Number);

function soloution(N, K, nums) {
  const stack = [];

  // stack에 값을 차례대로 넣으면서, 만약 현재 숫자가 스택의 마지막 숫자보다 크다면 뒤에서부터 k번까지 지우기
  for (let num of nums) {
    while (stack.length && K > 0 && num > stack[stack.length - 1]) {
      stack.pop();
      K--;
    }
    stack.push(num);
  }

  // 전부 순회했는데 K번 지우지 못했다면 마저 지우기
  while (K--) stack.pop();

  return stack.join("");
}

console.log(soloution(N, K, nums));
