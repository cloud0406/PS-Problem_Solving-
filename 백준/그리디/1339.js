// 백준에서 입력을 받는 코드
const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1339.txt"
  )
  .toString()
  .trim()
  .split("\n");

const sol = (input) => {
  const alphabetObj = {};

  input.slice(1).map((str) => {
    let size = 1;

    for (let i = str.length - 1; i >= 0; i--) {
      const word = str[i];

      if (alphabetObj[word]) alphabetObj[word] += size;
      else alphabetObj[word] = size;
      size *= 10;
    } // 각 단어들에 대해 단어를 구성하는 알파벳들의 자릿수를 객체의 각 알파벳 키에 대응하는 값에 계속 더해준다.
  });

  // 배열로 전환 후 기대값이 큰 순으로 정렬
  const alphabetArr = Object.entries(alphabetObj).sort((a, b) => b[1] - a[1]);

  let number = 9;
  let sum = 0;
  // 가장 큰 자릿수를 가진 알파벳부터 9부터 순차적으로 대입해주고, 합계를 구한다.
  for (let i = 0; i < alphabetArr.length; i++) {
    sum += alphabetArr[i][1] * number--;
  }
  return sum;
};

console.log(sol(input));
