const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1719.txt"
  )
  .toString()
  .trim()
  .split("\n");

const floyd = (n, city, answer) => {
  let routeTable = "";

  // floyd
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (city[i][j] > city[i][k] + city[k][j]) {
          city[i][j] = city[i][k] + city[k][j];
          answer[i][j] = answer[i][k]; // k를 거쳐서 가는것이 더 빠르다면 answer 배열을 갱신해야한다.
        }
      }
    }
  }

  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= n; col++) {
      if (row === col) routeTable += "-" + " ";
      else {
        routeTable += answer[row][col] + " ";
      }
    }
    routeTable += "\n";
  }
  console.log(routeTable);
};

function solution() {
  const [n, m] = input[0].split(" ").map(Number);
  let city = new Array(n + 1)
    .fill(null)
    .map((_) => new Array(n + 1).fill(Infinity));
  let answer = new Array(n + 1)
    .fill(null)
    .map((_) => new Array(n + 1).fill([]));

  for (let i = 1; i <= m; i++) {
    let [to, from, weigth] = input[i].split(" ").map(Number);
    city[to][from] = weigth;
    city[from][to] = weigth;
    answer[to][from] = from;
    answer[from][to] = to;
  }

  floyd(n, city, answer);
}
solution();
