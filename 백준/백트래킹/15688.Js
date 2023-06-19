const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/15688.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, map) {
  let answer = Infinity;
  const house = []; // 집들의 좌표 담음
  const chicken = []; // 치킨집의 좌표 담음

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 1) house.push([i, j]);
      if (map[i][j] === 2) chicken.push([i, j]);
    }
  }

  const visited = Array.from({ length: chicken.length }, () => false); // 치킨집 크기만큼 배열 생성 -> 치킨 집들의 좌표중 M개 선택하기위한 체크용

  // '치킨 거리' 구하기
  const distance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  // 치킨 집을 M개 선택해가며 '도시의 치킨 거리'의 최소 값을 구함
  const recursion = (cnt, idx) => {
    // 치킨집 M개 선택시
    if (cnt === M) {
      let chickenDistance = 0; // 도시의 치킨 거리 값

      for (let [x1, y1] of house) {
        let min = Infinity;
        // 위에서 선택한 집에서부터 선택한 M개의 치킨집중 가장 가까운 곳 찾기
        chicken.forEach((_, i) => {
          if (visited[i]) {
            const [x2, y2] = chicken[i];
            min = Math.min(min, distance(x1, y1, x2, y2));
          }
        });

        chickenDistance += min; // 위에서 구한 '치킨 거리'를 '도시의 치킨 거리'에 더함
      }

      answer = Math.min(answer, chickenDistance); // 치킨집을 M개씩 선택해서 '도시의 치킨 거리' 값이 최소인 조합을 찾음
      return;
    } else {
      // 치킨 집 선택
      for (let i = idx; i < chicken.length; i++) {
        if (!visited[i]) {
          visited[i] = true;
          recursion(cnt + 1, i);
          visited[i] = false;
        }
      }
    }
  };

  recursion(0, 0);
  return answer;
}

console.log(solution(N, M, map));
