const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2585.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;

function calculateDistance(n1, n2) {
  const distance = Math.sqrt(
    Math.pow(coordinate[n1][0] - coordinate[n2][0], 2) +
      Math.pow(coordinate[n1][1] - coordinate[n2][1], 2)
  );
  return distance % 10
    ? Math.floor(distance / 10) + 1
    : Math.floor(distance / 10);
}

function check(limit) {
  const visited = new Set([0]);
  const queue = [[0, 0]];

  while (queue.length > 0) {
    const [current, count] = queue.shift();

    if (dist[current][n + 1] <= limit) return true;
    if (count >= k) continue;

    for (let next = 0; next < n + 2; next++) {
      if (!visited.has(next) && dist[current][next] <= limit) {
        visited.add(next);
        queue.push([next, count + 1]);
      }
    }
  }
  return false;
}

const [n, k] = input[line++].split(" ").map(Number);

const coordinate = [[0, 0]];
for (let i = 0; i < n; i++) {
  coordinate.push(input[line++].split(" ").map(Number));
}
coordinate.push([10000, 10000]);

const dist = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0));

for (let i = 0; i < n + 2; i++) {
  for (let j = 0; j < n + 2; j++) {
    dist[i][j] = calculateDistance(i, j);
  }
}

let left = 0;
let right = calculateDistance(0, n + 1);
let result = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (check(mid)) {
    result = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(result);
