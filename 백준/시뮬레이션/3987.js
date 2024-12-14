const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/3987.txt"
  )
  .toString()
  .trim()
  .split("\n");

const direction = ["U", "R", "D", "L"];
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
const P = [1, 0, 3, 2],
  Q = [3, 2, 1, 0];

const [N, M] = input[0].split(" ").map(Number);
const A = [["C"].concat(Array(M).fill("C"), ["C"])];
for (let i = 1; i <= N; i++) {
  A.push(["C"].concat(input[i].trim().split(""), ["C"]));
}
A.push(["C"].concat(Array(M).fill("C"), ["C"]));

const [PR, PC] = input[N + 1].split(" ").map(Number);

function solve() {
  let max_time = 0,
    max_dir = 0;
  for (let sd = 0; sd < 4; sd++) {
    let r = PR,
      c = PC,
      d = sd,
      time = 1;

    while (true) {
      if (A[r + dr[d]][c + dc[d]] === "C") break;

      r += dr[d];
      c += dc[d];

      if (A[r][c] === "/") {
        d = P[d];
      } else if (A[r][c] === "\\") {
        d = Q[d];
      }

      time++;

      if (r === PR && c === PC && d === sd) {
        console.log(direction[sd]);
        console.log("Voyager");
        return;
      }
    }

    if (max_time < time) {
      max_time = time;
      max_dir = sd;
    }
  }

  console.log(direction[max_dir]);
  console.log(max_time);
}

solve();
