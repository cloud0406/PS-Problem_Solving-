let [A, B] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16953.txt"
  )
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let ans = 1;

while (A < B) {
  let b = B.toString();

  if (B % 2 === 0) B /= 2;
  else if (b[b.length - 1] === "1") {
    B = Number(b.slice(0, b.length - 1));
  } else return console.log("-1");

  ans++;
}

A > B ? console.log("-1") : console.log(ans);
