const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/5549.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number);
const K = +input[1];

function solution() {
  let answer = "";

  let Jsum = new Array(1001).fill(null).map((_) => new Array(1001).fill(0));
  let Osum = new Array(1001).fill(null).map((_) => new Array(1001).fill(0));
  let Isum = new Array(1001).fill(null).map((_) => new Array(1001).fill(0));

  const sum = (map) => {
    for (let i = 1; i <= M; i++) {
      for (let j = 1; j <= N; j++) {
        if (map[i][j] === "J") {
          Jsum[i][j] = Jsum[i - 1][j] + Jsum[i][j - 1] - Jsum[i - 1][j - 1] + 1;
          Osum[i][j] = Osum[i - 1][j] + Osum[i][j - 1] - Osum[i - 1][j - 1];
          Isum[i][j] = Isum[i - 1][j] + Isum[i][j - 1] - Isum[i - 1][j - 1];
        } else if (map[i][j] === "O") {
          Jsum[i][j] = Jsum[i - 1][j] + Jsum[i][j - 1] - Jsum[i - 1][j - 1];
          Osum[i][j] = Osum[i - 1][j] + Osum[i][j - 1] - Osum[i - 1][j - 1] + 1;
          Isum[i][j] = Isum[i - 1][j] + Isum[i][j - 1] - Isum[i - 1][j - 1];
        } else if (map[i][j] === "I") {
          Jsum[i][j] = Jsum[i - 1][j] + Jsum[i][j - 1] - Jsum[i - 1][j - 1];
          Osum[i][j] = Osum[i - 1][j] + Osum[i][j - 1] - Osum[i - 1][j - 1];
          Isum[i][j] = Isum[i - 1][j] + Isum[i][j - 1] - Isum[i - 1][j - 1] + 1;
        }
      }
    }
  };

  const makeAnswer = (a, b, c, d) => {
    let J = 0,
      O = 0,
      I = 0;
    J = Jsum[c][d] - Jsum[c][b - 1] - Jsum[a - 1][d] + Jsum[a - 1][b - 1];
    O = Osum[c][d] - Osum[c][b - 1] - Osum[a - 1][d] + Osum[a - 1][b - 1];
    I = Isum[c][d] - Isum[c][b - 1] - Isum[a - 1][d] + Isum[a - 1][b - 1];

    return `${J} ${O} ${I}`;
  };

  let map = [[]];

  for (let i = 1; i <= M; i++) {
    map.push(("A" + input[i + 1]).split(""));
  }

  sum(map);

  for (let i = M + 2; i < M + 2 + K; i++) {
    let [a, b, c, d] = input[i].split(" ").map(Number);
    answer += makeAnswer(a, b, c, d) + "\n";
  }

  console.log(answer.trim());
}

solution();
