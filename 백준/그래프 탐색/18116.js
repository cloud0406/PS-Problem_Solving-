const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/18116.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const commands = input.slice(1).map((v) => v.split(" "));

function solution(N, commands) {
  const answer = [];
  const parents = Array.from({ length: 1000001 }, (_, i) => i);
  const cnts = Array.from({ length: 1000001 }, () => 1);

  const find = (x) => {
    if (parents[x] === x) return x;
    else {
      parents[x] = find(parents[x]);
      return parents[x];
    }
  };

  const union = (a, b) => {
    const aParent = find(a);
    const bParent = find(b);

    if (aParent < bParent) {
      parents[bParent] = aParent;
      cnts[aParent] += cnts[bParent];
      cnts[bParent] = 0;
    } else if (bParent < aParent) {
      parents[aParent] = bParent;
      cnts[bParent] += cnts[aParent];
      cnts[aParent] = 0;
    }
  };

  for (const cmd of commands) {
    if (cmd[0] === "I") union(+cmd[1], +cmd[2]);
    else if (cmd[0] === "Q") {
      const c = +cmd[1];
      const cParent = find(c);
      answer.push(cnts[cParent]);
    }
  }

  return answer.join("\n");
}

console.log(solution(N, commands));
