const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10723.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const T = +input[line++]; // 테스트 케이스 수
const answers = [];

for (let t = 0; t < T; t++) {
  const [n, m] = input[line++].split(" ").map(Number); // 도시 수와 새 도로 수

  let arr = [];

  for (let i = 1; i < n; i++) {
    const [u, c] = input[line++].split(" ").map(Number);
    arr.push([i, u, c]);
  }

  let result = 0n; // BigInt

  for (let i = 0; i < m; i++) {
    const [u, v, c] = input[line++].split(" ").map(Number);
    arr.push([u, v, c]);

    const vect = Array.from({ length: n }, (_, j) => j);

    // 간선을 가중치 기준으로 정렬
    arr.sort((a, b) => a[2] - b[2]);

    let mstWeight = 0n;
    for (const [u, v, c] of arr) {
      if (find(vect, u) !== find(vect, v)) {
        union(vect, u, v);
        mstWeight += BigInt(c);
      }
    }

    if (i === 0) {
      result = mstWeight;
    } else {
      result = result ^ mstWeight; // BigInt XOR
    }
  }

  answers.push(result.toString());
}

console.log(answers.join("\n"));

function find(vect, num) {
  if (vect[num] === num) return num;
  return (vect[num] = find(vect, vect[num]));
}

function union(vect, u, v) {
  const pu = find(vect, u);
  const pv = find(vect, v);

  if (pu === pv) return false;

  if (pu < pv) {
    vect[pv] = pu;
  } else {
    vect[pu] = pv;
  }

  return true;
}
