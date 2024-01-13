const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10942.txt"
  )
  .toString()
  .trim()
  .split("\n");

let n = +input[0];
let nums = input[1].split(" ").map(Number);
let m = +input[2];

function solution(n, nums, m) {
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );

  let ans = [];

  nums.unshift(0);

  // 길이 1,2인 경우 처리
  for (let i = 1; i <= n - 1; i++) {
    dp[i][i] = 1;
    if (nums[i] === nums[i + 1]) dp[i][i + 1] = 1;
  }
  dp[n][n] = 1;

  // 간격 2부터(길이 3인 문자열부터) 늘려가며 팰린드롬인지 확인
  for (let diff = 2; diff < n; diff++) {
    for (let start = 1; start + diff <= n; start++) {
      let end = start + diff;

      // 이전의 결과를 통해 현재 문자에서 양 끝 제외한 수가 팰린드롬인지 + 양 끝 숫자가 같은지 체크
      // ex) 1 2 1 3 -> dp 배열 통해서 가운데 2 1이 팰린드롬인지 체크 + 양 끝 숫자 같은지 체크 => 모두 만족하면 팰린드롬
      if (dp[start + 1][end - 1] && nums[start] === nums[end])
        dp[start][end] = 1;
    }
  }

  input.slice(3).map((i) => {
    const [start, end] = i.split(" ").map(Number);
    ans.push(dp[start][end]);
  });

  return ans.join("\n");
}

console.log(solution(n, nums, m));
