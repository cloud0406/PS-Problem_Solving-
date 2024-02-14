const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16938.txt"
  )
  .toString()
  .split("\n");

const [N, L, R, X] = input[0].split(" ").map(Number);
const problems = input[1].split(" ").map(Number);

function solution(N, L, R, X, problems) {
  let answer = 0;
  const pick = [];
  const visited = new Array(N).fill(false);

  const check = () => {
    const sum = pick.reduce((acc, cur) => acc + cur, 0);

    if (pick.length < 2) return false; // 2개 이상 선택
    if (sum < L || sum > R) return false; // 문제합 L이상, R이하
    if (Math.max(...pick) - Math.min(...pick) < X) return false; // 난이도 차이 X이상

    return true;
  };

  const dfs = (start, cnt) => {
    if (cnt === N) return;

    for (let i = start; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      pick.push(problems[i]);

      if (check()) answer++;

      dfs(i + 1, cnt + 1);

      visited[i] = false;
      pick.pop();
    }
  };

  dfs(0, 0);

  return answer;
}

console.log(solution(N, L, R, X, problems));
