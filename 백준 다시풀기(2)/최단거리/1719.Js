const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1719.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  const [n, m] = input[0].split(" ").map(Number);

  const city = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));
  const minDist = Array.from({ length: n + 1 }, () => Array(n + 1).fill([]));

  for (let i = 1; i <= m; i++) {
    let [from, to, weight] = input[i].split(" ").map(Number);

    // 집하장간 시간 저장
    city[from][to] = weight;
    city[to][from] = weight;

    // 최단 경로로 가기 위해 제일 먼저 가야하는 곳 저장
    minDist[from][to] = to;
    minDist[to][from] = from;
  }

  // 플로이드 와샬
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (city[i][j] > city[i][k] + city[k][j]) {
          city[i][j] = city[i][k] + city[k][j];
          minDist[i][j] = minDist[i][k];
        }
      }
    }
  }

  let answer = "";

  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= n; col++) {
      if (row === col) answer += "-" + " ";
      else answer += minDist[row][col] + " ";
    }

    answer += "\n";
  }

  console.log(answer);
}

solution();
