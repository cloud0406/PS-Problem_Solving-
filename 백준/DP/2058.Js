const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2058.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const atom_e = input.slice(1, N + 1).map(Number); // 에너지 준위 리스트
const plus = input.slice(N + 1, N + 1 + M).map(Number); // 양성자 크기 배열

const visited = {};
const dp = {};

for (const atom of atom_e) {
  visited[atom] = false;
  dp[atom] = [0, 0];
}

function dfs(cur_atom) {
  visited[cur_atom] = true;
  dp[cur_atom][1] = cur_atom; // 현재 노드를 가져가는 경우에 그 값을 설정

  for (const gap of plus) {
    // 가능한 다음 위치 탐색
    for (const next_atom of [cur_atom + gap, cur_atom - gap]) {
      if (visited[next_atom] === false && visited.hasOwnProperty(next_atom)) {
        dfs(next_atom);

        dp[cur_atom][0] += Math.max(dp[next_atom][1], dp[next_atom][0]);
        dp[cur_atom][1] += dp[next_atom][0];
      }
    }
  }
}

dfs(atom_e[0]);

console.log(Math.max(dp[atom_e[0]][0], dp[atom_e[0]][1]));
