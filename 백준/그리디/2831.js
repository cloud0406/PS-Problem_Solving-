const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2831.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const men = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const women = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let m_p = 0;
let w_p = N - 1;
let result = 0;

while (m_p < N && w_p >= 0) {
  if (men[m_p] < 0 && women[w_p] > 0 && Math.abs(men[m_p]) > women[w_p]) {
    result += 1;
    m_p += 1;
    w_p -= 1;
  } else if (
    men[m_p] > 0 &&
    women[w_p] < 0 &&
    men[m_p] < Math.abs(women[w_p])
  ) {
    result += 1;
    m_p += 1;
    w_p -= 1;
  } else if (
    men[m_p] < 0 &&
    women[w_p] > 0 &&
    Math.abs(men[m_p]) <= women[w_p]
  ) {
    w_p -= 1;
  } else if (
    men[m_p] > 0 &&
    women[w_p] < 0 &&
    men[m_p] >= Math.abs(women[w_p])
  ) {
    w_p -= 1;
  } else if (men[m_p] < 0 && women[w_p] < 0) {
    m_p += 1;
  } else if (men[m_p] > 0 && women[w_p] > 0) {
    w_p -= 1;
  }
}

console.log(result);
