const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/4913.txt"
  )
  .toString()
  .trim()
  .split("\n");

const INF = 1000001;

// 소수 판별을 위한 배열 (false: 소수, true: 소수 아님)
const primeN = Array(INF).fill(false);
primeN[0] = true;
primeN[1] = true;

// 에라토스테네스의 체로 소수 판별
for (let i = 2; i * i < INF; i++) {
  if (!primeN[i]) {
    for (let j = i * i; j < INF; j += i) {
      primeN[j] = true;
    }
  }
}

const prefixPrimes = Array(INF).fill(0);
const prefixPrimes4k1 = Array(INF).fill(0);

for (let i = 2; i < INF; i++) {
  prefixPrimes[i] = prefixPrimes[i - 1];
  prefixPrimes4k1[i] = prefixPrimes4k1[i - 1];

  if (!primeN[i]) {
    prefixPrimes[i]++;
    if (i % 4 === 1 || i === 2) {
      prefixPrimes4k1[i]++;
    }
  }
}

const results = [];

for (let i = 0; i < input.length; i++) {
  const [L, U] = input[i].split(" ").map(Number);

  // 종료 조건
  if (L === -1 && U === -1) break;

  const tempL = Math.max(0, L);
  const tempU = Math.max(0, U);

  const x = prefixPrimes[tempU] - (tempL > 0 ? prefixPrimes[tempL - 1] : 0);
  const y =
    prefixPrimes4k1[tempU] - (tempL > 0 ? prefixPrimes4k1[tempL - 1] : 0);

  results.push(`${L} ${U} ${x} ${y}`);
}

console.log(results.join("\n"));
