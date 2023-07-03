const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2668.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const nums = input.slice(1).map(Number);
nums.unshift(0);

function solution(N, nums) {
  let answer = [];
  let visited = new Array(N + 1).fill(false);

  // start는 시작한 윗줄 인덱스번호, current는 아랫 줄 숫자 (계속 변경)
  const dfs = (current, start) => {
    if (visited[current]) {
      if (current === start) answer.push(start); // 이미 방문했고 사이클이 있다면 답에 추가
      return;
    } else {
      visited[current] = true;
      dfs(nums[current], start);
    }
  };

  for (let i = 1; i <= N; i++) {
    visited = new Array(N + 1).fill(false);
    dfs(i, i);
  }

  console.log(answer.length);
  console.log(answer.join("\n"));
}

solution(N, nums);
