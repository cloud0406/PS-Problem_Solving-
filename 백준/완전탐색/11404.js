const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11404.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const m = +input[1];
const bus = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(n, m, bus) {
  const distance = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );

  bus.forEach(
    (bus) =>
      (distance[bus[0]][bus[1]] = Math.min(distance[bus[0]][bus[1]], bus[2]))
  );

  for (let k = 1; k < n + 1; k++) {
    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        if (i !== j && distance[i][k] + distance[k][j] < distance[i][j]) {
          distance[i][j] = distance[i][k] + distance[k][j];
        }
      }
    }
  }

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (distance[i][j] === Infinity) distance[i][j] = 0;
    }
  }

  distance.slice(1).map((t) => {
    console.log(t.slice(1).join(" "));
  });
}

solution(n, m, bus);
