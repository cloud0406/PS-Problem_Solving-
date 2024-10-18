let N = +require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2877.txt"
  )
  .toString()
  .trim();

let answer = "";

while (N > 0) {
  let remain = N % 2; // 짝수, 홀수 판별
  N = Math.floor(N / 2);

  if (remain === 0) {
    N -= 1;
    answer = "7" + answer;
  } else {
    answer = "4" + answer;
  }
}

console.log(answer);
