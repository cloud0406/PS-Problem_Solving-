const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9466.txt"
  )
  .toString()
  .trim()
  .split("\n");

let T = +input[0];
let index = 1;

let visited;
let done;
let arr;
let cnt = 0;

while (T > 0) {
  const n = +input[index];
  const temp = input[index + 1].split(" ").map((el) => +el);
  arr = [0, ...temp];
  visited = Array(n + 1).fill(false);
  done = Array(n + 1).fill(false); // 사이클 체크용

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;

    dfs(i);
  }

  console.log(n - cnt);

  // 정보 초기화
  index += 2;
  T -= 1;
  cnt = 0;
}

function dfs(node) {
  visited[node] = true;
  const next = arr[node];

  if (!visited[next]) dfs(next);
  //이미 방문했지만, 방문이 끝난 노드가 아니라면 사이클
  else if (!done[next]) {
    for (let i = next; i !== node; i = arr[i]) {
      cnt += 1; // 팀원 세기
    }

    cnt += 1; // 자기 자신 세기
  }

  done[node] = true; // 더 이상 방문 x
}
