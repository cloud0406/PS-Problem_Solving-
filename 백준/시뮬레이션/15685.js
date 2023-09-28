const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/15685.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const array = input.slice(1).map((v) => v.split(" ").map(Number));

const solution = (N, array) => {
  const board = Array.from({ length: 101 }, () => new Array(101).fill(0));

  const dx = [1, 0, -1, 0];
  const dy = [0, -1, 0, 1];

  const getDirList = (d, g) => {
    let answer = [d];
    for (let i = 1; i <= g; i++) {
      let temp = [];
      for (let i = answer.length - 1; i > -1; i--) {
        const previous = answer[i];
        const after = (previous + 1) % 4;
        temp.push(after);
      }

      answer.push(...temp);
    }
    return answer;
  };

  for (let i = 0; i < N; i++) {
    let [x, y, d, g] = array[i];
    board[y][x] = true;

    const dirList = getDirList(d, g);

    for (const dir of dirList) {
      [x, y] = [x + dx[dir], y + dy[dir]];
      board[y][x] = true;
    }
  }

  let answer = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (
        board[i][j] &&
        board[i + 1][j] &&
        board[i][j + 1] &&
        board[i + 1][j + 1]
      )
        answer++;
    }
  }

  return answer;
};

console.log(solution(N, array));
