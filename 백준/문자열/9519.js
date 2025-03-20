const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9519.txt"
  )
  .toString()
  .trim()
  .split("\n");

const x = parseInt(input[0], 10);
const word = input[1].split("");

function solution(x, word) {
  const n = word.length;
  const isOdd = n % 2 !== 0;
  let transformed = [...word];
  let cycleLength = 0;

  // 싸이클 구하기: 원래 문자열로 돌아올 때까지 변환 반복
  while (true) {
    const left = [];
    const right = [];

    for (let i = 0; i < n; i += 2) left.push(transformed[i]);

    for (let i = n - 1 - (isOdd ? 1 : 0); i >= 0; i -= 2)
      right.push(transformed[i]);

    transformed = left.concat(right);
    cycleLength += 1;

    // 원래 문자열과 같아지면 싸이클 종료
    if (word.join("") === transformed.join("")) break;
  }

  // x번 변환 후의 문자열 찾기
  for (let k = 0; k < x % cycleLength; k++) {
    const left = [];
    const right = [];

    for (let i = 0; i < n; i += 2) left.push(word[i]);
    for (let i = n - 1 - (isOdd ? 1 : 0); i >= 0; i -= 2) right.push(word[i]);

    // 변환된 문자열을 왼쪽과 오른쪽을 합쳐서 갱신
    word = left.concat(right);
  }

  return word.join("");
}

console.log(solution(x, word));
