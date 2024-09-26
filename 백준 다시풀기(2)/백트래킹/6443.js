const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6443.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const strings = input.slice(1);

function solution(N, strings) {
  const answer = [];

  strings.forEach((str, idx) => {
    const visited = {};
    const results = [];
    const sortedStr = str.split("").sort(); // 알바벳순을 위한 정렬

    // 알파벳 순으로 정렬된 각 단어에서 알파벳 개수 세기
    sortedStr.forEach((alphabet) => {
      if (!visited[alphabet]) visited[alphabet] = 1;
      else visited[alphabet]++;
    });

    const anagram = (cnt) => {
      if (cnt === str.length) {
        answer.push(results.join(""));
        return;
      }

      for (const alphabet in visited) {
        if (visited[alphabet]) {
          results.push(alphabet);
          visited[alphabet]--;

          anagram(cnt + 1);

          results.pop();
          visited[alphabet]++;
        }
      }
    };

    anagram(0);
  });

  return answer.join("\n");
}

console.log(solution(N, strings));
