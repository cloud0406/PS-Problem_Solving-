const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1941.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(""));

function solution(input) {
  let answer = 0;

  // 선택한 7명이 인접한지 체크
  const dfs = (group) => {
    const direction = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    const visited = Array.from({ length: 5 }, () => Array(5).fill(false));
    // 인자로 온 선택된 학생의 좌표 배열 방문 처리
    for (let [x, y] of group) {
      visited[x][y] = true;
    }

    // 첫 번째 좌표부터 스택에 넣고 방문한 곳은 재방문하지 않기 위해 false로 변경
    const [x, y] = group[0];
    visited[x][y] = false;
    const stack = [[x, y]];

    let pass = 0;
    while (stack.length !== 0) {
      const [x, y] = stack.pop();

      // 인접한지 체크
      for (let [dx, dy] of direction) {
        if (x + dx >= 0 && x + dx < 5 && y + dy >= 0 && y + dy < 5) {
          if (visited[x + dx][y + dy]) {
            stack.push([x + dx, y + dy]);
            visited[x + dx][y + dy] = false; // 재방문하지 않기 위해 false로 변경
          }
        }
      }

      pass++; // 처음 인자로 들어온 group 배열의 요소 개수 만큼 증가하게 됨
    }

    if (pass === 7) return true;
    return false;
  };

  // 7명 선택 -> 선택 후 인접한지 체크 후 답 증가
  // number는 이다솜파 학생 수
  const select7 = (stack, number) => {
    const len = stack.length;

    if (len - number > 3) return; // 임도연파 학생수가 4명 이상이면 종료

    // 7명 선택, 이다솜파 4명이상, 7명 인접해있으면 답 증가
    if (len === 7) {
      if (number >= 4) {
        if (dfs([...stack])) {
          answer++;
        }
      }
      return;
    }

    const [x, y] = stack[len - 1] || [-1, -1];

    for (let row = 0; row <= 4; row++) {
      for (let col = 0; col <= 4; col++) {
        //   좌측 상단에서 우측 하단으로 순차적으로 선택
        if ((row === x && col > y) || row > x) {
          // 이다솜파 학생일 경우와 아닐 경우 나눠서 number(이다솜파 학생 수) 처리
          if (input[row][col] === "S")
            select7([...stack, [row, col]], number + 1);
          else select7([...stack, [row, col]], number);
        }
      }
    }
  };

  select7([], 0);

  return answer;
}

console.log(solution(input));
