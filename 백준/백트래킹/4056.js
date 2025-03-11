const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/4056.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const T = +input[line++];

// 유효성 검사 함수
function checkValid(board) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y] === 0) continue;

      // 3x3 격자 검사
      for (let i = 0; i < 9; i++) {
        // 시작 위치 (행,열 위치 인덱스 => (0,0) ~ (2,2))
        const nx = Math.floor(x / 3) * 3 + Number("000111222"[i]);
        const ny = Math.floor(y / 3) * 3 + Number("012012012"[i]);

        // 같은 행, 열, 3x3 격자에 같은 숫자가 있는지 검사
        if (i !== y && board[x][i] === board[x][y]) return false;
        if (i !== x && board[i][y] === board[x][y]) return false;
        if ((nx !== x || ny !== y) && board[nx][ny] === board[x][y])
          return false;
      }
    }
  }
  return true;
}

function solve(board) {
  const ret = board.map((row) => [...row]);

  function dfs(dep) {
    // 주어진 빈칸 5개 모두 채움
    if (dep === 5) return true;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (ret[i][j]) continue;

        // 빈칸에 하나씩 넣어보며 유효성 검사
        for (let k = 1; k <= 9; k++) {
          ret[i][j] = k;
          if (!checkValid(ret)) continue; // 위배되면 다음 숫자
          if (dfs(dep + 1)) return true; // 성공이면 다음 빈칸
        }

        // 1~9 모두 실패시 되돌리기
        ret[i][j] = 0;
        return false;
      }
    }

    return false;
  }

  return dfs(0) ? ret : false;
}

let result = "";

// 각 테스트 케이스 처리
for (let t = 0; t < T; t++) {
  const board = Array.from({ length: 9 }, () =>
    input[line++].split("").map(Number)
  );

  const ans = solve(board);

  if (ans) result += ans.map((row) => row.join("")).join("\n");
  else result += "Could not complete this grid.";

  result += "\n\n";
}

console.log(result.trim());
