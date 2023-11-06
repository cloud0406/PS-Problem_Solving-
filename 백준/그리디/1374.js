const fs = require("fs");
let input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1374.txt"
  )
  .toString()
  .split("\n");
let n = +input[0];
let datas = [];

for (let i = 1; i <= n; i++) {
  let [u, s, e] = input[i].split(" ").map((v) => +v);
  datas.push([s, e]);
}

datas.sort((a, b) => (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]));

let rooms = [datas[0][1]];
let answer = 1;

for (let i = 1; i < datas.length; i++) {
  let [s, e] = datas[i];

  while (rooms[0] <= s) rooms.shift();
  if (e >= rooms[rooms.length - 1]) rooms.push(e);
  else {
    let idx = rooms.findIndex((r) => r >= e);
    rooms.splice(idx, 0, e);
  }
  answer = Math.max(answer, rooms.length);
}

console.log(answer);
