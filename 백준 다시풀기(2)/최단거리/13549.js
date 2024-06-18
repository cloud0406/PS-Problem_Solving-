const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13549.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

function solution(N, K) {
  const bfs = () => {
    const queue = [[N, 0]];
    const visited = Array.from({ length: 100001 }).fill(false);
    visited[N] = true;

    while (queue.length) {
      const [position, time] = queue.shift();

      if (position === K) return time;

      for (let next of [position * 2, position - 1, position + 1]) {
        // 문제에서 주어진 N(좌표)의 조건에 맞게 탐색
        if (next >= 0 && next <= 100000 && !visited[next]) {
          // 순간 이동 했을때를 먼저 탐색 -> unshift
          if (next === position * 2) queue.unshift([next, time]);
          else queue.push([next, time + 1]);

          visited[next] = true;
        }
      }
    }
  };

  return bfs();
}

console.log(solution(N, K));
