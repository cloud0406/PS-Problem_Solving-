const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6086.txt"
  )
  .toString()
  .trim()
  .split("\n");

function bfs(start, process, flow) {
  const queue = [start];
  const visited = new Array(128).fill(-1);
  visited[start] = start;

  while (queue.length > 0) {
    const idx = queue.shift();
    for (let i = 65; i < 123; i++) {
      if (visited[i] === -1 && process[idx][i] - flow[idx][i] > 0) {
        queue.push(i);
        visited[i] = idx;
      }
    }
  }
  return visited;
}

function mergePipe(process) {
  const start = 65;
  const end = 90;
  const flow = Array.from({ length: 128 }, () => Array(128).fill(0));
  let result = 0;

  while (true) {
    const parent = bfs(start, process, flow);
    if (parent[end] === -1) {
      return result;
    }

    let minValue = 2147483647;
    let idx = end;

    while (idx !== start) {
      minValue = Math.min(
        minValue,
        process[parent[idx]][idx] - flow[parent[idx]][idx]
      );
      idx = parent[idx];
    }

    idx = end;
    while (idx !== start) {
      flow[parent[idx]][idx] += minValue;
      flow[idx][parent[idx]] -= minValue;
      idx = parent[idx];
    }

    result += minValue;
  }
}

function solution() {
  const n = Number(input[0]);
  const process = Array.from({ length: 128 }, () => Array(128).fill(0));

  for (let i = 1; i <= n; i++) {
    const [u, v, x] = input[i].split(" ");
    const uCode = u.charCodeAt(0);
    const vCode = v.charCodeAt(0);
    const capacity = Number(x);

    process[uCode][vCode] += capacity;
    process[vCode][uCode] += capacity;
  }

  console.log(mergePipe(process));
}

solution();
