const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18430.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  let answer = 0;
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  const dfs = (L, total) => {
    // 좌표 탐색 완료
    if (L === N * M) return (answer = Math.max(answer, total));

    // L 1씩 늘려가며 현재 좌표 찾기
    let y = Math.floor(L / M);
    let x = Math.floor(L % M);

    // 4개의 모양 탐색
    if (!visited[y][x]) {
      // ㄱ자
      if (y + 1 < N && x - 1 >= 0 && !visited[y + 1][x] && !visited[y][x - 1]) {
        visited[y][x] = true;
        visited[y + 1][x] = true;
        visited[y][x - 1] = true;
        dfs(L + 1, total + arr[y + 1][x] + arr[y][x - 1] + arr[y][x] * 2);
        visited[y][x] = false;
        visited[y + 1][x] = false;
        visited[y][x - 1] = false;
      }

      if (y + 1 < N && x + 1 < M && !visited[y + 1][x] && !visited[y][x + 1]) {
        visited[y][x] = true;
        visited[y + 1][x] = true;
        visited[y][x + 1] = true;
        dfs(L + 1, total + arr[y + 1][x] + arr[y][x + 1] + arr[y][x] * 2);
        visited[y][x] = false;
        visited[y + 1][x] = false;
        visited[y][x + 1] = false;
      }

      if (
        y - 1 >= 0 &&
        x - 1 >= 0 &&
        !visited[y - 1][x] &&
        !visited[y][x - 1]
      ) {
        visited[y][x] = true;
        visited[y - 1][x] = true;
        visited[y][x - 1] = true;
        dfs(L + 1, total + arr[y - 1][x] + arr[y][x - 1] + arr[y][x] * 2);
        visited[y][x] = false;
        visited[y - 1][x] = false;
        visited[y][x - 1] = false;
      }

      // ㄴ자
      if (y - 1 >= 0 && x + 1 < M && !visited[y - 1][x] && !visited[y][x + 1]) {
        visited[y][x] = true;
        visited[y - 1][x] = true;
        visited[y][x + 1] = true;
        dfs(L + 1, total + arr[y - 1][x] + arr[y][x + 1] + arr[y][x] * 2);
        visited[y][x] = false;
        visited[y - 1][x] = false;
        visited[y][x + 1] = false;
      }
    }

    // 4개 모두 안 될경우 그냥 다음 좌표로 이동
    dfs(L + 1, total);
  };

  dfs(0, 0);

  return answer;
}

console.log(solution(N, M, arr));
