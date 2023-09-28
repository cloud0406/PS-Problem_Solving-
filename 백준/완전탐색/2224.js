const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2224.txt"
  )
  .toString()
  .trim()
  .split("\n");

let N = parseInt(input[0]);
let arr = Array.from({ length: 58 }, () => Array(58).fill(0));
let cnt = 0;

for (let i = 1; i <= N; i++) {
  if (input[i][0] === input[i][5]) continue;

  const char1 = input[i].charCodeAt(0) - 65;
  const char2 = input[i].charCodeAt(5) - 65;

  if (!arr[char1][char2]) {
    arr[char1][char2] = 1;
    cnt++;
  }
}

for (let k = 0; k < 58; k++) {
  for (let i = 0; i < 58; i++) {
    for (let j = 0; j < 58; j++) {
      if (i !== j && !arr[i][j] && arr[i][k] && arr[k][j]) {
        arr[i][j] = 1;
        cnt++;
      }
    }
  }
}

console.log(cnt);

for (let i = 0; i < 58; i++) {
  for (let j = 0; j < 58; j++) {
    if (arr[i][j]) {
      console.log(
        String.fromCharCode(i + 65) + " => " + String.fromCharCode(j + 65)
      );
    }
  }
}
