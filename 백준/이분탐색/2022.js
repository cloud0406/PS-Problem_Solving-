function f(x, y, w) {
  const h1 = Math.sqrt(x ** 2 - w ** 2);
  const h2 = Math.sqrt(y ** 2 - w ** 2);
  const c = (h1 * h2) / (h1 + h2);
  return c;
}

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2022.txt"
  )
  .toString()
  .trim();

const [x, y, c] = input.split(" ").map(Number);
let s = 0;
let e = Math.min(x, y);
let res = 0;

while (e - s > 0.000001) {
  const m = (s + e) / 2;
  if (f(x, y, m) >= c) {
    res = m;
    s = m;
  } else {
    e = m;
  }
}

console.log(res.toFixed(3));
