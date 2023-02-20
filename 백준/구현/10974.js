const fs = require("fs");

const n = fs
  .readFileSync(__dirname + "/input/10974.txt")
  .toString()
  .trim();

const arr = Array.from({ length: n }, (_, i) => i + 1);

let answer = [];

function solution(n, arr) {
  let ch = Array.from({ length: n }, () => 0);
  let tmp = Array.from({ length: n }, () => 0);
  function DFS(L) {
    if (L === n) {
      answer.push(tmp.join(" "));
    } else {
      for (let i = 0; i < n; i++) {
        if (ch[i] === 0) {
          ch[i] = 1;
          tmp[L] = arr[i];
          DFS(L + 1);
          ch[i] = 0;
        }
      }
    }
  }
  DFS(0);
  return answer;
}

solution(parseInt(n), arr);

console.log(answer.join("\n"));
