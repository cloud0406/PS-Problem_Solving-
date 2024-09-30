const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14267.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [numPeople, numCompliments] = input[0].split(" ").map(Number);
const parents = input[1].split(" ").map(Number);
const complimentsData = input
  .slice(2)
  .map((line) => line.split(" ").map(Number));
const totalCompliments = Array(numPeople).fill(0);

const graph = {};

// 간선 추가
for (let i = 1; i < numPeople; i++) {
  const parent = parents[i];
  if (!graph[parent]) {
    graph[parent] = [];
  }
  graph[parent].push(i + 1);
}

// 각 직원이 받은 칭찬 저장
for (let i = 0; i < numCompliments; i++) {
  const [person, weight] = complimentsData[i];
  totalCompliments[person - 1] += weight;
}

function dfs(start) {
  const stack = [start];
  while (stack.length) {
    const current = stack.pop();
    if (graph[current]) {
      graph[current].forEach((child) => {
        stack.push(child);
        // 모든 자식 노드에 부모 노드의 누적값을 더해줌
        totalCompliments[child - 1] += totalCompliments[current - 1];
      });
    }
  }
}

dfs(1);
console.log(totalCompliments.join(" "));
