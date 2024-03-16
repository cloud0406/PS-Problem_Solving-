const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16928.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
let board = new Array(101).fill(null).map((_, idx) => idx);

// 사다리와 뱀
for (let i = 1; i <= n + m; i++) {
  let [from, to] = input[i].split(" ").map(Number);
  board[from] = to;
}

function solution(n, m, borad) {
  let visited = new Array(101).fill(-1); // 굴린횟수

  let q = [];
  q.push(1); // 시작칸은 1
  visited[1] = 0;

  while (q.length !== 0) {
    let cur = q.shift();

    for (let dice = 1; dice <= 6; dice++) {
      let next = cur + dice; // 주사위를 굴려서 나아갈 수 있는 칸의 번호.

      // 100을 넘어가는 일은 없다.
      if (next > 100) continue;

      next = borad[next]; // 해당칸에 뱀이나 사다리가 있다면 이용해야만 한다.

      // 아직 방문한적 없는 칸
      if (visited[next] === -1) {
        visited[next] = visited[cur] + 1;
        q.push(next);
      }
    }
  }

  return visited[100];
}

console.log(solution(n, m, board));
