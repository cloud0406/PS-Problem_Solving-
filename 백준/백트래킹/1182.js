const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1182.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution() {
  const stack = [];
  let answer = 0;

  function dfs(L) {
    if (L === N) {
      let sum = stack.reduce((acc, cur) => acc + cur, 0);
      if (sum === S) answer++;
      return;
    }

    stack.push(arr[L]);
    dfs(L + 1);
    stack.pop();
    dfs(L + 1);
  }

  dfs(0);

  if (S === 0) answer--;
  console.log(answer);
}

solution();
