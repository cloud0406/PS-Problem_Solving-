const input = require("fs")
  .readFileSync(__dirname + "/input/15664.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const answer = new Set();

const tmp = [];

function dfs(L, start) {
  if (L === M) {
    answer.add(tmp.slice().join(" ")); // set으로 중복 제거
  } else {
    for (let i = start; i < N; i++) {
      tmp.push(arr[i]);
      dfs(L + 1, i + 1);
      tmp.pop();
    }
  }
}
dfs(0, 0);

console.log([...answer].join("\n"));
