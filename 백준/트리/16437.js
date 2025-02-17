const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16437.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const islands = Array(N + 1)
  .fill()
  .map(() => ["", 0]);
const tree = Array(N + 1)
  .fill()
  .map(() => []);

for (let i = 1; i < N; i++) {
  const [animal, count, nextIsland] = input[i].split(" ");
  islands[i + 1] = [animal, +count];
  tree[+nextIsland].push(i + 1);
}

function dfs(now) {
  let sheep = 0;

  // 살아남은 양의 수를 계산
  for (const next of tree[now]) {
    sheep += dfs(next);
  }

  // 현재 섬에 늑대가 있는 경우
  if (islands[now][0] === "W") {
    const wolves = islands[now][1];
    sheep = Math.max(0, sheep - wolves); // 양을 잡아먹음
  }
  // 현재 섬에 양이 있는 경우
  else if (islands[now][0] === "S") {
    sheep += islands[now][1]; // 현재 섬의 양을 더함
  }

  return sheep;
}

console.log(dfs(1));
