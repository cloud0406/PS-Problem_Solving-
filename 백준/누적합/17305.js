const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17305.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [N, W] = input[0].split(" ").map(Number);
let Vec = [[], []]; // T == 3 -> Vec[0], T == 5 -> Vec[1]
let Sum = [Array(250001).fill(0), Array(250001).fill(0)];
let Answer = 0;

function inputValues() {
  for (let i = 1; i <= N; i++) {
    let [T, S] = input[i].split(" ").map(Number);

    if (T === 3) Vec[0].push(S);
    else if (T === 5) Vec[1].push(S);
  }
}

function settings() {
  for (let i = 0; i < 2; i++) {
    Vec[i].sort((a, b) => b - a); // 내림차순 정렬
    for (let j = 0; j < Vec[i].length; j++) {
      Sum[i][j + 1] = Sum[i][j] + Vec[i][j];
    }
  }

  for (let i = 0; i <= Vec[0].length; i++) {
    if (i * 3 <= W) {
      let Three = Sum[0][i];
      let R = Math.floor((W - i * 3) / 5);

      if (R <= Vec[1].length) {
        let Five = Sum[1][R];
        Answer = Math.max(Answer, Three + Five);
      } else {
        let Five = Sum[1][Vec[1].length];
        Answer = Math.max(Answer, Three + Five);
      }
    }
  }
}

inputValues();
settings();
console.log(Answer);
