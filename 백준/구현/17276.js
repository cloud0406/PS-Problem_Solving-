const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17276.txt"
  )
  .toString()
  .trim()
  .split("\n");

let T = +input[0];
let cases = input.slice(1).map((v) => v.split(" ").map(Number));

// 실행 함수
function solution(T, cases) {
  let result = [];
  let currenIdx = 0;

  // 시계 방향
  const rotate = (N, arr) => {
    const mid = Math.floor(N / 2);
    const result = JSON.parse(JSON.stringify(arr));

    for (let i = 0; i < N; i++) {
      result[i][mid] = arr[i][i]; // 주 대각선 -> 가운데 열
      result[i][N - 1 - i] = arr[i][mid]; // 가운데 열 -> 부 대각선
      result[mid][i] = arr[N - 1 - i][i]; // 부 대각선 -> 가운데 행
      result[i][i] = arr[mid][i]; // 가운데 행 -> 주 대각선
    }

    return result;
  };

  // 반 시계 방향
  const rotate_reverse = (N, arr) => {
    const mid = Math.floor(N / 2);
    const result = JSON.parse(JSON.stringify(arr));

    for (let i = 0; i < N; i++) {
      result[mid][i] = arr[i][i]; // 주 대각선 -> 가운데 행
      result[i][i] = arr[i][mid]; // 가운데 열 -> 주 대각선
      result[i][mid] = arr[i][N - 1 - i]; // 부 대각선 -> 가운데 열
      result[i][N - 1 - i] = arr[mid][N - 1 - i]; // 가운데 행 -> 부 대각선
    }

    return result;
  };

  while (T--) {
    const [N, degree] = cases[currenIdx];

    let caseArr = cases.slice(currenIdx + 1, currenIdx + N + 1);
    const cnt = Math.abs(degree / 45);

    if (degree > 0) {
      for (let i = 0; i < cnt; i++) {
        caseArr = rotate(N, caseArr);
      }

      result.push(caseArr);
    } else {
      for (let i = 0; i < cnt; i++) {
        caseArr = rotate_reverse(N, caseArr);
      }

      result.push(caseArr);
    }

    currenIdx += N + 1;
  }

  const answer = [];
  result.map((item) => item.map((v) => answer.push(v.join(" "))));

  return answer.join("\n");
}

console.log(solution(T, cases));
