const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1516.txt"
  )
  .toString()
  .split("\n");

const N = +input.shift();
const buildings = input.map((line) =>
  line
    .split(" ")
    .map(Number)
    .filter((x) => x !== -1)
);

function solution(N, buildings) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const inDegree = Array(N + 1).fill(0);
  const buildTime = Array(N + 1).fill(0);
  const totalTime = Array(N + 1).fill(0);
  const queue = [];

  // 건물 정보 처리
  for (let i = 0; i < N; i++) {
    const currentBuilding = i + 1;
    buildTime[currentBuilding] = buildings[i][0];

    // 선행 건물 관계 설정
    for (let j = 1; j < buildings[i].length; j++) {
      const prevBuilding = buildings[i][j];
      graph[prevBuilding].push(currentBuilding);
      inDegree[currentBuilding]++;
    }
  }

  // 시작 건물 찾기 (선행 조건이 없는 건물)
  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      totalTime[i] = buildTime[i];
    }
  }

  while (queue.length) {
    const current = queue.shift();

    for (const next of graph[current]) {
      inDegree[next]--;
      totalTime[next] = Math.max(
        totalTime[next],
        totalTime[current] + buildTime[next]
      );

      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    console.log(totalTime[i]);
  }
}

solution(N, buildings);
