const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17779.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const people = input.slice(1).map((line) => line.split(" ").map(Number));

let total = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    total += people[i][j];
  }
}

function simulation(x, y, d1, d2) {
  const section = [0, 0, 0, 0, 0];
  let temp_c = y;

  // 1번 선거구: 1 ≤ r < x+d1, 1 ≤ c ≤ y
  for (let r = 0; r < x + d1; r++) {
    if (r >= x) temp_c -= 1;
    section[0] += people[r]
      .slice(0, temp_c + 1)
      .reduce((acc, curr) => acc + curr, 0);
  }

  // 2번 선거구: 1 ≤ r ≤ x+d2, y < c ≤ N
  temp_c = y + 1;
  for (let r = 0; r < x + d2 + 1; r++) {
    if (r > x) temp_c += 1;
    section[1] += people[r].slice(temp_c).reduce((acc, curr) => acc + curr, 0);
  }

  // 3번 선거구: x+d1 ≤ r ≤ N, 1 ≤ c < y-d1+d2
  temp_c = y - d1 - 1;
  for (let r = x + d1; r < n; r++) {
    section[2] += people[r]
      .slice(0, temp_c + 1)
      .reduce((acc, curr) => acc + curr, 0);
    if (r < x + d1 + d2) temp_c += 1;
  }

  // 4번 선거구: x+d2 < r ≤ N, y-d1+d2 ≤ c ≤ N
  temp_c = y + d2;
  for (let r = x + d2 + 1; r < n; r++) {
    section[3] += people[r].slice(temp_c).reduce((acc, curr) => acc + curr, 0);
    if (r <= x + d1 + d2) temp_c -= 1;
  }

  // 5번 선거구: 경계선과 경계선 안에 포함되지 않는 구역
  section[4] = total - section.reduce((acc, curr) => acc + curr, 0);
  return Math.max(...section) - Math.min(...section);
}

let result = Infinity;

for (let x = 0; x < n - 2; x++) {
  for (let y = 1; y < n - 1; y++) {
    for (let d1 = 1; d1 <= y; d1++) {
      for (let d2 = 1; d2 <= n - y; d2++) {
        if (x + d1 + d2 < n && y - d1 >= 0 && y + d2 < n) {
          result = Math.min(result, simulation(x, y, d1, d2));
        } else break;
      }
    }
  }
}

console.log(result);
