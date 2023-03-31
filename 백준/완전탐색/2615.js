const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2615.txt"
  )
  .toString()
  .trim()
  .split("\n");

const board = input.map((v) => v.split(" ").map(Number));
const dx = [1, 1, 0, -1]; // 오른, 오른쪽 아래, 아래, 왼쪽 아래
const dy = [0, 1, 1, 1]; // 오른, 오른쪽 아래, 아래, 왼쪽 아래

let ansColor = 0;
let ans = [];

function check(x, y, color) {
  for (let i = 0; i < 4; i++) {
    let [nx, ny] = [x + dx[i], y + dy[i]];
    let cnt = 1; // 현재 바둑돌 개수부터 하나 카운트

    while (1) {
      // 바둑돌 범위 밖은 제외
      if (ny < 0 || ny >= 19 || nx < 0 || nx >= 19) break;
      // 해당 방향 움직였을때 다른 돌이면 제외
      if (board[nx][ny] !== color) break;

      cnt++;
      // 같은 방향으로 좌표 한번더 이동
      nx = nx + dx[i];
      ny = ny + dy[i];
    }

    // 5알 연속이라면
    if (cnt === 5) {
      // 이전 방향의 돌을 체크하여 같은 돌이면 -> 즉, 6목이 될 경우는 정답으로 처리하지 않고 넘어감
      let prevX = x - dx[i];
      let prevY = y - dy[i];
      if (prevY >= 0 && prevY < 19 && prevX >= 0 && prevX < 19) {
        if (board[prevX][prevY] === color) continue;
      }

      // 6목이 아니면 정답 처리
      ansColor = color;
      ans = [x + 1, y + 1];
      return;
    }
  }

  return;
}

for (let i = 0; i < 19; i++) {
  for (let j = 0; j < 19; j++) {
    if (board[i][j] === 0) continue;
    check(i, j, board[i][j]); // 배열 순회하며 검, 흰돌 일때만 체크
  }
}

if (ansColor === 0) console.log(0);
else {
  console.log(ansColor);
  console.log(ans.join(" "));
}
