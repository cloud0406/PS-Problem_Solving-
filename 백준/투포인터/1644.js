let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1644.txt"
  )
  .toString()
  .trim()
  .split("\n");

let n = +input[0];
// 에라토스테네스의 체 - 소수 판별 알고리즘
let primes = [];
let check = new Array(n + 1).fill(true); // 1. 소수 판별 배열
// 2. 2부터 특정 수의 배수 지움
for (let i = 2; i * i <= n; i++) {
  if (!check[i]) continue; // 이미 지워진 수 건너뛰기
  // 자기 자신을 제외한 배수 지우기
  for (let j = i * i; j <= n; j += i) {
    check[j] = false;
  }
}

// 3. 남은 소수 배열에 담기
for (let i = 2; i <= n; i++) {
  if (check[i]) primes.push(i);
}

// 투포인터 탐색
let left = (sum = cnt = 0);
// right 1씩 올려주며 누적합이 n이 되는 경우 카운트
for (let right = 0; right < primes.length; right++) {
  sum += primes[right];
  // 누적합이 n보다 커지면 left 포인터 이동
  // left를 옮기다 sum이 n보다 작아지면 while문 탈출 -> 다시 for문 돌아가며 right를 올려가며 탐색
  while (sum > n) {
    sum -= primes[left];
    left++;
  }

  if (sum === n) cnt++;
}

console.log(cnt);
