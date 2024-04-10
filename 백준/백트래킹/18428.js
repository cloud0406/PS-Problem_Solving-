let [N, ...input] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18428.txt"
  )
  .toString()
  .trim()
  .split("\n");

let board = input.map((v) => v.split(" "));

let dx = [-1, 0, 1, 0];
let dy = [0, 1, 0, -1];

function check(board) {
  let queue = [];

  // 선생님 위치 저장
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === "T") queue.push([i, j]);
    }
  }

  for (let i = 0; i < queue.length; i++) {
    for (let j = 0; j < 4; j++) {
      let [nx, ny] = queue[i];

      // 큐에 저장한 선생님 위치별로 4방향 탐색
      // 보드를 벗어날때까지 한방향으로 쭉 탐색
      while (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if (board[nx][ny] === "O") break; // 장애물
        if (board[nx][ny] === "S") return false; // 학생

        nx += dx[j];
        ny += dy[j];
      }
    }
  }

  return true;
}

let answer = false;

function dfs(cnt) {
  // 장애물 3개 설치 완료
  if (cnt === 3) {
    if (check(board)) {
      answer = true;
      return;
    }
  } else {
    // 백트래킹으로 장애물 설치
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (board[i][j] === "X") {
          board[i][j] = "O";
          dfs(cnt + 1);
          board[i][j] = "X";
        }
      }
    }
  }
}

dfs(0);

answer ? console.log("YES") : console.log("NO");
