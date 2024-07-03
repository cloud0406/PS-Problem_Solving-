const n = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2448.txt"
  )
  .toString()
  .trim()
  .split("\n");

function soloution(n) {
  // 기본 형태인 높이 3 삼각형을 통해 높이 2배로 늘려 나가기 -> 3 -> 6 -> 12 ... -> N
  const makeStar = (n) => {
    if (n === 3) return ["  *  ", " * * ", "*****"];

    const triangle = makeStar(n / 2);

    const result = [];

    // 높이 2배인 삼각형 만들기
    // 위층 1개 삼각형
    for (let star of triangle) {
      result.push(" ".repeat(n / 2) + star + " ".repeat(n / 2));
    }
    // 아래층 2개 삼각형
    for (let star of triangle) {
      result.push(star + " " + star);
    }

    return result;
  };

  return makeStar(+n).join("\n"); // 높이 3부터 2배씩 늘리며 재귀하다가 높이 n인 삼각형 리턴
}

console.log(soloution(n));
