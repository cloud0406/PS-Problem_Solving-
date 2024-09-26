const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2436.txt"
  )
  .toString()
  .trim()
  .split(" ");

const gcd = BigInt(input[0]);
const lcm = BigInt(input[1]);
let ans1 = gcd,
  ans2 = lcm;

const xy = gcd * lcm; // gcd(x, y) * lcm(x, y) == x * y

function getGCD(a, b) {
  return b === 0n ? a : getGCD(b, a % b);
}

// xy의 약수이면서, 최대공약수의 배수인 것을 찾는다.
for (let i = 2n * gcd; i * i <= xy; i += gcd) {
  if (xy % i === 0n) {
    const tmp = xy / i;

    if (getGCD(i, tmp) === gcd) {
      if (ans1 + ans2 > i + tmp) {
        ans1 = i;
        ans2 = tmp;
      }
    }
  }
}

console.log(`${ans1} ${ans2}`);
