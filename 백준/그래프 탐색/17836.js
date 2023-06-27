const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17836.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, T] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, T, arr) {
  let answer = Infinity;
  // 검을 가지기 전, 검을 가진 이후의 visited를 따로 설정 (검을 가진 후  왔던 경로 다시가서 벽 부수고 가는게 빠른 경우가 있음)
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const swordVisited = Array.from({ length: N }, () => Array(M).fill(false));

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  let sword = arr[0][0] === 2 ? true : false; // 첫 지점이 검일 경우
  let time = 0;

  const queue = [[0, 0, sword, time]];

  const bfs = (queue) => {
    while (queue.length) {
      const [x, y, sword, time] = queue.shift();

      if (time > T) return "Fail";
      // 마지막 좌표 도달
      if (x === N - 1 && y === M - 1) {
        answer = Math.min(answer, time);
        return answer;
      }

      for (let i = 0; i < 4; i++) {
        nx = x + dx[i];
        ny = y + dy[i];

        if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
          // 검 가지지 않은 경우
          if (!sword) {
            if (arr[nx][ny] !== 1 && !visited[nx][ny]) {
              if (arr[nx][ny] === 2) {
                swordVisited[nx][ny] = true;
                queue.push([nx, ny, true, time + 1]);
              } else {
                visited[nx][ny] = true;
                queue.push([nx, ny, false, time + 1]);
              }
            }
          } else {
            // 검 가진 경우
            if (!swordVisited[nx][ny]) {
              swordVisited[nx][ny] = true;
              queue.push([nx, ny, true, time + 1]);
            }
          }
        }
      }
    }
  };

  bfs(queue);

  return answer === Infinity ? "Fail" : answer;
}

console.log(solution(N, M, T, arr));
