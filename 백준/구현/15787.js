const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15787.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const commands = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, commands) {
  const trainArr = Array.from({ length: N }, () => Array(20).fill(0));
  const answer = new Set();

  const action = (command, i, x) => {
    switch (command) {
      case 1:
        trainArr[i][x] = 1;
        break;
      case 2:
        trainArr[i][x] = 0;
        break;
      case 3:
        trainArr[i].unshift(0);
        trainArr[i].pop();
        break;
      case 4:
        trainArr[i].shift();
        trainArr[i].push(0);
        break;
      default:
        break;
    }
  };

  for (let [command, i, x] of commands) {
    action(command, i - 1, x - 1);
  }

  for (let train of trainArr) {
    answer.add(JSON.stringify(train));
  }

  return answer.size;
}

console.log(solution(N, M, commands));
