const input = require("fs")
  .readFileSync(__dirname + "/input/2961.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const foods = Array.from({ length: N }, () =>
  input.shift().split(" ").map(Number)
);

let answer = Infinity;
const visited = Array.from({ length: N }, () => false);

function cook(select, visited, sour, bitter) {
  //   console.log(select, visited, sour, bitter);
  if (select) answer = Math.min(answer, Math.abs(sour - bitter));

  for (let i = select; i < foods.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      cook(select + 1, visited, sour * foods[i][0], bitter + foods[i][1]);
      visited[i] = false;
    }
  }
}

cook(0, visited, 1, 0);
console.log(answer);
