const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/5582.txt"
  )
  .toString()
  .trim()
  .split("\n");

function sol() {
  let [s1, s2] = [input[0], input[1]];
  let answer = 0;

  let arr = new Array(s1.length + 1)
    .fill(null)
    .map((_) => new Array(s2.length + 1).fill(0)); // 문자열이 서로 같으면 대각선에서 +1, 다르면 0 으로 처리

  for (let i = 0; i < s1.length; i++) {
    // 문자열은 0번 인덱스부터 확인하지만 2차원 배열은 (1,1)부터 사용할것이다.
    for (let j = 0; j < s2.length; j++) {
      if (s1[i] === s2[j]) arr[i + 1][j + 1] = arr[i][j] + 1;
      else arr[i + 1][j + 1] = 0;

      if (arr[i + 1][j + 1] > answer) answer = arr[i + 1][j + 1];
    }
  }

  return answer;
}

console.log(sol());
