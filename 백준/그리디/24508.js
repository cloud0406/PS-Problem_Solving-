const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/24508.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K, T] = input[0].split(" ").map(Number);
const nadori = input[1].split(" ").map(Number);
let sum = nadori.reduce((acc, cur) => acc + cur, 0);

// 총합이 K배수 아니면 실패
if (sum % K !== 0) {
  console.log("NO");
} else {
  let cnt = 0;
  // 가득 들어있는 바구니대로 내림차순 정렬
  nadori.sort((a, b) => b - a);

  // 가장 큰 바구니부터, 총 바구니 개수인 'sum/K'개 까지 바구니 채움
  for (let i = 0; i < Math.floor(sum / K); i++) {
    cnt += Math.max(0, K - nadori[i]);
  }

  if (cnt > T) console.log("NO");
  else console.log("YES");
}
