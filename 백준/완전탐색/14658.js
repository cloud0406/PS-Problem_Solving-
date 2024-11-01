const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14658.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m, l, k] = input[0].split(" ").map(Number);
const stars = input.slice(1).map((line) => line.split(" ").map(Number));

let bounce = 0;

// 별들의 조합을 탐색
for (const starA of stars) {
  for (const starB of stars) {
    let count = 0;

    // 기준 별(A, B)로부터 범위 내에 있는 별의 수를 계산
    for (const starC of stars) {
      if (
        starA[0] <= starC[0] &&
        starC[0] <= starA[0] + l &&
        starB[1] <= starC[1] &&
        starC[1] <= starB[1] + l
      ) {
        count++;
      }
    }

    if (count > bounce) bounce = count;
  }
}

// 전체 별 개수에서 가장 많이 겹치는 범위를 뺀 결과 출력
console.log(k - bounce);
