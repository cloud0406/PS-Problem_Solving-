const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9251.txt"
  )
  .toString()
  .trim()
  .split("\n");

const str1 = input[0].split("");
const str2 = input[1].split("");

function soloution(str1, str2) {
  let dy = Array.from(Array(input[0].length + 1), () =>
    Array(input[1].length + 1).fill(0)
  );

  for (let i = 1; i < str1.length + 1; i++) {
    for (let k = 1; k < str2.length + 1; k++) {
      if (str1[i - 1] === str2[k - 1]) {
        dy[i][k] = dy[i - 1][k - 1] + 1;
      } else {
        dy[i][k] = Math.max(dy[i - 1][k], dy[i][k - 1]);
      }
    }
  }
  return dy[dy.length - 1][dy[0].length - 1];
}

console.log(soloution(str1, str2));
