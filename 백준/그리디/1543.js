// 음수를 기준으로 나눔
const input = require("fs")
  .readFileSync(__dirname + "/input/1543.txt")
  .toString()
  .trim()
  .split("-");

// 위에서 나눈 것 기준으로 음수 이후에 +는 모두 더해 한번에 빼주는 개념
// +를 묶어서 최대한 큰수를 만든 후 이를 빼줘서 값을 최소로 만든다.
let ans = input.map((item) => {
  return item.split("+").reduce((acc, cur) => Number(acc) + Number(cur));
});

console.log(ans.reduce((acc, cur) => Number(acc) - Number(cur)));
