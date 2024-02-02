const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/15683.txt"
  )
  .toString()
  .trim()
  .split("\n");

const locationInfo = input[0].split(" ");
const n = Number(locationInfo[0]);
const m = Number(locationInfo[1]);
const Map = input.slice(1, input.length).map((e) => e.split(" "));
const order = [];
let min = Infinity;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (Map[i][j] !== "0" && Map[i][j] !== "6") {
      order.push({
        x: i,
        y: j,
        value: Map[i][j],
      });
    }
  }
}

const checkTop = (x, y, Map) => {
  const newMap = [];
  for (let i = 0; i < n; i++) {
    newMap.push([...Map[i]]);
  }
  for (let i = x; i >= 0; i--) {
    if (newMap[i][y] === "0") {
      newMap[i][y] = "#";
    } else if (newMap[i][y] === "6") {
      break;
    }
  }
  return newMap;
};

const checkBot = (x, y, Map) => {
  const newMap = [];
  for (let i = 0; i < n; i++) {
    newMap.push([...Map[i]]);
  }
  for (let i = x; i < n; i++) {
    if (newMap[i][y] === "0") {
      newMap[i][y] = "#";
    } else if (newMap[i][y] === "6") {
      break;
    }
  }
  return newMap;
};

const checkRight = (x, y, Map) => {
  const newMap = [];
  for (let i = 0; i < n; i++) {
    newMap.push([...Map[i]]);
  }
  for (let i = y; i < m; i++) {
    if (newMap[x][i] === "0") {
      newMap[x][i] = "#";
    } else if (newMap[x][i] === "6") {
      break;
    }
  }
  return newMap;
};

const checkLeft = (x, y, Map) => {
  const newMap = [];
  for (let i = 0; i < n; i++) {
    newMap.push([...Map[i]]);
  }
  for (let i = y; i >= 0; i--) {
    if (newMap[x][i] === "0") {
      newMap[x][i] = "#";
    } else if (newMap[x][i] === "6") {
      break;
    }
  }
  return newMap;
};

const solution = (idx, Map, goalIdx) => {
  if (idx === goalIdx) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (Map[i][j] === "0") {
          sum += 1;
        }
      }
    }
    if (sum < min) {
      min = sum;
    }
  } else {
    const { x, y, value } = order[idx];
    switch (value) {
      case "1": {
        solution(idx + 1, checkTop(x, y, Map), goalIdx);
        solution(idx + 1, checkRight(x, y, Map), goalIdx);
        solution(idx + 1, checkLeft(x, y, Map), goalIdx);
        solution(idx + 1, checkBot(x, y, Map), goalIdx);
        break;
      }
      case "2": {
        solution(idx + 1, checkTop(x, y, checkBot(x, y, Map)), goalIdx);
        solution(idx + 1, checkRight(x, y, checkLeft(x, y, Map)), goalIdx);
        break;
      }
      case "3": {
        solution(idx + 1, checkTop(x, y, checkRight(x, y, Map)), goalIdx);
        solution(idx + 1, checkRight(x, y, checkBot(x, y, Map)), goalIdx);
        solution(idx + 1, checkBot(x, y, checkLeft(x, y, Map)), goalIdx);
        solution(idx + 1, checkLeft(x, y, checkTop(x, y, Map)), goalIdx);
        break;
      }
      case "4": {
        solution(
          idx + 1,
          checkTop(x, y, checkRight(x, y, checkLeft(x, y, Map))),
          goalIdx
        );
        solution(
          idx + 1,
          checkTop(x, y, checkRight(x, y, checkBot(x, y, Map))),
          goalIdx
        );
        solution(
          idx + 1,
          checkBot(x, y, checkRight(x, y, checkLeft(x, y, Map))),
          goalIdx
        );
        solution(
          idx + 1,
          checkTop(x, y, checkBot(x, y, checkLeft(x, y, Map))),
          goalIdx
        );
        break;
      }
      case "5": {
        solution(
          idx + 1,
          checkTop(
            x,
            y,
            checkRight(x, y, checkLeft(x, y, checkBot(x, y, Map)))
          ),
          goalIdx
        );
        break;
      }
    }
  }
};

solution(0, Map, order.length);
console.log(min);
