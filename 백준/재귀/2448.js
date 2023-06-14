const n = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2448.txt"
  )
  .toString()
  .trim()
  .split("\n");

function soloution(n) {
  // 3일때 리턴한 결과를 가지고 높이 6 삼각형 -> 높이 12 삼각형 -> 높이 24 삼각형 .... 높이를 2배 키우며 계속 재귀 (n 높이까지)
  const recurStar = (n) => {
    if (n === 3) return ["  *  ", " * * ", "*****"];

    const ret = recurStar(n / 2); // n 반으로 줄이면서 3될때까지 재귀
    let arr = [];

    // 이전 n/2 높이의 결과로 높이 n인 삼각형 만듬
    for (let j of ret) arr.push(" ".repeat(n / 2) + j + " ".repeat(n / 2)); // 0 ~ n/2 행 삼각형 완성
    for (let j of ret) arr.push(j + " " + j); // n/2 ~ n 행 삼각형 완성

    return arr;
  };

  const star = () => {
    console.log(recurStar(+n).join("\n")); // 높이 3부터 2배씩 늘리며 재귀하다가 높이 n인 삼각형 리턴
  };

  star();
}

soloution(n);
