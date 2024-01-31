const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1469.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const X = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const length = 2 * n;

const visited = Array(17).fill(false); // 문제에서 X의 원소 범위 주어짐 <=16
const answer = Array(length).fill(-1);

function backTracking(idx) {
  // 종료 조건 -> 마지막 자리까지 다 채우면 출력 후 종료
  if (idx === length) {
    console.log(answer.join(" "));
    process.exit();
  }

  // 현재 인덱스 이미 자리 있으면 다음으로 넘어감
  if (answer[idx] !== -1) {
    backTracking(idx + 1);
    return;
  }

  for (const k of X) {
    const matchingIdx = idx + k + 1; // 해당 원소를 answer 배열에 index, matchingIdx 자리에 넣음

    if (!visited[k] && matchingIdx < length && answer[matchingIdx] === -1) {
      answer[idx] = answer[matchingIdx] = k;
      visited[k] = true;
      backTracking(idx + 1);
      visited[k] = false;
      answer[idx] = answer[matchingIdx] = -1;
    }
  }
}

backTracking(0);
console.log(-1);
