const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/4386.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const arr = input.slice(1).map((e) => e.split(" ").map(Number));
const parents = Array.from({ length: n }, (_, i) => i);

const graph = [];

let answer = 0;

const union = (a, b) => {
  a = findParent(a);
  b = findParent(b);

  if (a < b) parents[b] = a;
  else parents[a] = b;
};

const findParent = (x) => {
  if (parents[x] !== x) x = findParent(parents[x]);
  return x;
};

// 두 점 사이 거리
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const dist = Math.sqrt(
      Math.pow(arr[i][0] - arr[j][0], 2) + Math.pow(arr[i][1] - arr[j][1], 2)
    );

    graph.push([i, j, dist]);
  }
}

graph.sort((a, b) => a[2] - b[2]); // 거리순 정렬

// 거리가 짧은 것부터 연결하며 모든 선을 하나로 연결
graph.forEach(([a, b, dist]) => {
  if (findParent(a) !== findParent(b)) {
    union(a, b);
    answer += dist;
  }
});

console.log(answer.toFixed(2));
