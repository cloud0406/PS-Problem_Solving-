const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14888.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const nums = input[1].split(" ").map(Number);
const operators = input[2].split(" ").map(Number);

function soloution(N, nums, operators) {
  let max = -Infinity;
  let min = Infinity;

  const operation = (oper, num1, num2) => {
    switch (oper) {
      case 0:
        return num1 + num2;
      case 1:
        return num1 - num2;
      case 2:
        return num1 * num2;
      case 3:
        return num1 < 0 ? -Math.floor(-num1 / num2) : Math.floor(num1 / num2);
    }
  };

  // L : 계산 완료한 숫자 개수
  const dfs = (L, answer) => {
    if (L === N) {
      max = Math.max(max, answer);
      min = Math.min(min, answer);
    }

    for (let i = 0; i < 4; i++) {
      if (operators[i]) {
        operators[i]--;
        dfs(L + 1, operation(i, answer, nums[L]));
        operators[i]++;
      }
    }
  };

  dfs(1, nums[0]);

  // 나누기를 계산할때 '-Math.floor(-num1 / num2)' 부분에서 답이 '-0'이 나올 수 있다. -> 0으로 출력해줘야함
  console.log(max ? max : 0);
  console.log(min ? min : 0);
}

soloution(N, nums, operators);
