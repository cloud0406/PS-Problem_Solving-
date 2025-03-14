const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16974.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, X] = input[0].split(" ").map(Number);

const dp1 = Array(N + 1).fill(0); // 레이어의 수
const dp2 = Array(N + 1).fill(0); // 패티의 개수

dp1[0] = dp2[0] = 1;

for (let i = 1; i <= N; i++) {
  dp1[i] = dp1[i - 1] * 2 + 3; // 레이어 수
  dp2[i] = dp2[i - 1] * 2 + 1; // 패티 수
}

// 분할 정복
function dnc(N, X) {
  // 먹어야 하는 장수가 1장이면 패티는 0장
  if (X === 1) return 0;

  // 번과 N-1버거 미만이면
  if (X < dp1[N - 1] + 1) return dnc(N - 1, X - 1);

  // 번과 N-1버거
  if (X === dp1[N - 1] + 1) return dp2[N - 1];

  // 번과 N-1버거와 패티
  if (X === dp1[N - 1] + 2) return dp2[N - 1] + 1;

  // 번과 N-1버거와 패티와 N-1버거 미만이면
  if (X < dp1[N - 1] * 2 + 2)
    return dp2[N - 1] + 1 + dnc(N - 1, X - dp1[N - 1] - 2);

  // N버거 레이어 수와 동일하거나 1 작다면
  return dp2[N];
}

console.log(dnc(N, X));
