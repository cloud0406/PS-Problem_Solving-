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
    let mid = Math.floor((start + end) / 2);

    let check = true;
    let dict = {};

    for (let j = 0; j < C; j++) {
      let temp = "";

      for (let i = mid; i < R; i++) {
        temp += arr[i][j];
      }

      if (!dict[temp]) {
        dict[temp] = 1;
      } else {
        check = false;
        break;
      }
    }

    if (check) {
      answer = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return answer;
}

console.log(solution(R, C, arr));
