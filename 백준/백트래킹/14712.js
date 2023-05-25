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
  // 왼, 위, 왼쪽 위 탐색하기 때문에 N+1 x M+1 배열 만들어주고 (1,1) 부터 탐색
  const board = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

  const nemmo = (row, col) => {
    if (col > M) {
      row += 1;
      col = 1;
    }
    if (row > N) return; // 좌표 다 탐색했으면 종료

    // 위, 왼쪽, 왼쪽 위가 모두 넴모인 경우가 아니면 -> 선택지는 2가지 : 1. 현재 자리 넴모 채우기, 2. 현재 자리 비우기
    if (
      !board[row - 1][col] ||
      !board[row][col - 1] ||
      !board[row - 1][col - 1]
    ) {
      board[row][col] = 1; // 넴모 채우기
      answer++; // 넴모 채우면 이전과 다른 상태이므로 가짓수 1증가
      nemmo(row, col + 1); // 다음 좌표로 이동
      board[row][col] = 0; // 백트래킹, 넴모 비우기
    }

    nemmo(row, col + 1); // 넴모 비운 상태로 다음 좌표
  };

  nemmo(1, 1);

  return answer;
}

console.log(solution(N, M) + 1);
