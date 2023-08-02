let board = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2580.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => +v));

function soloution() {
  // 비어 있는 부분 찾기
  const zero = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        zero.push([j, i]);
      }
    }
  }

  //백트래킹 체크
  const check = (x, y, n, board) => {
    // x열 확인
    for (let i = 0; i < 9; i++) {
      if (board[i][x] === n) return false;
    }

    // y행 확인
    for (let i = 0; i < 9; i++) {
      if (board[y][i] === n) return false;
    }

    // 3x3 확인, X Y 좌표는 3x3 기준 맨 왼쪽 위 자표
    const X = Math.floor(x / 3) * 3;
    const Y = Math.floor(y / 3) * 3;

    for (let i = Y; i < Y + 3; i++) {
      for (let j = X; j < X + 3; j++) {
        if (board[i][j] === n) return false;
      }
    }

    return true; // 모두 통과해야 true 리턴
  };

  let exit = false; // 왜 필요할까?

  //dfs
  const dfs = (cnt, sudoku) => {
    if (cnt === zero.length) {
      console.log(sudoku.map((v) => v.join(" ")).join("\n"));
      exit = true;
      return;
    }

    if (!exit) {
      const [x, y] = zero[cnt];
      // 비어있는 x,y 좌표에 넣을 수 있는 i값 (1~9) 찾아서 넣기
      for (let i = 1; i < 10; i++) {
        if (check(x, y, i, sudoku)) {
          sudoku[y][x] = i;
          dfs(cnt + 1, sudoku);
          sudoku[y][x] = 0;
        }
      }
    }
  };

  dfs(0, board);
}

soloution();
