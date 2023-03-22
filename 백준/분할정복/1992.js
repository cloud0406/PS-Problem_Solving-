const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1992.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const screen = input.slice(1).map((v) => v.split("").map(Number));

const genQuadTree = (n) => {
  const quadTree = []; // 답안을 담을 쿼드트리 배열

  const recursion = (n, x, y) => {
    let total = 0; // 배열을 한번에 압축할 수 있는지 확인하기 위한 인덱스 합을 담을 변수

    // 각 N x N 배열을 순회하며 인덱스 총 값 더함
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        total += screen[y + j][x + i];
      }
    }

    if (total === 0) quadTree.push("0"); // 전부 0이면 0으로 압축 가능
    else if (total === n * n) quadTree.push("1"); // 전부 1이면 1로 압축 가능
    // 한번에 압축할 수 없다면
    else {
      n /= 2; // 배열 4개로 쪼갬 -> 8x8이면, 4x4 4개로 4등분
      quadTree.push("(");
      recursion(n, x, y);
      recursion(n, x + n, y); // 가로축 다음 배열로 이동
      recursion(n, x, y + n); // 세로축 다음 배열로 이동
      recursion(n, x + n, y + n);
      quadTree.push(")");
    }
  };

  recursion(n, 0, 0);
  console.log(quadTree.join(""));
};

genQuadTree(n);
