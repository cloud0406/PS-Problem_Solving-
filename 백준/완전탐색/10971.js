const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10971.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const city = [];
for (let item of input) {
  city.push(item.split(" ").map((e) => +e));
}

function solution(n, city) {
  const answer = [];
  const cost = [];
  const visited = new Array(n).fill(false);

  const dfs = (cnt, curCity) => {
    // 다시 원래의 도시로 돌아 올 수 있게 하기 위해서
    if (cnt === n - 1) visited[0] = false;
    if (cnt === n) {
      // 모든 도시를 방문했다면 -> 누적한 비용의 합을 answer에 저장
      if (visited.every((e) => e === true)) {
        answer.push(cost.reduce((a, c) => a + c));
      }
    } else {
      for (let i = 0; i < n; i++) {
        if (city[curCity][i] === 0) continue; // 갈 수 없는 경우, 현재 위치인 경우 건너뜀
        if (!visited[i]) {
          visited[i] = true;
          cost.push(city[curCity][i]); // 비용을 cost 배열에 누적
          dfs(cnt + 1, i);
          cost.pop();
          visited[i] = false;
        }
      }
    }
  };

  visited[0] = true;
  dfs(0, 0);

  return Math.min(...answer);
}

console.log(solution(n, city));
