const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6443.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const strArr = input.slice(1);

function solution(N, strArr) {
  const answer = [];

  strArr.forEach((str, idx) => {
    const result = [];
    const visited = {};
    const sorted = str.split("").sort();

    sorted.forEach((el) => {
      if (visited[el] === undefined) visited[el] = 1;
      else visited[el]++;
    });

    const backTracking = (count) => {
      if (count === sorted.length) {
        answer.push(result.join(""));
        return;
      }

      for (const k in visited) {
        if (visited[k]) {
          visited[k]--;
          result.push(k);
          backTracking(count + 1);
          visited[k]++;
          result.pop();
        }
      }
    };

    backTracking(0);
  });

  return answer.join("\n");
}

console.log(solution(N, strArr));
