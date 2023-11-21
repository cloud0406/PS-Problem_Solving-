const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/7511.txt"
  )
  .toString()
  .trim()
  .split("\n");
let index = 0;

const t = parseInt(input[index++]);

function find(p, x) {
  if (p[x] !== x) {
    p[x] = find(p, p[x]);
  }
  return p[x];
}

function union(p, a, b) {
  a = find(p, a);
  b = find(p, b);
  if (a < b) {
    p[b] = a;
  } else {
    p[a] = b;
  }
}

for (let i = 1; i <= t; i++) {
  const n = parseInt(input[index++]);
  const p = Array.from({ length: n }, (_, index) => index);
  const k = parseInt(input[index++]);

  console.log(n, p, k);

  for (let j = 0; j < k; j++) {
    const [a, b] = input[index++].split(" ").map(Number);
    if (find(p, a) !== find(p, b)) {
      union(p, a, b);
    }
  }

  console.log(`Scenario ${i}:`);
  for (let m = 0; m < parseInt(input[index++]); m++) {
    const [a, b] = input[index++].split(" ").map(Number);
    if (find(p, a) !== find(p, b)) {
      console.log(0);
    } else {
      console.log(1);
    }
  }
  console.log();
}
