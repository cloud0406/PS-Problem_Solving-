const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16400.txt"
  )
  .toString()
  .trim();
const n = parseInt(input);
const prime = [];

// 소수 판별 함수
function isPrime(num) {
  if (num < 2) return false;
  // num의 제곱근까지만 확인해도 모든 약수 확인 가능
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// 2부터 n까지 소수 찾기
for (let i = 2; i <= n; i++) {
  if (isPrime(i)) prime.push(i);
}

// dp[i] = i를 소수의 합으로 나타내는 방법의 수
const dp = Array(n + 1).fill(0);
dp[0] = 1;

// 2부터 소수 사용해가면서 새로운 합 만드는 방법 가지수 추가
for (let p of prime) {
  for (let i = p; i <= n; i++) {
    dp[i] = (dp[i] + dp[i - p]) % 123456789;
  }
}

console.log(dp[n]);
