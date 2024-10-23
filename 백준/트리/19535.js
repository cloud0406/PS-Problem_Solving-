const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/19535.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const edges = [];
const degree = Array(N + 1).fill(0);

// 간선 정보를 입력받고 각 노드의 차수 계산
for (let i = 1; i < N; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  edges.push([a, b]);
  degree[a]++;
  degree[b]++;
}

let dTree = 0; // D 패턴 수 저장
let gTree = 0; // G 패턴 수 저장

// dTree 계산 ->  어떤 간선을 기준으로 봤을때, 양쪽의 노드에서 degree값이 2이상일때 성립
for (const [a, b] of edges) {
  const temp = (degree[a] - 1) * (degree[b] - 1);
  dTree += temp;
}

// gTree 계산 -> 각 노드에서 degree가 3 이상이면
for (let i = 1; i <= N; i++) {
  if (degree[i] >= 3) {
    gTree += comb(degree[i], 3); // 해당 노드에 연결된 간선 중 3개의 간선을 선택하는 경우의 수
  }
}

if (dTree > 3 * gTree) console.log("D");
else if (dTree < 3 * gTree) console.log("G");
else console.log("DUDUDUNGA");

// comb(a,b) = a! / b!⋅(a−b)! => aCb
function comb(a, b) {
  let ans = 1;

  if (a - b < b) b = a - b; // comb(a, b) = comb(a, a-b)와 동일, 더 작은 값으로 최적화

  // 4C2 => 4*3 / 2*1
  // a * (a-1) * ... * (a-b+1)
  for (let i = a - b + 1; i <= a; i++) {
    ans *= i;
  }

  // b!로 나눔
  for (let j = 1; j <= b; j++) {
    ans = Math.floor(ans / j);
  }

  return ans;
}
