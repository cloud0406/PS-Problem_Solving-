const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1277.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, W] = input[0].split(" ").map(Number);
const M = +input[1];
const arr = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(N, W, M, arr) {
  const vertices = arr.slice(0, N);
  const edges = arr.slice(N);

  const graph = [];

  for (let v = 1; v <= N; v++) {
    graph[v] = [];
    graph[v][v] = true;
  }

  edges.forEach((edge) => {
    const [v1, v2] = edge;
    graph[v1][v2] = true;
    graph[v2][v1] = true;
  });

  // 다익스트라
  const dist = new Array(N + 1).fill(Infinity);
  dist[0] = null; // 사용 x
  dist[1] = 0;

  const check = [];

  for (let _i = 1; _i <= N; _i++) {
    // 근처 정점 찾기
    let closest;
    let minDist = Infinity;

    for (let v = 1; v <= N; v++) {
      if (!check[v] && dist[v] < minDist) {
        closest = v;
        minDist = dist[v];
      }
    }

    check[closest] = true;

    for (let v = 1; v <= N; v++) {
      const isEdgeLeft = graph[closest][v];
      const diagonalDist = Math.sqrt(
        Math.pow(Math.abs(vertices[closest - 1][0] - vertices[v - 1][0]), 2) +
          Math.pow(Math.abs(vertices[closest - 1][1] - vertices[v - 1][1]), 2)
      );

      if (isEdgeLeft) {
        if (minDist < dist[v]) dist[v] = minDist;
      } else {
        if (minDist + diagonalDist < dist[v]) dist[v] = minDist + diagonalDist;
      }
    }
  }

  return Math.floor(dist[N] * 1000);
}

console.log(solution(N, W, M, arr));
