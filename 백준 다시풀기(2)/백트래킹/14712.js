const [N, M] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14712.txt"
  )
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution(N, M) {
  let answer = 0;
  // N+1 x M+1 배열 만들어주고 (1,1) 부터 왼, 위, 왼쪽 위 탐색
  const board = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

  // 한 자리씩 채워가며 2x2 넴모가 되지 않는 경우를 찾음
  const nemmo = (row, col) => {
    if (col > M) {
      row++;
      col = 1;
    }
    if (row > N) return;

    // 위, 왼쪽, 왼쪽 위가 모두 넴모인 경우가 아닐 경우 -> 1. 현재 자리 넴모 채우기, 2. 현재 자리 비우기
    // 만약 3방향 다 넴모일 경우 현재 자리 까지 넴모면 지워지므로 자리 비우고 넘어감
    if (
      !board[row - 1][col] ||
      !board[row][col - 1] ||
      !board[row - 1][col - 1]
    ) {
      board[row][col] = 1;
      answer++; // 넴모 채우면 이전과 다른 상태이므로 가짓수 1증가
      nemmo(row, col + 1); // 다음 좌표로 이동
      board[row][col] = 0;
    }

    nemmo(row, col + 1); // 넴모 비운 상태로 다음 좌표
  };

  nemmo(1, 1);

  return answer;
}

console.log(solution(N, M) + 1);
