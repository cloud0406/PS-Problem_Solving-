const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17179.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, L] = input[0].split(" ").map(Number);
const spots = [...input.slice(1, M + 1).map(Number), L];
const Q = input.slice(1 + M);

function solution(N, M, L, spots, Q) {
  // 해당 mid 값으로 cnt 횟수만큼 자르는게 가능한지 확인
  const isPossible = (mid, cnt) => {
    let prev = 0;
    for (let spot of spots) {
      if (spot - prev >= mid) {
        cnt--;
        prev = spot;
      }
    }

    return cnt < 0 ? true : false;
  };

  const getMaxLength = (cnt) => {
    let left = 0;
    let right = L;
    let length = 0;

    while (left <= right) {
      let mid = parseInt((left + right) / 2); // 가장 작은 케이크의 길이

      if (isPossible(mid, cnt)) {
        length = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return length;
  };

  for (let cnt of Q) {
    console.log(getMaxLength(cnt));
  }
}

solution(N, M, L, spots, Q);
