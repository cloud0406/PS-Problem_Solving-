let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2922.txt"
  )
  .toString()
  .trim()
  .split("\n");

let str = input[0];

function solution(str) {
  let answer = 0;

  const checkVowel = (ch) => {
    return ch === "A" || ch === "E" || ch === "I" || ch === "O" || ch === "U";
  };

  const dfs = (idx, vowel, consonant, useL, cnt) => {
    // 자음 or 모음 3연속이면 종료
    if (vowel >= 3 || consonant >= 3) return;

    // 문자열 끝 도달
    if (idx === str.length) {
      if (useL) answer += cnt; // L이 사용된 경우만 카운트
      return;
    }

    if (str[idx] === "_") {
      dfs(idx + 1, vowel + 1, 0, useL, cnt * 5); // 빈 곳에 모음 추가
      dfs(idx + 1, 0, consonant + 1, useL, cnt * 20); // 빈 곳에 자음 추가
      dfs(idx + 1, 0, consonant + 1, true, cnt); // 빈 곳에 L 추가
    } else {
      // 현재 idx가 채워져 있는 경우 자음, 모음 판별해서 다음 인덱스로 넘어감
      dfs(
        idx + 1,
        checkVowel(str[idx]) ? vowel + 1 : 0,
        !checkVowel(str[idx]) ? consonant + 1 : 0,
        useL || str[idx] === "L", // L사용 했으면 true, 아니면 false
        cnt
      );
    }
  };

  dfs(0, 0, 0, false, 1);

  return answer;
}

console.log(solution(str));
