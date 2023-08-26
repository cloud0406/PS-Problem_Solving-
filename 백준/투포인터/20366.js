const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/20366.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const snow = input[1]
  .split(" ")
  .sort((a, b) => a - b)
  .map(Number);

function soloution(N, snow) {
  let answer = Infinity;

  // 양 끝 고정 후 (i,j) -> 가운데 투 포인터로 탐색
  for (let i = 0; i < N; i++) {
    for (let j = N - 1; j > i + 2; j--) {
      let left = i + 1;
      let right = j - 1;

      while (left < right) {
        let diff = snow[i] + snow[j] - (snow[left] + snow[right]);
        answer = Math.min(answer, Math.abs(diff));

        if (diff >= 0) left++;
        else right--;
      }
    }
  }

  return answer;
}

console.log(soloution(N, snow));
