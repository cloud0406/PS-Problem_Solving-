const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input.shift();
let arr = [];

for (const row of input) {
  arr.push(row.split(" ").map(Number));
}

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][k] && arr[k][j]) {
        arr[i][j] = 1;
      }
    }
  }
}

for (let i = 0; i < N; i++) {
  console.log(arr[i].join(" "));
}
