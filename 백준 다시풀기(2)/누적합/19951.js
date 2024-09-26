const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/19951.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  const [N, M] = input[0].split(" ").map(Number);
  const H = input[1].split(" ").map(Number);
  let answer = "";
  const save = Array(N + 1).fill(0);

  for (let i = 2; i < M + 2; i++) {
    const [a, b, k] = input[i].split(" ").map(Number);
    save[a - 1] += k;
    save[b] -= k;
  }

  const sum = Array(N + 1).fill(0);
  sum[0] = save[0];

  for (let i = 1; i < N + 1; i++) {
    sum[i] = sum[i - 1] + save[i];
  }

  for (let i = 0; i < N; i++) {
    answer += H[i] + sum[i] + " ";
  }

  return answer;
}

console.log(solution());
