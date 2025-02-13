const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2310.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
let n, visited, rooms, answer;

function dfs(roomNum, myMoney) {
  if (answer === 1) return;

  if (rooms[roomNum][0] === "L") {
    // 레프리콘
    if (rooms[roomNum][1] > myMoney) myMoney = rooms[roomNum][1];
  } else if (rooms[roomNum][0] === "T") {
    // 트롤
    if (rooms[roomNum][1] > myMoney) return;
    else myMoney -= rooms[roomNum][1];
  }

  if (roomNum === n - 1) {
    answer = 1;
    return;
  }

  visited[roomNum] = true;
  for (let nextRoom of rooms[roomNum][2]) {
    const nextRoomNum = parseInt(nextRoom) - 1;
    if (!visited[nextRoomNum]) dfs(nextRoomNum, myMoney);
  }
  visited[roomNum] = false;
}

let result = [];
while (true) {
  n = parseInt(input[line++]);
  if (n === 0) break;

  visited = new Array(n).fill(false);
  rooms = [];
  answer = 0;

  for (let i = 0; i < n; i++) {
    const tmp = input[line++].split(" ");
    rooms.push([
      tmp[0], // 방 타입
      parseInt(tmp[1]), // 금액
      tmp.slice(2, -1), // 연결된 방 번호들
    ]);
  }

  dfs(0, 0);
  result.push(answer === 0 ? "No" : "Yes");
}

console.log(result.join("\n"));
