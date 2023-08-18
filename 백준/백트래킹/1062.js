const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1062.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const words = input.slice(1);

function solution(N, K, words) {
  // 기본 5글자를 배우지 못하면 단어 완성 불가능
  if (K < 5) return 0;

  let answer = 0;
  const checkWords = Array(26).fill(false);
  const defaultWords = ["a", "c", "i", "n", "t"];

  // 해당 알파벳 인덱스 순서에 배움 표시
  for (let word of defaultWords) {
    checkWords[word.charCodeAt(0) - 97] = true;
  }

  const dfs = (idx, L, arr) => {
    // 단어 K개 배웠으면 단어들 순환하며 읽을 수 있는지 체크
    if (L === K) {
      let cnt = 0;

      for (let word of words) {
        let flag = true;
        for (let c of word) {
          if (!arr[c.charCodeAt(0) - 97]) {
            flag = false;
            break;
          }
        }

        if (flag) cnt++;
      }

      answer = Math.max(answer, cnt);
    }

    // 알파벳 하나씩 백트래킹으로 배움 표시
    for (let i = idx; i < 26; i++) {
      if (!arr[i]) {
        arr[i] = true;
        dfs(i, L + 1, arr);
        arr[i] = false;
      }
    }
  };

  dfs(0, 5, checkWords); // 기본 단어 5개 배우고 시작

  return answer;
}

console.log(solution(N, K, words));
