const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1025.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split("").map(Number));

function solution(N, M, arr) {
  let answer = -1;

  // 완전제곱수 판별
  const isPerfectSquareNumber = (num) => {
    let sqrtNum = Math.floor(Math.sqrt(num)); // Math.floor 붙여야됨

    if (num === Math.pow(sqrtNum, 2)) return true;
    else return false;
  };

  // 모든 칸에 대해 행, 열 등차 탐색
  // 1. 2차 반복문으로 N, M까지 모든 칸에 대해 ,  2. 나머지 2차 반복문으로 등차 값 최소 ~ 최대 범위인 -N ~ N, -M ~ M 범위 등차 탐색
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      for (let row_degree_diff = -N; row_degree_diff < N; row_degree_diff++) {
        for (let col_degree_diff = -M; col_degree_diff < M; col_degree_diff++) {
          if (row_degree_diff === 0 && col_degree_diff === 0) continue; // 등차 값이 둘다 0인 경우는 변화 없으므로 건너 뜀
          // 현재 좌표 저장
          let y = row;
          let x = col;

          let num = 0; // 등차 값에 따라 바뀔 숫자

          // 행, 열에 등차 값을 더해도 배열 범위내에 있을 경우 계속 탐샛
          while (y >= 0 && y < N && x >= 0 && x < M) {
            num *= 10;
            num += arr[y][x];

            // 완전 제곱수면 값 갱신
            if (isPerfectSquareNumber(num)) answer = Math.max(answer, num);

            // 다음 값 탐색위해 행, 열에 등차 값을 더해줌
            y += row_degree_diff;
            x += col_degree_diff;
          }
        }
      }
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
