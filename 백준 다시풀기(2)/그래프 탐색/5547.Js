const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/5547.txt"
  )
  .toString()
  .trim()
  .split("\n");

const STEP = {
  // 홀수 행이면 비교해야 되는 대상 왼쪽, 오른쪽, 아래 , 오른쪽 아래, 위쪽, 오른쪽 위쪽
  odd: [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [1, -1],
    [1, 1],
  ],
  // 짝수 행이면 비교해야 되는 대상 왼쪽 위, 위 ,왼쪽, 오른쪽, 왼쪽 아래, 아래
  even: [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
  ],
};

function soloution(input) {
  let answer = 0;
  const [W, H] = input[0].split(" ").map((v) => +v);
  // 겉을 외부로 한 바퀴 감싸기 위해 행, 열보다 +2 크게 생성 (위, 아래, 왼쪽, 오른쪽 빈 공간 추가)
  const graph = Array.from({ length: H + 2 }, () => Array(W + 2).fill(0));

  // 그래프 채우기
  input
    .splice(1)
    .forEach((row, i) =>
      row.split(" ").forEach((col, j) => (graph[i + 1][j + 1] = +col))
    );

  // 0,0 부터 시작
  const stack = [[0, 0]];

  // 건물 아닌 곳의 좌표를 탐색하며 방문 표시해주고, 현재위치에서 6면을 탐색하여 건물인 곳을 만나면 벽면+1씩 해줌
  while (stack.length) {
    const [x, y] = stack.pop();
    if (graph[y][x] === -1) continue;

    graph[y][x] = -1; // 방문한 곳 -1로 체크

    // 현재 짝수행인지 홀수행인지에 따라 비교해야할 좌표 선택
    const step = y % 2 === 0 ? STEP.even : STEP.odd;

    for (const [stepX, stepY] of step) {
      const [destX, destY] = [x + stepX, y + stepY];
      if (destX < 0 || destY < 0 || destX > W + 1 || destY > H + 1) continue;

      if (graph[destY][destX] === 1) answer += 1; // 건물만나면 +1
      else if (graph[destY][destX] === 0) stack.push([destX, destY]); // 건물 아닌 곳 스택에 추가
    }
  }

  return answer;
}

console.log(soloution(input));
