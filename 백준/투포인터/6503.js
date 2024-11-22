let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6503.txt"
  )
  .toString()
  .trim()
  .split("\n");

let output = "";
let index = 0;

while (index < input.length) {
  let line = input[index++].trim();

  if (line === "0") break;

  let n = +line;
  let arr = input[index++].trim().split("");

  let head = 0;
  let tail = 0;
  let ans = 0;

  let dic = new Map();

  while (tail < arr.length) {
    let str = arr[tail];

    if (dic.size >= n) {
      if (!dic.has(str)) {
        if (dic.get(arr[head]) === 1) {
          dic.delete(arr[head]);
        } else {
          dic.set(arr[head], dic.get(arr[head]) - 1);
        }
        head++;
      } else {
        dic.set(str, dic.get(str) + 1);
        tail++;
      }
    } else {
      if (!dic.has(str)) {
        dic.set(str, 1);
      } else {
        dic.set(str, dic.get(str) + 1);
      }
      tail++;
    }

    if (dic.size <= n) {
      ans = Math.max(ans, tail - head);
    }
  }

  output += `${ans}\n`;
}

console.log(output);
