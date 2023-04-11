const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/21314.txt"
  )
  .toString()
  .trim()
  .split("");

// 최대값 : M은 K와 묶을 수 있으면 묶고, M으로만 이루어진 문자는 합치지말고 낱개로 붙임
function findMax(input) {
  let mStack = [];
  let max = "";

  // M+K, K 처리
  input.forEach((val) => {
    if (val === "M") mStack.push(val);
    else {
      // M과 연결되지 않은 하나짜리 K일 경우 5
      if (!mStack.length) max += "5";
      // M과 연결된 K일 경우 : 5 x 10^n 꼴을 만듬
      else {
        let tmp = "5".padEnd(mStack.length + 1, "0");
        max += tmp;
        mStack = [];
      }
    }
  });

  // 남은 M 처리
  if (mStack.length) {
    mStack.forEach(() => (max += "1"));
  }

  return max;
}

// 최소값 : M은 최대한 M끼리 이어붙이고, K는 낱개로 처리
function findMin(input) {
  let mStack = [];
  let min = "";

  input.forEach((val) => {
    if (val === "M") mStack.push(val);
    // k만났을때 이어붙인 M처리 후 k 낱개로 처리
    else {
      if (mStack.length) {
        let tmp = "1".padEnd(mStack.length, "0");
        min += tmp;
        mStack = [];
      }

      min += "5";
    }
  });

  // 남은 M처리
  if (mStack.length) {
    let tmp = "1".padEnd(mStack.length, "0");
    min += tmp;
  }

  return min;
}

console.log(findMax(input));
console.log(findMin(input));
