const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input/9079.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  const N = parseInt(input[0]);

  const map = input.slice(1);

  let maze = [];

  // 모두 같은 면(앞면 or 뒷면)인지 체크
  const check = () => {
    let h = 0;
    let t = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (maze[i][j] == "H") h++;
        else t++;
      }
    }

    if (h == 9 || t == 9) return true;
    else return false;
  };

  // 행, 열, 대각선 반대 값으로 변경
  const rowChange = (col) => {
    for (let i = 0; i < 3; i++) {
      maze[i][col] = maze[i][col] === "H" ? "T" : "H";
    }
  };
  const colChange = (row) => {
    for (let i = 0; i < 3; i++) {
      maze[row][i] = maze[row][i] === "H" ? "T" : "H";
    }
  };
  const crossChange = (dir) => {
    for (let i = 0; i < 3; i++) {
      // 왼쪽 위 -> 오른쪽 아래 방향 대각선 변경
      if (dir == 0) {
        maze[i][i] = maze[i][i] == "H" ? "T" : "H";
      }
      // 오른쪽 위 -> 왼쪽 아래 방향 대각선 변경
      else {
        maze[i][2 - i] = maze[i][2 - i] == "H" ? "T" : "H";
      }
    }
  };

  let answer = 1415;

  // 3x3 배열 문자열 하나로 합치기 -> ex) HTTHTTTHH
  const strTrans = () => {
    let str = "";
    maze.forEach((row) => {
      row.forEach((val) => {
        if (val === "H" || val === "H\r") str += "H";
        else str += "T";
      });
    });
    return str;
  };

  // 문자열 3x3 배열에 넣기 -> ex) [T,T,T,H,H,H,T,T,T]
  const mazeTrans = (state) => {
    let cur = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        maze[i][j] = state[cur++];
      }
    }
    // console.log(state);
  };

  const bfs = () => {
    const visited = new Map();
    const queue = [];
    const first = strTrans(); // 3x3 배열 하나의 문자열로 변경

    queue.push([first, 0]); // 큐에 [해당 문자열, 뒤집기 횟수] 추가

    visited.set(first, true); // 해당 문자열 방문기록 남김

    // 행, 열, 대각선을 뒤집으며 각 경우들을 큐에 추가하고 하나씩 체크
    while (queue.length) {
      const [cur, depth] = queue.shift(); // 큐에서 현재 문자열과 뒤집기 횟수 추출

      mazeTrans(cur); // 합친 문자열 3x3 배열에 넣기

      if (check()) return depth; // 모두 같은 면이면 뒤집은 횟수 리턴

      // 행 뒤집기
      for (let i = 0; i < 3; i++) {
        rowChange(i);
        let nxt = strTrans();

        // 방문여부 체크, 안했으면 체크해주고 큐에 추가
        if (!visited.get(nxt)) {
          visited.set(nxt, true);
          queue.push([nxt, depth + 1]);
        }

        // 다시 뒤집어서 원래대로 위치 변경
        rowChange(i);
      }

      // 열 뒤집기
      for (let i = 0; i < 3; i++) {
        colChange(i);
        let nxt = strTrans();

        // 방문여부 체크, 안했으면 체크해주고 큐에 추가
        if (!visited.get(nxt)) {
          visited.set(nxt, true);
          queue.push([nxt, depth + 1]);
        }

        // 다시 뒤집어서 원래대로 위치 변경
        colChange(i);
      }

      // 대각선 뒤집기
      for (let i = 0; i <= 1; i++) {
        crossChange(i);
        let nxt = strTrans();

        // 방문여부 체크, 안했으면 체크해주고 큐에 추가
        if (!visited.get(nxt)) {
          visited.set(nxt, true);
          queue.push([nxt, depth + 1]);
        }

        // 다시 뒤집어서 원래대로 위치 변경
        crossChange(i);
      }
    }
  };

  let ans = "";
  // N번 반복
  for (let i = 0; i < N * 3; i += 3) {
    // input값 배열 3x3 크기만큼 자르기
    maze = [];
    maze.push(map[i].split(" "));
    maze.push(map[i + 1].split(" "));
    maze.push(map[i + 2].split(" "));

    const answer = bfs();

    // 모든 경우 체크해도 안될 경우 리턴 값 없음 -> undefined
    if (answer === undefined) ans += `-1\n`;
    else ans += `${answer}\n`;
  }

  return ans;
};

console.log(solution(input));
