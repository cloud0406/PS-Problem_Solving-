const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2866.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const arr = input.slice(1);

function solution(R, C, arr) {
  let answer = 0;
  let start = 0;
  let end = R - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2); // 첫 번째 행부터 어디까지 행 자를지

    let flag = true;
    let dict = {};

    // mid행부터 열 쭉 내리면서 단어 만들고 중복 체크
    for (let j = 0; j < C; j++) {
      let str = "";

      for (let i = mid; i < R; i++) {
        str += arr[i][j];
      }

      if (!dict[str]) {
        dict[str] = true;
      } else {
        flag = false;
        break;
      }
    }

    // 중복 안되면 더 아래쪽 행을 자르기
    if (flag) {
      answer = mid;
      start = mid + 1;
    } else {
      // 중복이 있으면 더 위쪽 행을 자르기
      end = mid - 1;
    }
  }

  return answer;
}

console.log(solution(R, C, arr));
