const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16719.txt"
  )
  .toString()
  .trim();

function solution(input) {
  chars = input.split("");
  const answer = [];
  let visited = Array(chars.length).fill(false);

  const makeStr = (left, right) => {
    if (left === right) return;

    let result = "";
    const minChar = chars.slice(left, right).sort()[0];
    const minIdx = chars.slice(left, right).indexOf(minChar) + left;

    visited[minIdx] = true;

    for (let i = 0; i < chars.length; i++) {
      if (visited[i]) result += chars[i];
    }
    answer.push(result);

    makeStr(minIdx + 1, right);
    makeStr(left, minIdx);
  };

  makeStr(0, chars.length);

  return answer.join("\n");
}

console.log(solution(input));
