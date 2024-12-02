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
const visited = Array.from({ length: N }, () => Array(N).fill(false));

// 오른쪽(→), 아래(↓)
const dx = [1, 0];
const dy = [0, 1];

const dfs = (x, y, route, sign) => {
  // 수식을 평가 -> 최솟값, 최댓값 갱신
  if (x === N - 1 && y === N - 1) {
    const answer = eval(route);

    min = Math.min(answer, min);
    max = Math.max(answer, max);

    return;
  }

  for (let i = 0; i < 2; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
      visited[nx][ny] = true;

      if (sign) dfs(nx, ny, route + board[nx][ny], false);
      else dfs(nx, ny, "(" + route + board[nx][ny] + ")", true); // 숫자 추가할때는 양끝에 괄호 추가

      visited[nx][ny] = false;
    }
  }
};

visited[0][0] = true;
dfs(0, 0, board[0][0], true);

console.log(`${max} ${min}`);
