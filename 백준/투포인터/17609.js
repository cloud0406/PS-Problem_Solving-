const [N, ...words] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17609.txt"
  )
  .toString()
  .trim()
  .split("\n");

// 일반 회문인지 체크
function palindromeCheck(word, left, right) {
  while (left < right) {
    if (word[left] === word[right]) {
      left++;
      right--;
    } else return false;
  }

  return true;
}

function solution(word) {
  let left = 0;
  let right = word.length - 1;

  while (left < right) {
    // 일반 회문인지 체크
    if (word[left] === word[right]) {
      left++;
      right--;
    } else {
      // 유사 회문인지 체크
      // 투포인터의 왼쪽 혹은 오른쪽 인덱스를 다음칸으로 이동시키면 회문이 되는지 확인
      if (
        palindromeCheck(word, left + 1, right) ||
        palindromeCheck(word, left, right - 1)
      )
        return 1;

      // 일반 회문도 , 유사 회문도 아닐 경우
      return 2;
    }
  }

  // 반복문을 무사히 마쳤을 경우 일반 회문
  return 0;
}

const result = [];
for (const word of words) result.push(solution(word));

console.log(result.join("\n"));
