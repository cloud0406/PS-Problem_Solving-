const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2212.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const K = +input[1];
const arr = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function soloution(N, K, arr) {
  const diffArr = [];

  for (let i = 1; i < N; i++) diffArr.push(arr[i] - arr[i - 1]);

  diffArr.sort((a, b) => a - b);

  // 짧은 거리 순으로 N-K개의 거리만큼만 더해주면 됨 -> 이후에 긴 거리들은 영역을 따로 분리하면 됨
  return diffArr
    .sort((a, b) => a - b)
    .slice(0, N - K)
    .reduce((acc, cur) => acc + cur, 0); // 뒤에 초기값 0 붙이지 않으면 에러 발생 -> 윗줄에서 N=k일때 slice(0,0), 즉 빈 배열로 reduce 사용시 초기 값 0 설정하지 않으면 에러남
}

console.log(soloution(N, K, arr));
