const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17142.txt"
  )
  .toString()
  .trim()
  .split("\n");
let idx = 0;

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

let [n, m] = input[idx++].split(" ").map(Number);
let map = input.slice(1).map((i) => i.split(" ").map(Number));

let virus = [];
let virus_visited;
let ans = Infinity;
let cnt_zero = 0;

const bfs = () => {
  const queue = [];
  let visited = Array.from({ length: n }, () => Array(n).fill(-1));

  for (let i = 0; i < virus.length; ++i) {
    // pick에서 선택된 바이러스들의 위치를 queue에 넣고, 활성바이러스 0으로 표시
    if (virus_visited[i]) {
      queue.push([virus[i][0], virus[i][1]]);
      visited[virus[i][0]][virus[i][1]] = 0;
    }
  }

  let check = 0;
  let time = 0;

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < 4; ++i) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      // 해당 좌표 벽인 경우도 넘김
      if (nx < 0 || nx >= n || ny < 0 || ny >= n || map[nx][ny] === 1) continue;

      // 벽 아니고, 방문안한 곳 찾아서 인접 바이러스 +1 처리
      if (visited[nx][ny] === -1) {
        visited[nx][ny] = visited[cx][cy] + 1;

        // 기존 지도에서 빈칸이었던 곳 개수 더함
        if (map[nx][ny] === 0) {
          check++;
          time = visited[nx][ny];
        }

        queue.push([nx, ny]);
      }
    }
  }

  // 처음 세주었던 빈 칸 개수와 bfs통해 확산 시킨 빈 칸 개수가 같아지면 바이러스 모두 퍼졌다는 뜻
  if (check === cnt_zero) ans = Math.min(ans, time);
};

// 총 바이러스 개수에서 M개를 뽑고 -> bfs로 바이러스 퍼뜨리기
const pick = (k, cnt) => {
  if (cnt === m) {
    bfs();
    return;
  }

  // 백트래킹으로 바이러스 3개 뽑기
  for (let i = k; i < virus.length; i++) {
    if (!virus_visited[i]) {
      virus_visited[i] = true;
      pick(i + 1, cnt + 1);
      virus_visited[i] = false;
    }
  }
};

function main() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === 2) virus.push([i, j]); // 바이러스 위치 저장
      if (map[i][j] === 0) cnt_zero++; // 빈 칸 개수 저장
    }
  }

  virus_visited = Array(virus.length).fill(false);

  pick(0, 0);

  console.log(ans === Infinity ? -1 : ans);
}

main();
