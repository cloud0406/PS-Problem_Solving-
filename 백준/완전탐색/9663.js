const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9663.txt"
  )
  .toString()
  .trim();

function solution(n) {
  let answer = 0;
  let cols = Array(n).fill(0);

  const isPossible = (x, y, cols) => {
    for (let i = 0; i < x; i++) {
      if (cols[i] === y || Math.abs(x - i) === Math.abs(y - cols[i]))
        return false;
    }

    return true;
  };

  const dfs = (n, cols, row, answer) => {
    if (n === row) return ++answer;

    for (let i = 0; i < n; i++) {
      cols[row] = i;
      if (isPossible(row, i, cols)) {
        answer = dfs(n, cols, row + 1, answer);
      }
    }

    return answer;
  };

  answer = dfs(n, cols, 0, answer);

  return answer;
}

console.log(solution(+input));
