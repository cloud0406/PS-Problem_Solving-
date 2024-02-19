const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18866.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const v = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, v) {
  const young = []; // 젊은 날 정보를 저장하는 배열
  const old = []; // 늙은 날 정보를 저장하는 배열

  let max_happy = 0;
  let min_happy = Infinity;
  let max_tired = 0;
  let min_tired = Infinity;

  // 젊은 날 정보 계산
  for (let i = 0; i < N; i++) {
    if (min_happy > v[i][0] && v[i][0] !== 0) min_happy = v[i][0];
    if (max_tired < v[i][1] && v[i][1] !== 0) max_tired = v[i][1];

    young.push([min_happy, max_tired]);
  }

  // 늙은 날 정보 계산
  for (let i = N - 1; i >= 0; i--) {
    if (max_happy < v[i][0] && v[i][0] !== 0) max_happy = v[i][0];
    if (min_tired > v[i][1] && v[i][1] !== 0) min_tired = v[i][1];

    old.unshift([max_happy, min_tired]);
  }

  for (let K = N - 2; K >= 0; K--) {
    const [young_happy, young_tired] = young[K];
    const [old_happy, old_tired] = old[K + 1]; // 젊은 날 다음날 부터 늙은 날

    // 조건에 부합하는 경우 (젊은날 최소 행복 > 늙은날 최대 행복 && 젊은날 최대 피로도 < 늙은날 최소 피로도)
    if (young_happy > old_happy && young_tired < old_tired) return K + 1;
  }

  return -1;
}

console.log(solution(N, v));
