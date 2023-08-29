const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18808.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

function soloution(N, M, K) {
  const board = Array.from({ length: N }, () => Array(M).fill(0));

  let sticker;
  let R;
  let C;

  let curInputIdx = 1;
  let T = 0;
  while (T++ < K) {
    [R, C] = input[curInputIdx].split(" ").map(Number);
    const plusInputIdx = R;
    sticker = Array.from({ length: 10 }, () => Array(10));

    // 스티커 배열에 좌표 저장
    for (let i = curInputIdx + 1; i < curInputIdx + R + 1; i++) {
      const temp = input[i].split(" ").map(Number);
      for (let j = 0; j < C; j++) {
        sticker[i - (curInputIdx + 1)][j] = temp[j];
      }
    }

    // 스터커 붙일 수 있으면 바로 붙이고, 안되면 회전 시키기
    if (isAttach()) curInputIdx += plusInputIdx + 1;
    else {
      for (let k = 0; k < 3; k++) {
        sticker = rotate();
        if (isAttach()) break;
      }
      curInputIdx += plusInputIdx + 1;
    }
  }

  // 현재 위치(x, y)에서 스티커 붙일 수 있는지 탐색
  function check(x, y) {
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        const nx = x + i;
        const ny = y + j;

        if (sticker[i][j] === 1 && board[nx][ny] === 1) return false;
      }
    }

    return true;
  }

  // 스티커가 노트북의 범위를 초과하지 않는 선에서 붙일 수 있으면 붙이기
  function isAttach() {
    for (let i = 0; i < N - R + 1; i++) {
      for (let j = 0; j < M - C + 1; j++) {
        if (check(i, j)) {
          attach(i, j);
          return true;
        }
      }
    }

    return false; // 못 붙이면 False
  }

  // 스티커 붙이기
  function attach(x, y) {
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        const nx = x + i;
        const ny = y + j;

        if (sticker[i][j] === 1) board[nx][ny] = 1;
      }
    }
  }

  // 배열 90도 돌리기 (오른쪽)
  function rotate() {
    const arr = Array.from({ length: 10 }, () => Array(10));

    for (let i = 0; i < C; i++) {
      for (let j = 0; j < R; j++) {
        arr[i][R - 1 - j] = sticker[j][i];
      }
    }

    [R, C] = [C, R]; // 행, 열 변경

    return arr;
  }

  return [].concat(...board).filter((el) => el === 1).length;
}

console.log(soloution(N, M, K));
