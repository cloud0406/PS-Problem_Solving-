const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2138.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const bulb = input[1].split("").map(Number);
const target = input[2].split("").map(Number);

function soloution(N, bulb, target) {
  const change = (A, B) => {
    let press = 0;
    const temp = [...A];

    for (let i = 1; i < N; i++) {
      // 직전 전구 같다면 건너뜀
      if (temp[i - 1] == B[i - 1]) continue;

      // 스위치 누르기
      press++;
      for (let j = i - 1; j < i + 2; j++) {
        if (j < N) temp[j] = 1 - temp[j];
      }
    }

    // 배열 비교
    if (JSON.stringify(temp) == JSON.stringify(B)) return press;
    else return Infinity;
  };

  // 첫 번째 누르지 않았을 경우를 저장
  let answer = change(bulb, target);

  // 첫 번째 전구 누르고, 누르지 않았을 경우와 비교
  bulb[0] = 1 - bulb[0];
  bulb[1] = 1 - bulb[1];
  answer = Math.min(answer, change(bulb, target) + 1);

  if (answer != Infinity) return answer;
  else return -1;
}

console.log(soloution(N, bulb, target));
