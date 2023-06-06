const N = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1174.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(N) {
  const nums = Array.from({ length: 10 }, (_, i) => i.toString()); // 한 자리 수는 모두 '줄어드는 수'에 해당

  // 위의 배열에 새로운 '줄어드는 수'를 추가해나가며 이어서 탐색
  for (const num of nums) {
    // 현재 수의 마지막 자리 숫자보다 작은 수를 탐색해서 이어 붙임 -> 배열에 추가
    for (let i = 0; i < +num % 10; i++) nums.push(num + i.toString());
  }

  // 만든 '줄어드는 수'를 담은 배열 길이가 N보다 크면 배열에서 해당 요소 리턴, 아니면 불가능이므로 -1 리턴
  return nums.length > N - 1 ? nums[N - 1] : -1;
}

console.log(solution(+N));
