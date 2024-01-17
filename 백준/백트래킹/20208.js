const input = require("fs")
  .readFileSync(
    process.platform === "linux"
      ? "./dev/stdin"
      : __dirname + "/input/20208.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m, h] = input[0].split(" ").map(Number);
const village = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(n, m, h, village) {
  let answer = 0;
  const milks = []; // 우유 위치 저장
  let hx = 0,
    hy = 0; // 집 위치

  // 처음 집 위치와 우유 위치 저장
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (village[i][j] === 1) {
        hx = i;
        hy = j;
      }
      if (village[i][j] === 2) {
        milks.push([i, j]);
      }
    }
  }

  const dfs = (jwx, jwy, hp, milk) => {
    for (const [x, y] of milks) {
      if (village[x][y] === 2) {
        // 현재까지 마시지 않은 우유인가
        const dist = Math.abs(jwx - x) + Math.abs(jwy - y); // 거리 : 가로 길이 + 세로 길이
        if (dist <= hp) {
          // 현재 위치(jwx,jwy)에서 우유가 있는 (x,y)까지 남은 체력으로 갈 수 있다면
          village[x][y] = 0; // 마신 우유 자리 비워줌
          dfs(x, y, hp + h - dist, milk + 1);
          village[x][y] = 2; // 백트래킹 복원
        }
      }
    }

    if (Math.abs(jwx - hx) + Math.abs(jwy - hy) <= hp) {
      answer = Math.max(answer, milk);
    }
  };

  dfs(hx, hy, m, 0);

  return answer;
}

console.log(solution(n, m, h, village));
