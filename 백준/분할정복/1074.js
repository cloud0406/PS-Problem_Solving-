const [N, r, c] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1074.txt"
  )
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution(N, r, c) {
  let answer = 0;

  const divide = (size, row, col) => {
    if (r === row && c === col) {
      console.log(answer);
      return;
    }
    // r, c가 분할한 영역내에 있다면 탐색
    if (row <= r && r < row + size && col <= c && c < col + size) {
      size /= 2;
      divide(size, row, col); // 왼쪽 위
      divide(size, row, col + size); // 오른쪽 위
      divide(size, row + size, col); // 왼쪽 아래
      divide(size, row + size, col + size); // 오른쪽 아래
    }
    // 영역내에 없다면 해당 영역의 크기를 더해준다. (해당 영역의 크기만큼 횟수를 스킵하기 위해)
    else answer += size * size;
  };

  divide(Math.pow(2, N), 0, 0);
}

solution(N, r, c);
