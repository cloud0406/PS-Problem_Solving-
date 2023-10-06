const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1553.txt"
  )
  .toString()
  .trim()
  .split("\n");

const graph = input.map((v) => v.split("").map(Number));
const visited = Array.from({ length: 8 }, () => Array(7).fill(false));
const domino = Array.from({ length: 8 }, () => Array(7).fill(false));

function solution(x, y) {
  if (x === 8) return 1; // 모든 격자 탐색 완료 -> 1리턴

  let count = 0;

  let nx = x;
  let ny = y + 1; // 오른쪽으로 이동
  if (ny === 7) {
    nx++;
    ny = 0;
  }

  if (visited[x][y]) {
    return solution(nx, ny); // 다음 위치로 이동
  } else {
    const now = graph[x][y];
    visited[x][y] = true;

    const directions = [
      [0, 1], // 오른쪽
      [1, 0], // 아래
    ];

    for (const [dx, dy] of directions) {
      const mx = x + dx;
      const my = y + dy;

      if (mx >= 0 && mx < 8 && my >= 0 && my < 7) {
        const pair = graph[mx][my]; // 오른쪽이나 아래 값

        // 놓을 수 있고, 사용되지 않은 도미노
        if (!visited[mx][my] && !domino[now][pair]) {
          domino[now][pair] = domino[pair][now] = true;
          visited[mx][my] = true;

          count += solution(nx, ny); // 다음 위치로 이동 (마지막 줄까지 통과한다면 1리턴 해주므로 이를 총 개수에 더해줌)

          domino[now][pair] = domino[pair][now] = false;
          visited[mx][my] = false;
        }
      }
    }

    visited[x][y] = false;
    return count;
  }
}

console.log(solution(0, 0)); // start
