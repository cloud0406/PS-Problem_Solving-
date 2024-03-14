const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15918.txt"
  )
  .toString()
  .trim();

const [n, x, y] = input.split(" ").map(Number);

function solution(n, x, y) {
  let answer = 0;
  const arr = Array(25).fill(0);

  // x,y 좌표의 값이 같기 때문에 각 좌표 사이의 개수를 통해 x,y 좌표 값을 알 수 있음
  // ex) x,y 가 1,5이면 두 좌표 사이 3개의 요소가 들어가므로 두 좌표 값은 3
  let between = y - x - 1;
  arr[x] = arr[y] = between;

  const dfs = (cur) => {
    // 수열 완성될 경우 답 증가
    if (cur > n) {
      answer++;
      return;
    }

    // x,y 좌표로 정해진 수의 경우 넘어감
    if (cur === between) dfs(cur + 1);

    // i번째 요소에 넣기 위해선, i + cur + 1 번째 요소가 총 길이보다 작아야 함
    for (let i = 1; i + cur + 1 < 2 * n + 1; i++) {
      // 두 좌표가 비어있으면 현재 숫자 (cur) 넣어줌
      if (arr[i] === 0 && arr[i + cur + 1] === 0) {
        arr[i] = arr[i + cur + 1] = cur;
        dfs(cur + 1);
        arr[i] = arr[i + cur + 1] = 0;
      }
    }
  };

  dfs(1);
  return answer;
}

console.log(solution(n, x, y));
