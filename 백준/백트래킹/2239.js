const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2239.txt"
  )
  .toString()
  .split("\n")
  .map((v) => v.split("").map(Number));

let flag = false;

// k (x,y)에 넣을 수 있는지 검증
// 가로, 세로, 사각형 확인 (3x3에 같은 숫자 있는지)
function check(x, y, sudoku, k) {
  for (let i = 0; i < 9; i++) if (sudoku[y][i] === k) return false;
  for (let i = 0; i < 9; i++) if (sudoku[i][x] === k) return false;

  const startX = Math.floor(x / 3) * 3;
  const startY = Math.floor(y / 3) * 3;
  for (let i = startY; i < startY + 3; i++) {
    for (let j = startX; j < startX + 3; j++) {
      if (sudoku[i][j] === k) return false;
    }
  }

  return true;
}

// 빈칸 채우기
function insert(sudoku, blank) {
  // 빈칸 없으면 출력, 종료
  if (blank === 0) {
    let answer = sudoku.map((row) => row.join("")).join("\n");
    console.log(answer);
    flag = true;
    return;
  }

  if (flag) return;

  // 빈칸이면 1~9까지 넣어보기
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          if (check(j, i, sudoku, k)) {
            sudoku[i][j] = k;
            insert(sudoku, blank - 1); // 스도쿠에 숫자 채우고, 빈칸 감소
            sudoku[i][j] = 0; // 가능한 숫자 없다면 빈칸으로 돌려 놓음
          }
        }
        return;
      }
    }
  }
}

function solution() {
  const sudoku = input;
  const blank = sudoku.flat().filter((v) => v === 0).length;

  insert(sudoku, blank);
}

solution();
