const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11725.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
for (let [from, to] of arr) {
  graph[from].push(to);
  graph[to].push(from);
}

function solution(N, graph) {
  let answer = [];

  const bfs = (start) => {
    const visited = Array(N + 1).fill(false);
    const queue = [start]; // 루트인 1번부터 시작

    while (queue.length > 0) {
      // 정점 하나씩 방문
      let node = queue.shift();
      visited[node] = true;

      // 현재 정점과 연결되어있는 값들 큐에 넣음
      for (let next of graph[node]) {
        if (!visited[next]) {
          queue.push(next);
          answer[next] = node; // 정답 배열 자식 인덱스에 현재 부모 값 저장
        }
      }
    }
  };

  bfs(1);
  return answer.slice(2);
}

console.log(solution(N, graph).join("\n"));
