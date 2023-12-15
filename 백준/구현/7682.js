const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/7682.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  const checkValidate = (line, board) => {
    let O = 0;
    let X = 0;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === "O") O++;
      else if (line[i] === "X") X++;
    }

    if (X - O === 0 || X - O === 1);
    else return "invalid";

    let checkO = false;
    let checkX = false;

    // 'O'가 이겼는데 'X'가 더 진행한 경우
    for (let i = 0; i < 3; i++) {
      // 가로 확인.
      if (board[i][0] === "O" && board[i][1] === "O" && board[i][2] === "O") {
        checkO = true;
        if (X > O) return "invalid";
      }
    }
    for (let i = 0; i < 3; i++) {
      // 세로 확인.
      if (board[0][i] === "O" && board[1][i] === "O" && board[2][i] === "O") {
        checkO = true;
        if (X > O) return "invalid";
      }
    }
    if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
      // '\'대각.
      checkO = true;
      if (X > O) return "invalid";
    }
    if (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O") {
      // '/' 대각.
      checkO = true;
      if (X > O) return "invalid";
    }

    // 'X'가 이겼는데 'O'가 더 진행한 경우.
    for (let i = 0; i < 3; i++) {
      // 가로 확인.
      if (board[i][0] === "X" && board[i][1] === "X" && board[i][2] === "X") {
        checkX = true;
        if (checkO || X === O) return "invalid";
      }
    }
    for (let i = 0; i < 3; i++) {
      // 세로 확인.
      if (board[0][i] === "X" && board[1][i] === "X" && board[2][i] === "X") {
        checkX = true;
        if (checkO || X === O) return "invalid";
      }
    }
    if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
      // '\'대각.
      checkX = true;
      if (checkO || X === O) return "invalid";
    }
    if (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") {
      // '/' 대각.
      checkX = true;
      if (checkO || X === O) return "invalid";
    }

    // 중간에 끝난경우.
    if (!checkO && !checkX) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === ".") return "invalid";
      }
    }

    return "valid";
  };

  let answer = "";

  for (let testCase = 0; testCase < input.length; testCase++) {
    if (input[testCase].trim() === "end") break;
    let board = [];

    board.push(input[testCase].trim().slice(0, 3));
    board.push(input[testCase].trim().slice(3, 6));
    board.push(input[testCase].trim().slice(6, 9));
    answer += checkValidate(input[testCase].trim(), board) + "\n";
  }

  return console.log(answer.trim());
}

solution();
