const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2252.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const node = input.slice(1).map((v) => v.split(" ").map(Number));

function soloution() {
  let answer = [];

  const graph = Array.from({ length: N + 1 }, () => Array());
  const degree = Array(N + 1).fill(0);

  for (let [from, to] of node) {
    graph[from].push(to);
    degree[to]++;
  }

  const stack = [];

  // 선행 학생 없는 것들 stack에 푸쉬
  for (i = 1; i <= N; i++) {
    if (!degree[i]) stack.push(i);
  }

  while (stack.length) {
    // 현재 학생(선행)을 처리
    let curNode = stack.pop();
    answer.push(curNode);

    // 위에서 학생을 처리했으므로 해당 학생의 후순위 학생들의 차수를 1 낮춤, 선행 학생이 모두 처리된 학생일 경우 stack에 푸쉬
    for (let next of graph[curNode]) {
      if (!--degree[[next]]) stack.push(next);
    }
  }

  return answer.join(" ");
}

console.log(soloution());
