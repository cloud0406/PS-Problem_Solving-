const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16234.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, L, R] = input.shift().split(" ").map(Number);
const land = input.map((v) => v.split(" ").map(Number));

function solution(N, L, R, land) {
  let answer = 0;

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  const bfs = (x, y, visited) => {
    const queue = [[x, y]];
    const union = [[x, y]];
    visited[y][x] = true; // 현재 좌표 방문
    let people = land[y][x]; // 연합 인구 수

    while (queue.length) {
      const [X, Y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let nx = X + dx[i];
        let ny = Y + dy[i];

        // 좌표 범위내에 있고 방문 안했으면
        if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[ny][nx]) {
          let diff = Math.abs(land[Y][X] - land[ny][nx]); // 인구 차이

          // 인구 이동 : 이웃 국가 방문 -> 연합 인구 수 증가
          if (diff >= L && diff <= R) {
            queue.push([nx, ny]);
            union.push([nx, ny]);
            people += land[ny][nx];
            visited[ny][nx] = true;
          }
        }
      }
    }

    // 연합의 각 땅의 인구수를 균등하게 분배 (연합의 인구수 / 땅 개수)
    // 연합 생성 안되면 -> 사람 수 동일 / 연합 수 본인 자신 하나 이므로 인구 그대로 유지
    union.forEach(([x, y]) => {
      land[y][x] = Math.floor(people / union.length);
    });

    return union.length;
  };

  while (1) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));

    let flag = false;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          // 연합한 땅의 개수를 리턴 받고 2개 이상인 경우 -> 즉, 연합이 이뤄진 경우 flag 변경
          let cnt = bfs(j, i, visited);
          if (cnt >= 2) flag = true;
        }
      }
    }

    if (!flag) break;  // 더이상 연합 이뤄지지 않으면 종료
    else answer++; // 연합 이뤄진 상태면 인구 이동 횟수 증가
  }

  return answer;
}

console.log(solution(N, L, R, land));
