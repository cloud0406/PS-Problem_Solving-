const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20444.txt"
  )
  .toString()
  .trim()
  .split(" ");
const n = Number(input[0]);
const k = BigInt(input[1]);

// (가로 자른 횟수 + 1) * (세로 자른 횟수 + 1) = k
function solution() {
  let left = 0;
  let right = Math.floor(n / 2); // 가로 자른 횟수의 범위는 총 자른 횟수의 절반까지 / 자른 횟수 1,3이나 3,1이나 값 똑같으므로
  let mid = Math.floor((left + right) / 2); // 가로 자른 횟수
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const val = BigInt(mid + 1) * BigInt(n - mid + 1);

    if (val > k) right = mid - 1;
    else if (val < k) left = mid + 1;
    else {
      console.log("YES");
      return;
    }
  }
  console.log("NO");
  return;
}

solution();
