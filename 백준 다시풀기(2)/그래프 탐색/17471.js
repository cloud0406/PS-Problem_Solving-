const input = require("fs")
  .readFileSync(
    process.platform === "linux"
      ? "./dev/stdin"
      : __dirname + "/input/17471.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const population = input.shift().split(" ").map(Number);

function solution(N, population) {
  const bridge = input.map((v) =>
    v
      .split(" ")
      .filter((x, i) => i != 0)
      .map((y) => y - 1)
  );
  let answer = Infinity;

  for (let i = 1; i < (1 << N) - 1; i++) {
    let visited = new Array(N).fill(null);
    let check = [false, false];

    for (let j = 0; j < N; j++) {
      if (check[1] && check[0]) break;

      if (i & (1 << j) && !check[1]) {
        check[1] = true;
        let q = [];
        q.push(j);
        visited[j] = 1;

        while (q.length > 0) {
          const now = q.shift();
          for (let k = 0; k < bridge[now].length; k++) {
            const next = bridge[now][k];
            if (i & (1 << next) && !visited[next]) {
              q.push(next);
              visited[next] = 1;
            }
          }
        }
      } else if (!(i & (1 << j)) && !check[0]) {
        check[0] = true;
        let q = [];
        q.push(j);
        visited[j] = 2;
        while (q.length > 0) {
          const now = q.shift();
          for (let k = 0; k < bridge[now].length; k++) {
            const next = bridge[now][k];
            if (!(i & (1 << next)) && !visited[next]) {
              q.push(next);
              visited[next] = 2;
            }
          }
        }
      }
    }

    if (visited.length == visited.filter((v) => v != null).length) {
      let team1 = 0;
      let team2 = 0;
      visited.forEach((v, i) => {
        if (v == 1) team1 += population[i];
        else team2 += population[i];
      });
      const diff = Math.abs(team1 - team2);

      if (answer > diff) answer = diff;
    }
  }

  if (answer == Infinity) answer = -1;

  return answer;
}

console.log(solution(N, population));
