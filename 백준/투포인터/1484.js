const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1484.txt"
  )
  .toString()
  .trim()
  .split("\n");

const G = +input[0];

function solution(G) {
  let current = 1,
    memory = 1;
  let flag = false;

  const answer = [];

  while (true) {
    const diff = current * current - memory * memory;

    // 몸무게 제곱의 차이가 G일 경우 답 추가
    if (diff === G) {
      flag = true;
      answer.push(current);
    }

    // 인접한 제곱수 차가 G보다 크면 이제 G 만들기 불가능
    if (diff > G && current - memory === 1) break;

    // 몸무게 차가 G보다 크면 둘 중 더 작은 값인 '기억하고 있는 몸무게' 값을 , 아니면 더 큰 값인 '현재 몸무게' 값을 증가
    if (diff > G) memory++;
    else current++;
  }

  return flag ? answer : [-1];
}

console.log(solution(G).join("\n"));
