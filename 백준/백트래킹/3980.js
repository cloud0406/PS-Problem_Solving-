const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/3980.txt"
  )
  .toString()
  .trim()
  .split("\n");

const T = +input[0];

function soloution(T) {
  let answer = 0;
  let answerArr = [];
  let howCase = 0; // 테스트 케이스 인덱스

  const dfs = (L, stats, arr, visited) => {
    if (L === 11) {
      answer = Math.max(answer, stats);
      return answer;
    }

    for (let i = 0; i < 11; i++) {
      // 해당 선수의 포지션 점수가 0이 아니고, 아직 적합 포지션을 찾지 못했다면
      if (arr[L][i] !== 0 && !visited[i]) {
        visited[i] = true;
        dfs(L + 1, stats + arr[L][i], arr, visited); // 능력치 합 올리고, 다음 선수로 이동
        visited[i] = false;
      }
    }
  };

  // 테스트 케이스만큼 반복
  while (howCase !== T) {
    answer = 0;

    const arr = input
      .slice(1 + howCase * 11, 1 + (howCase + 1) * 11)
      .map((v) => v.split(" ").map(Number));

    const visited = new Array(11).fill(false);

    dfs(0, 0, arr, visited);
    answerArr.push(answer); // 케이스별 능력치 합 최대값을 배열에 담음

    howCase++;
  }

  return answerArr.join("\n");
}

console.log(soloution(T));
