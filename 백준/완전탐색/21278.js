const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21278.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const graph = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, graph) {
  const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

  for (let [from, to] of graph) {
    dist[from][to] = 1;
    dist[to][from] = 1;
  }

  dist.forEach((_, idx) => (dist[idx][idx] = 0));

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      for (let k = 1; k <= N; k++) {
        if (dist[j][k] > dist[j][i] + dist[i][k]) {
          dist[j][k] = dist[j][i] + dist[i][k];
        }
      }
    }
  }

  let answer = Infinity;
  let answers = [];

  for (let first = 1; first <= N; first++) {
    for (let second = first + 1; second <= N; second++) {
      let time = 0;

      for (let current = 1; current <= N; current++) {
        time += Math.min(dist[first][current], dist[second][current]) * 2;
      }

      if (answer > time) {
        answer = time;
        answers = [first, second, answer];
      }
    }
  }

  return answers.join(" ");
}

console.log(solution(N, M, graph));
