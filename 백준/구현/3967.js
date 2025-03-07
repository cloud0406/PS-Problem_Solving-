const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/3967.txt"
  )
  .toString()
  .trim()
  .split("\n");

const board = input.map((line) => line.split(""));
const star = new Array(12).fill("");
const visited = new Map();

// 알파벳 위치 찾기
let idx = 0;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 9; j++) {
    if (/[A-Zx]/.test(board[i][j])) {
      star[idx] = board[i][j];
      idx++;
      if (board[i][j] !== "x") {
        visited.set(board[i][j], true);
      }
    }
  }
}

const apb = Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i));

// 각 줄의 합이 26이 되는지 확인
function check() {
  const sum = "A".charCodeAt(0) * 4 + 22;

  if (
    star[0].charCodeAt(0) +
      star[2].charCodeAt(0) +
      star[5].charCodeAt(0) +
      star[7].charCodeAt(0) !==
    sum
  )
    return false;

  if (
    star[1].charCodeAt(0) +
      star[2].charCodeAt(0) +
      star[3].charCodeAt(0) +
      star[4].charCodeAt(0) !==
    sum
  )
    return false;

  if (
    star[0].charCodeAt(0) +
      star[3].charCodeAt(0) +
      star[6].charCodeAt(0) +
      star[10].charCodeAt(0) !==
    sum
  )
    return false;

  if (
    star[7].charCodeAt(0) +
      star[8].charCodeAt(0) +
      star[9].charCodeAt(0) +
      star[10].charCodeAt(0) !==
    sum
  )
    return false;

  if (
    star[1].charCodeAt(0) +
      star[5].charCodeAt(0) +
      star[8].charCodeAt(0) +
      star[11].charCodeAt(0) !==
    sum
  )
    return false;

  if (
    star[4].charCodeAt(0) +
      star[6].charCodeAt(0) +
      star[9].charCodeAt(0) +
      star[11].charCodeAt(0) !==
    sum
  )
    return false;

  return true;
}

let ans = [];
let flag = false;

function dfs(cur, arr) {
  if (flag) return;

  if (cur === 12) {
    if (check()) {
      flag = true;
      ans = [...arr];
    }
    return;
  }

  if (arr[cur] !== "x") {
    dfs(cur + 1, arr);
  } else {
    for (const ch of apb) {
      if (!visited.get(ch)) {
        arr[cur] = ch;
        visited.set(ch, true);
        dfs(cur + 1, arr);
        visited.set(ch, false);
        arr[cur] = "x";
        if (flag) return;
      }
    }
  }
}

// 마법의 별 찾기
dfs(0, star);

idx = 0;
let result = "";
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 9; j++) {
    if (/[A-Zx]/.test(board[i][j])) {
      board[i][j] = ans[idx++];
    }
    result += board[i][j];
  }
  result += "\n";
}

console.log(result.trim());
