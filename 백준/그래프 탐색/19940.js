const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/19940.txt"
  )
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const TC = +input[idx++];

for (let i = 0; i < TC; i++) {
  const n = +input[idx++];
  const buttons = Array(5).fill(0);

  let ADDH = Math.floor(n / 60);
  let ten = Math.floor((n % 60) / 10);
  let one = n % 10;

  if (one > 5) {
    ten += 1;
    one -= 10;
  }

  if (ten > 3) {
    ADDH += 1;
    ten -= 6;
  }

  if (ten < 0 && one === 5) {
    ten += 1;
    one -= 10;
  }

  buttons[0] = ADDH;
  buttons[2 - (ten >= 0)] = Math.abs(ten); // tens가 양수/음수에 따른 처리
  buttons[4 - (one >= 0)] = Math.abs(one); // ones가 양수/음수에 따른 처리

  console.log(buttons.join(" "));
}
