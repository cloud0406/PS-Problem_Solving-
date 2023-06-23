const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2412.txt"
  )
  .toString()
  .split("\n");

const [n, T] = input[0].split(" ").map(Number);

function solution(n, T) {
  let pos = {};
  // 좌표들 -1로 초기화 (방문 x 표시)
  for (let i = 1; i <= n; i++) {
    pos[input[i]] = -1;
  }

  pos["0 0"] = 0;

  let queue = [[0, 0]];
  while (queue.length) {
    const [x, y] = queue.shift();

    // 정상 등반
    if (y === T) {
      console.log(pos[x + " " + y]);
      return;
    }

    // 조건에 맞게 좌표 차이가 2이내인 좌표가 있는지, 해당 좌표를 아직 방문한적 없는지 탐색
    for (let nx = x - 2; nx < x + 3; nx++) {
      for (let ny = y - 2; ny < y + 3; ny++) {
        if (pos[nx + " " + ny] && pos[nx + " " + ny] === -1) {
          pos[nx + " " + ny] = pos[x + " " + y] + 1; // 탐색할 수 있는 좌표 있고 방문안한 좌표면 이동 횟수 +1
          queue.push([nx, ny]);
        }
      }
    }
  }

  // 정상 못 오를 경우
  console.log(-1);
}

solution(n, T);
