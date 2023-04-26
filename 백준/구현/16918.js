const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16918.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [R, C, N] = input.shift().split(" ").map(Number);
const caseOdd = input.map((v) => v.split(""));
const caseEven = Array.from({ length: R }, () => Array(C).fill("O"));

function soloution(R, C, N, caseOdd, caseEven) {
  // 폭탄 배열 -> 문자열
  const mapJoin = (arr) => arr.map((v) => v.join("")).join("\n");

  if (N === 1) return mapJoin(caseOdd); // 초기 상태 그대로
  if (N % 2 === 0) return mapJoin(caseEven); // 짝수 초에는 무조건 폭탄 가득참

  // 모든칸이 폭탄으로 차있는 grid에서, 채우기 바로 이전 상태의 배열에서 폭탄을 찾고 인접한 곳 제거
  const bomb = (prev) => {
    const grid = Array.from({ length: R }, () => Array(C).fill("O"));

    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (prev[i][j] === "O") {
          grid[i][j] = ".";
          if (i > 0) grid[i - 1][j] = ".";
          if (j + 1 < C) grid[i][j + 1] = ".";
          if (i + 1 < R) grid[i + 1][j] = ".";
          if (j > 0) grid[i][j - 1] = ".";
        }
      }
    }

    return grid;
  };

  // 4초 간격으로 짝수는 가득차있는 상태, 홀수는 아래 두 케이스를 반복하게 됨
  if (N % 4 === 3) return mapJoin(bomb(caseOdd));
  if (N % 4 === 1) return mapJoin(bomb(bomb(caseOdd)));
}

console.log(soloution(R, C, N, caseOdd, caseEven));
