const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15591.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [N, Q] = input[line++].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N - 1; i++) {
  const [p, q, r] = input[line++].split(" ").map(Number);
  graph[p].push([q, r]);
  graph[q].push([p, r]);
}

for (let i = 0; i < Q; i++) {
  let answer = 0;

  const [k, v] = input[line++].split(" ").map(Number);
  const visited = Array(N + 1).fill(false);
  visited[v] = true;

  const queue = [[v, Infinity]];
  let idx = 0;

  while (idx < queue.length) {
    const [curr, usado] = queue[idx++];

    for (const [next, nextUsado] of graph[curr]) {
      const min = Math.min(usado, nextUsado);

      if (min >= k && !visited[next]) {
        answer++;
        queue.push([next, min]);
        visited[next] = true;
      }
    }
  }

  console.log(answer);
}
