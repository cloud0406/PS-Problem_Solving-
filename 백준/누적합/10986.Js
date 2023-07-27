const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10986.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

function solution(N, M, numbers) {
  let answer = 0;
  const dp = Array(N).fill(0);
  const mod = Array(M).fill(0);

  // dp 배열에 누적합 담음
  for (let i = 0; i < N; i++) {
    if (i === 0) dp[0] = numbers[0];
    else dp[i] = dp[i - 1] + numbers[i];
  }

  // 누적합의 각 요소들을 M으로 나눴을때 나머지를 인덱스로, 각 요소가 몇 개인지 카운트
  for (let i = 0; i < N; i++) {
    mod[dp[i] % M]++;
  }

  // 나머지가 0인 것들은 하나만으로 누적합 구간을 만족하므로 개수만큼 답에 추가
  answer = mod[0];
  // 나머지가 0 ~ M-1 인 요소들은 나머지가 같은 요소들끼리 2개씩 선택하여 누적합 조합 / ex) M=3, 누적합의 나머지가 2인 요소들 2, 11 => 해당 구간 사이의 합은 11-2=9로 3으로 나눠떨어지게 됨
  // mod 배열에 나머지가 같은 요소의 개수를 카운팅해두었으므로 이들 중 2개를 선택하는 방법은 -> 'nC2'
  for (let i = 0; i < M; i++) {
    answer += (mod[i] * (mod[i] - 1)) / 2;
  }

  return answer;
}

console.log(solution(N, M, numbers));
