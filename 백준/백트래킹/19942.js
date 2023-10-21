const input = require("fs")
  .readFileSync(
    process.platform === "linux"
      ? "./dev/stdin"
      : __dirname + "/input/19942.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const food = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, food) {
  let answer = Infinity;
  let selectedFoods = [];
  const [mp, mf, ms, mv] = food.shift();

  for (let k = 1; k < 1 << N; k++) {
    let p = 0;
    let f = 0;
    let s = 0;
    let v = 0;
    let cost = 0;

    let temp = [];
    for (let i = 0; i < N; i++) {
      if (k & (1 << i)) {
        p += food[i][0];
        f += food[i][1];
        s += food[i][2];
        v += food[i][3];
        cost += food[i][4];
        temp.push({ index: i + 1, cost: food[i][4] });
      }
    }

    if (p >= mp && f >= mf && s >= ms && v >= mv) {
      if (cost <= answer) {
        if (cost < answer) selectedFoods = [];
        answer = cost;
        const f = temp
          .sort((a, b) => {
            a.cost - b.cost;
          })
          .map((v) => v.index)
          .join(" ");
        selectedFoods.push(f);
      }
    }
  }

  if (answer == Infinity) {
    console.log(-1);
  } else {
    console.log(answer);
    console.log(selectedFoods.sort()[0]);
  }
}

solution(N, food);
