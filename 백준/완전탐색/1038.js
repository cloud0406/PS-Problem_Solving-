const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1038.txt"
  )
  .toString()
  .trim()
  .split("\n");

let decnum = [];

//10C1 + 10C2 + ... 10C10 = 2^10 - 1 = 1023
for (let i = 1; i <= 1023; i++) {
  let num = 0;
  let tmp_i = i;
  for (let idx = 9; idx >= 0; idx--) {
    if (tmp_i % 2 == 1) num = 10 * num + idx;

    tmp_i = Math.floor(tmp_i / 2);
  }

  decnum.push(num);
}

decnum.sort((a, b) => a - b);

let N = +input;

if (N > 1022) console.log(-1);
else console.log(decnum[N]);
