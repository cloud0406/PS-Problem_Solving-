const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11578.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const target = (1 << (N + 1)) - 2; // 모든 문제가 해결된 상태 -> ex) N=5 -> 111110

// 각 학생이 풀 수 있는 문제를 비트마스크로 변환
const students = Array(M).fill(0);
for (let i = 0; i < M; i++) {
  const problems = input[i + 1].split(" ").map(Number);

  for (let j = 1; j < problems.length; j++) {
    students[i] |= 1 << problems[j]; // ex) 3,4번 풀 경우 -> 011000
  }
}

function findMinStudents() {
  let combinations = new Set(students);

  for (let count = 1; count <= M; count++) {
    // 현재 조합들 중 모든 문제를 해결할 수 있는지 확인
    for (const value of combinations) {
      if (value === target) return count;
    }

    // 이전 count명의 조합에 학생 수 하나를 더해 새로운 조합 생성
    const nextCombinations = new Set();
    for (const value of combinations) {
      for (const student of students) {
        nextCombinations.add(value | student);
      }
    }
    combinations = nextCombinations;
  }

  return -1;
}

console.log(findMinStudents());
