const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1325.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map((value) => +value));

const [N, M] = input[0];

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  let [A, B] = input[i];
  graph[B].push(A);
}

// 시초가 나오지만 워낙 빽뺵한 문제라 고칠 필요는 없을 것 같다.
function solution(N, M, graph) {
  let answer = Array.from({ length: N + 1 }, () => []);

  const dfs = (start) => {
    const visited = Array(N + 1).fill(false);
    const stack = [start];
    let cnt = 0;

    while (stack.length) {
      let node = stack.pop();
      visited[node] = true;
      cnt++;

      for (let next of graph[node]) {
        if (!visited[next]) stack.push(next);
      }
    }

    answer[cnt].push(start);
  };

  for (let i = 1; i <= N; i++) {
    dfs(i);
  }

  for (let i = N; i >= 0; i--) {
    if (answer[i].length > 0) return answer[i].join(" ");
  }
}

console.log(solution(N, M, graph));
