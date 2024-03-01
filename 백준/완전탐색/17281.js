const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17281.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(n, arr) {
  let answer = 0;
  const visited = new Array(9).fill(false);

  const makeOrder = (players) => {
    if (players.length === 9) getMaxScore([...players]); // 9명되면 게임 시작
    else if (players.length === 3)
      makeOrder([...players, 0]); // 4번째 타자는 항상 1번 선수
    else {
      // 1번 선수 제외, 2번 선수부터 9번 선수까지 순서 배치
      for (let i = 1; i <= 8; i++) {
        if (!visited[i]) {
          visited[i] = true;
          makeOrder([...players, i]);
          visited[i] = false;
        }
      }
    }
  };

  const getMaxScore = (playersTurnList) => {
    let score = 0;
    let order = 0;

    // input으로 주어진 각 이닝별 선수들의 득점 리스트를 모두 순회
    for (let i = 0; i < n; i++) {
      const players = arr[i]; // 플레이어별 득점 리스트

      let out = 0;
      let base1 = 0;
      let base2 = 0;
      let base3 = 0;

      // 3아웃시 종료
      while (out < 3) {
        if (order === 9) order = 0;

        // makeOrder를 통한 순서대로 타자의 결과를 가져옴
        const result = players[playersTurnList[order]];

        switch (result) {
          case 0: // 아웃
            out++;
            break;
          case 1: // 1루타
            score += base3;
            base3 = base2;
            base2 = base1;
            base1 = 1;
            break;
          case 2: // 2루타
            score += base3 + base2;
            base3 = base1;
            base2 = 1;
            base1 = 0;
            break;
          case 3: // 3루타
            score += base3 + base2 + base1;
            base1 = base2 = 0;
            base3 = 1;
            break;
          case 4: // 홈런
            score += base3 + base2 + base1 + 1;
            base1 = base2 = base3 = 0;
        }

        order++; // 다음 타순으로 이동
      }
    }

    answer = Math.max(answer, score); // 리스트를 모두 순회한 후 최대 점수 갱신
  };

  makeOrder([]);

  return answer;
}

console.log(solution(N, arr));
