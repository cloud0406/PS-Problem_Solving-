const N = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2447.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  let answer = "";

  const makeStar = (i, j) => {
    // 여백이 들어가는 가운데 부분 조건 -> (1,4), (4,4)...
    if (i % 3 === 1 && j % 3 === 1) answer += " ";
    else {
      // 가운데 아니면 별표 찍기
      if (Math.floor(i / 3) === 0 && Math.floor(j / 3) === 0) answer += "*";
      // 3x3 될때까지 쪼개기
      else makeStar(Math.floor(i / 3), Math.floor(j / 3));
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      makeStar(i, j);
    }
    answer += "\n";
  }

  return answer;
}

console.log(solution());
