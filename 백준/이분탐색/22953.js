const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22953.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K, C] = input[0].split(" ").map(Number);
const times = input[1].split(" ").map(Number);
const timesLen = times.length;

let minTime = 1000000 * 1000000 * 100;

function cooking(idx, cnt, length) {
  if (cnt === C) {
    let low = 1;
    let high = 1000000 * 1000000 * 10;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      let dishes = 0;

      // 각 요리사가 mid 시간동안 만들 수 있는 요리 수 계산
      for (const time of times) {
        dishes += Math.floor(mid / time);
      }

      if (dishes >= K) {
        minTime = Math.min(minTime, mid);
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return;
  }

  // 각 요리사의 조리 시간 조정
  for (let i = idx; i < length; i++) {
    if (times[i] > 1) {
      times[i] -= 1;
      cooking(i, cnt + 1, length);
      times[i] += 1;
    } else {
      cooking(i, cnt + 1, length);
    }
  }
}

cooking(0, 0, timesLen);
console.log(minTime);
