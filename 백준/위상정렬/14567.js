const input = require("fs")
  .readFileSync(__dirname + "/input/14567.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const prerequisite = Array.from({ length: N + 1 }, () => []);
const semester = Array.from({ length: N + 1 }, () => 1); // 해당 인덱스에 해당 과목을 최소 몇 학기에 이수할 수 있는지 담음

input.forEach((e) => {
  const [before, after] = e.split(" ").map(Number);
  prerequisite[before].push(after);
});

for (let i = 1; i <= N; i++) {
  prerequisite[i].forEach((subject) => {
    // 현재 해당 과목의 최소 학기와, 선수 과목의 '최소학기 + 1'(선수 과목을 들은 후 현재 과목을 들어야 하기 때문)를 비교
    // 선수 과목이 여러개 있을 수 있으므로 가장 오래 걸리는(최소 학기가 높은) 선수 과목의 최소 학기를 선정 후 한학기 더해줌
    semester[subject] = Math.max(semester[subject], semester[i] + 1);
  });
}

semester.shift();
console.log(semester);
