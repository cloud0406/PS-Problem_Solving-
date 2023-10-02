let [N, ...input] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11509.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(N, input) {
  let arr = input[0].split(" ").map(Number);
  let arrows = Array.from({ length: N }, () => 0);
  let answer = 0;

  for (let i of arr) {
    // 화살이 존재하는 높이의 풍선을 만나면 화살 높이를 낮추고, 날아가는 화살보다 높은 풍선이 있으면 화살을 추가하는 식으로 끝까지 진행
    if (arrows[i]) {
      arrows[i]--;
      arrows[i - 1]++;
    } else {
      answer++;
      arrows[i - 1]++;
    }
  }

  return answer;
}

console.log(solution(N, input));
