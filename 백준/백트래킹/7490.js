const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/7490.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(input) {
  const TC = +input[0];
  let n = 0;
  let numbers = [];

  for (let i = 1; i <= TC; i += 1) {
    n = +input[i];
    numbers = Array.from({ length: n }, (_, i) => i + 1);

    dfs([], 0);
    console.log("");
  }

  function dfs(operators, depth) {
    if (depth === n - 1) {
      let line = "";

      // 마지막 숫자 바로전까지 숫자, 연산 결합
      for (let i = 0; i < n - 1; i += 1) {
        line += numbers[i] + operators[i];
      }

      line += `${numbers[n - 1]}`; // 마지막 숫자 결합

      if (eval(line.split(" ").join("")) === 0) console.log(line);
      return;
    }

    // 연산 개수 = 숫자 개수 - 1
    for (let j of [" ", "+", "-"]) {
      operators.push(j);
      dfs(operators, depth + 1);
      operators.pop();
    }
  }
}

solution(input);
