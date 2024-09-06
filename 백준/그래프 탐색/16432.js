const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16432.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const rice_cakes_per_day = []; // 각 날의 떡 종류

for (let k = 1; k <= N; k++) {
  const rice_cake = input[k].split(" ").slice(1); // 첫 번째 값 제외
  rice_cakes_per_day.push(rice_cake);
}

let flag = false;
// 방문한 떡 기록, visited[날짜][떡 번호]
const visited = Array.from({ length: N + 1 }, () => new Array(10).fill(false));

function dfs(day, history) {
  if (flag) return; // 이미 답을 찾았으면 리턴

  if (day === N) {
    console.log(history.trim().split(" ").join("\n"));
    flag = true;
    return;
  }

  for (const cake of rice_cakes_per_day[day]) {
    const cakeNum = parseInt(cake);

    // 첫날일 경우 -> 떡 선택 후 넘어감
    if (day === 0) {
      visited[day + 1][cakeNum] = true; // (다음날에 오늘 선택한 떡 선택 못하도록 표시)
      dfs(day + 1, history + cake + " ");
    }

    // 첫날이 아니고 전날 준 떡 (history.slice(-2, -1))과 다르고 방문하지 않은 떡이면
    else if (cake !== history.slice(-2, -1) && !visited[day + 1][cakeNum]) {
      visited[day + 1][cakeNum] = true;
      dfs(day + 1, history + cake + " ");
    }
  }
}

dfs(0, "");

// 떡을 줄 방법이 없을 경우
if (!flag) {
  console.log(-1);
}
