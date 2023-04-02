const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1182.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution() {
  let answer = 0;

  function dfs(L, sum) {
    if (L === N) return;

    sum += arr[L];
    if (sum === S) answer++;

    dfs(L + 1, sum - arr[L]); // 현재 값 선택 x
    dfs(L + 1, sum); // 현재 값 선택
  }

  dfs(0, 0);

  return answer;
}

console.log(solution());
