const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16935.txt"
  )
  .toString()
  .trim()
  .split("\n");

const solution = function () {
  const [n, m, r] = input[0].split(" ").map(Number);
  const board = input.slice(1, -1).map((v) => v.split(" "));
  const commands = input[n + 1].split(" ");

  const go = [
    // 0번 연산은 없으므로 null로 채워줍시다.
    null,
    // 1번 연산: 상하 반전
    (board) => board.reverse(),
    // 2번 연산: 좌우 반전
    (board) => board.map((row) => row.reverse()),
    // 3번 연산: 오른쪽 90도 회전
    (board) => {
      const n = board.length,
        m = board[0].length;
      const rotate = Array.from({ length: m }, () => new Array(n));
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          rotate[i][j] = board[n - j - 1][i];
        }
      }
      return rotate;
    },
    // 4번 연산: 왼쪽 90도 회전 -> 오른쪽 90도 3번
    (board) => go[3](go[3](go[3](board))),
    // 5번 연산: 사 등분 오른쪽 90도 회전
    (board) => {
      const n = board.length / 2,
        m = board[0].length / 2;
      const top = board.slice(0, n),
        bottom = board.slice(n);
      const part1 = top.map((row) => row.slice(0, m)),
        part2 = top.map((row) => row.slice(m)),
        part3 = bottom.map((row) => row.slice(m)),
        part4 = bottom.map((row) => row.slice(0, m));

      return [
        ...part4.map((row, i) => [...row, ...part1[i]]),
        ...part3.map((row, i) => [...row, ...part2[i]]),
      ];
    },
    // 6번 연산: 사 등분 왼쪽 90도 회전 -> 사 등분 오른쪽 90도 3번
    (board) => go[5](go[5](go[5](board))),
  ];

  const ans = commands.reduce((ans, cmd) => go[cmd](ans), board);
  const ansString = ans.reduce((str, row) => (str += row.join(" ") + "\n"), "");
  console.log(ansString);
};

solution();
