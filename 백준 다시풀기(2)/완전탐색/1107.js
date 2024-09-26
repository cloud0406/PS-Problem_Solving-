const [N, M, nums] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1107.txt"
  )
  .toString()
  .trim()
  .split("\n");

// 고장난 버튼 저장
const brokens = nums
  ? nums.split(" ").reduce((acc, v) => {
      acc[v] = true;
      return acc;
    }, {})
  : {};

let count = Math.abs(100 - N); // 초기 100에서 부터 얼나 떨어져있는지 계산
// 모든 채널 탐색
// N의 최댓값은 500,000이지만 처음에 숫자 버튼을 눌러서 500,000보다 높은 채널로 이동 후 -버튼으로 목표 채널을 찾아갈 수도 있기 때문에, 0부터 999,999
// 이 이상은 직접 + 버튼 누르는게 더 빠름
for (let i = 0; i < 1000000; i++) {
  const numString = String(i);
  let isValid = true;

  // 현재 채널이 고장난 버튼을 포함하고 있다면 패스
  for (let j = 0; j < numString.length; j++) {
    if (brokens[numString[j]]) {
      isValid = false;
      break;
    }
  }

  // 고장난 버튼이 없는 상태라면, 현재 count와 버튼 누른 횟수 비교
  if (isValid) {
    // 위에서 만든 숫자 -> target으로 가기 위해선, 현재 숫자에서 +, - 로 target 접근하기 위한 횟수 + 해당 숫자를 만드는데 필요한 버튼 클릭 수
    count = Math.min(count, Math.abs(i - N) + numString.length);
  }
}

console.log(count);
