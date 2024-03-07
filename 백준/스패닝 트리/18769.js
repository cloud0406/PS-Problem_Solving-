const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18769.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  let answer = [];
  let idx = 0;

  const T = +input[idx++];

  for (let i = 0; i < T; i++) {
    const [R, C] = input[idx++].split(" ").map(Number);

    let parents = Array.from({ length: R * C }, (_, idx) => idx);

    const graph = [];
    // 행 좌우 비용 연결
    for (let i = 0; i < R; i++) {
      const rowCost = input[idx++].split(" ").map(Number);

      for (let j = 0; j < C - 1; j++) {
        graph.push([rowCost[j], i * C + j, i * C + j + 1]); // 비용, 연결된 두 좌표
      }
    }

    // 열 위아래 비용 연결
    for (let i = 0; i < R - 1; i++) {
      const colCost = input[idx++].split(" ").map(Number);

      for (let j = 0; j < C; j++) {
        graph.push([colCost[j], i * C + j, (i + 1) * C + j]);
      }
    }

    graph.sort((a, b) => a[0] - b[0]); // 비용순 오름 차순

    const findParent = (x) => {
      if (parents[x] !== x) parents[x] = findParent(parents[x]);
      return parents[x];
    };

    const union = (a, b) => {
      a = findParent(a);
      b = findParent(b);

      if (a < b) parents[b] = a;
      else parents[a] = b;
    };

    let minCost = 0;
    // 두 정점 a,b가 같은 집합에 속해있지 않다면 두 정점을 연결
    for (let [cost, a, b] of graph) {
      if (findParent(a) !== findParent(b)) {
        union(a, b);
        minCost += cost;
      }
    }
    answer.push(minCost);
  }

  return answer.join("\n");
}

console.log(solution());
