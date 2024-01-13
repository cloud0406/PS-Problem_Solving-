const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17135.txt"
  )
  .toString()
  .trim()
  .split("\n");

const dir = [
  [0, -1],
  [-1, 0],
  [0, 1],
];

function bfs(y, x) {
  if (maps[y][x]) {
    return [true, y, x];
  } else {
    const visited = new Set();
    visited.add(`${y},${x}`);

    const dq = [];
    dq.push([y, x, 1]);

    while (dq.length > 0) {
      const [cy, cx, dist] = dq.shift();
      for (const [dy, dx] of dir) {
        const ny = cy + dy;
        const nx = cx + dx;
        if (0 <= ny && ny < n && 0 <= nx && nx < m) {
          if (dist < d) {
            const key = `${ny},${nx}`;
            if (!visited.has(key)) {
              if (maps[ny][nx]) {
                return [true, ny, nx];
              } else {
                dq.push([ny, nx, dist + 1]);
                visited.add(key);
              }
            }
          }
        }
      }
    }
    return [false, -1, -1];
  }
}

function getEnemy(archers) {
  const enemySet = new Set();
  let cnt = 0;

  for (let y = n - 1; y >= 0; y--) {
    enemySet.clear();

    for (const x of archers) {
      const [flag, enemyY, enemyX] = bfs(y, x);
      if (flag) {
        enemySet.add(`${enemyY},${enemyX}`);
      }
    }

    cnt += enemySet.size;

    for (const enemyKey of enemySet) {
      const [enemyY, enemyX] = enemyKey.split(",").map(Number);
      maps[enemyY][enemyX] = 0;
    }
  }

  return cnt;
}

const [n, m, d] = input[0].split(" ").map(Number);
const maps = input.slice(1).map((line) => line.split(" ").map(Number));
const mapsOriginal = maps.map((row) => [...row]);
let ans = 0;

for (const archers of getCombinations([...Array(m).keys()], 3)) {
  ans = Math.max(ans, getEnemy(archers));

  for (let i = 0; i < n; i++) {
    maps[i] = [...mapsOriginal[i]];
  }
}

console.log(ans);

function getCombinations(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) {
    return arr.map((value) => [value]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });
  return results;
}
