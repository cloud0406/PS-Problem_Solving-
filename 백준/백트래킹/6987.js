let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6987.txt"
  )
  .toString()
  .trim()
  .split("\n");

const results = [];

// 각 4가지 결과에 대한 승, 무승부, 패 기록 저장
for (let i = 0; i < 4; i++) {
  const win = [];
  const draw = [];
  const lose = [];

  input[i]
    .split(" ")
    .map(Number)
    .forEach((result, idx) => {
      if (idx % 3 === 0) win.push(result);
      if (idx % 3 === 1) draw.push(result);
      if (idx % 3 === 2) lose.push(result);
    });

  results.push({ win, draw, lose });
}

const match = [];

// 경기 조합 정리 (A,B) , (A,C)...
for (let i = 0; i < 5; i++) {
  for (let j = i + 1; j < 6; j++) {
    match.push([i, j]);
  }
}

// 경기 결과가 가능한지 확인
const checkCnt = (win, draw, lose) => {
  for (let i = 0; i < 6; i++) {
    if (win[i] < 0) return false;
    if (draw[i] < 0) return false;
    if (lose[i] < 0) return false;
  }

  return true;
};

let possible = false;

const play = (depth, win, draw, lose) => {
  if (!checkCnt(win, draw, lose)) return;

  if (depth === 15) {
    possible = true;
    return;
  }

  const [me, opponent] = match[depth];

  win[me]--;
  lose[opponent]--;
  play(depth + 1, win, draw, lose);
  win[me]++;
  lose[opponent]++;

  draw[me]--;
  draw[opponent]--;
  play(depth + 1, win, draw, lose);
  draw[me]++;
  draw[opponent]++;

  win[opponent]--;
  lose[me]--;
  play(depth + 1, win, draw, lose);
  win[opponent]++;
  lose[me]++;
};

const isPossible = (index) => {
  let { win, draw, lose } = results[index];
  let cntWin = 0;
  let cntLose = 0;

  for (let i = 0; i < 6; i++) {
    cntWin += win[i];
    cntLose += lose[i];

    // 총 경기수 = 5 체크
    if (win[i] + draw[i] + lose[i] !== 5) return false;
  }

  if (cntWin !== cntLose) return false; // 승수 = 패수 체크

  possible = false;
  play(0, win, draw, lose);

  return possible;
};

let answer = [];

for (let i = 0; i < 4; i++) {
  isPossible(i) ? answer.push(1) : answer.push(0);
}

console.log(answer.join(" "));
