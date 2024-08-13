const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17265.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];

let max = -Infinity;
let min = Infinity;

const board = input.slice(1).map((line) => line.split(" "));
const visited = Array.from({ length: N }, () => Array(N).fill(false)); // 방문 여부를 기록하는 배열

// 오른쪽(→), 아래(↓)
const dx = [1, 0];
const dy = [0, 1];

const dfs = (x, y, route, sign) => {
  // 만약 도착 지점에 도달했다면 수식을 평가하고 최솟값, 최댓값 갱신
  if (x === N - 1 && y === N - 1) {
    const answer = eval(route);

    min = Math.min(answer, min);
    max = Math.max(answer, max);

    return;
  }

  // 두 방향(오른쪽, 아래쪽)으로 이동하며 탐색
  for (let i = 0; i < 2; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    // 유효한 범위 내, 아직 방문하지 않은 지점으로 이동
    if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
      visited[nx][ny] = true;

      // 부호를 추가할 차례인 경우, 숫자를 추가할 차례인 경우로 나눔
      if (sign)
        dfs(nx, ny, route + board[nx][ny], false); // 숫자 추가 후 다음 탐색
      else dfs(nx, ny, "(" + route + board[nx][ny] + ")", true); // 부호 추가 후 다음 탐색

      visited[nx][ny] = false;
    }
  }
};

visited[0][0] = true;
dfs(0, 0, board[0][0], true);

console.log(max, min);
