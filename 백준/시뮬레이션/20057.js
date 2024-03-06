/*
방향별로 어디가 몇퍼인지 구할수있도록 식 직접 작성

방향전환의 규칙성
    이동 전환 이동 전환
    이동 이동 전환 이동 이동 전환
    이동 이동 이동 전환 이동 이동 이동 전환
    ...
    맨 마지막에(1,1로 이동 포함)는 이동-전환 3회임
*/

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20057.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const map = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, map) {
  let answer = 0;

  // row, col 순
  const directions = [
    [0, -1], // 왼쪽
    [1, 0], // 아래
    [0, 1], // 오른쪽
    [-1, 0], // 위
  ];
  const ALPHA = -1;

  // 전환될 때마다 비율도 해당 방향으로 회전
  const get_spread_info = (direction) => {
    // 기본 구조 (왼쪽으로 이동)
    const spread_left = [
      [-2, 0, 0.02],
      [-1, -1, 0.1],
      [-1, 0, 0.07],
      [-1, 1, 0.01],
      [0, -2, 0.05],
      [1, -1, 0.1],
      [1, 0, 0.07],
      [1, 1, 0.01],
      [2, 0, 0.02],
      [0, -1, ALPHA],
    ];

    if (direction === 0) return spread_left;
    else if (direction === 1)
      return spread_left.map((x) => [-x[1], x[0], x[2]]);
    else if (direction === 2)
      return spread_left.map((x) => [x[0], -x[1], x[2]]);
    else return spread_left.map((x) => [x[1], x[0], x[2]]);
  };

  const spared_infos = Array.from([0, 1, 2, 3], (x) => get_spread_info(x));

  // 격자 가운데칸에서 시작
  let row = Math.floor(N / 2);
  let col = row;
  let direction = 0; // 처음 방향은 왼쪽, -> 아래 -> 오른쪽 -> 위 순으로

  // 격자 밖으로 나갔는지 확인
  const out_of_bound = (row, col) => {
    if (0 > row || row >= N || 0 > col || col >= N) return true;
    else return false;
  };

  const move_tornado = (row, col, direction) => {
    // 방향별 비율 세팅
    let spread_info = spared_infos[direction];

    // 방향에 따라 현재 좌표 이동
    let [dr, dc] = directions[direction];
    row += dr;
    col += dc;

    let cur_sand = map[row][col]; // 현재 위치 모래
    map[row][col] = 0; // 모래가 이동한 위치는 0으로 초기화

    let alpha_sand = cur_sand; // 비율이 적혀있는 칸으로 이동하지 않은 남은 모래의 양
    let out_sand = 0; // 격자 밖으로 나간 모래의 양

    for (let [dr, dc, ratio] of spread_info) {
      let r2 = row + dr;
      let c2 = col + dc;

      let move_sand =
        ratio != ALPHA ? Math.floor(cur_sand * ratio) : alpha_sand; // 비율이 -1이면 알파 -> 남은 모래의 양

      // 격자 밖으로 나간 모래 처리
      if (out_of_bound(r2, c2)) out_sand += move_sand;
      else map[r2][c2] += move_sand;

      alpha_sand -= move_sand;
    }

    return [row, col, out_sand];
  };

  // 이동 횟수
  for (let move = 1; move < N; move++) {
    // 이동-전환 사이클 2회
    for (let i = 0; i < 2; i++) {
      // 이동
      for (let j = 0; j < move; j++) {
        [row, col, out_sand] = move_tornado(row, col, direction);
        answer += out_sand;
      }

      direction = (direction + 1) % 4; // 방향 전환
    }
  }

  // 맨 마지막 (1,1로 이동)은 기존 사이클(2회)보다 한 번 더 이동함
  for (let j = 0; j < N - 1; j++) {
    [row, col, out_sand] = move_tornado(row, col, direction);
    answer += out_sand;
  }

  return answer;
}
console.log(solution(N, map));
