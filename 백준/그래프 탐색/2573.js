const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2573.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const ice = input.map((v) => v.split(" ").map(Number));
const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solution(N, M, ice) {
  const melt = () => {
    ice.forEach((row, x) => {
      row.forEach((height, y) => {
        if (height > 0) {
          let count = 0;
          for (let i = 0; i < 4; i++) {
            const nx = x + direction[i][0];
            const ny = y + direction[i][1];

            if (ice[nx][ny] === 0) count++;
          }

          ice[x][y] -= count;

          if (ice[x][y] <= 0) ice[x][y] = -1;
        }
      });
    });
  };

  const dfs = (start, visited) => {
    const stack = [start];

    while (stack.length) {
      const [x, y] = stack.pop();

      for (let i = 0; i < 4; i++) {
        const nx = x + direction[i][0];
        const ny = y + direction[i][1];

        if (!visited[nx][ny] && ice[nx][ny] > 0) {
          visited[nx][ny] = true;
          stack.push([nx, ny]);
        }
      }
    }
  };

  const changeMinusToZero = () => {
    ice.forEach((row, x) => {
      row.forEach((height, y) => {
        if (height === -1) {
          ice[x][y] = 0;
        }
      });
    });
  };

  let year = 0;

  while (true) {
    const visited = [...Array(N)].map(() => Array(M).fill(false));
    let count = 0;
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (!visited[i][j] && ice[i][j] > 0) {
          visited[i][j] = true;
          dfs([i, j], visited);
          count++;
        }
      }
    }
    if (count >= 2) {
      console.log(year);
      break;
    } else if (count === 0) {
      console.log(0);
      break;
    }

    melt();
    changeMinusToZero();
    year++;
  }
}

solution(N, M, ice);
