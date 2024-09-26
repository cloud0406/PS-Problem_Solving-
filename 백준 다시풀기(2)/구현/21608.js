const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21608.txt"
  )
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const studentPrefs = input.slice(1).map((line) => line.split(" ").map(Number));
const board = Array.from({ length: N }, () => Array(N).fill(0));

function solution(studentPrefs) {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const studentLikes = {};
  let studentsOrder = [];
  let totalSatisfaction = 0;

  // 학생의 좋아하는 친구 리스트 저장
  for (let [student, ...likes] of studentPrefs) {
    studentsOrder.push(student);
    studentLikes[student] = likes;
  }

  // 좌석 배치
  for (let student of studentsOrder) {
    let bestSeat = [-1, -1]; // 가장 적합한 자리
    let maxLikes = -1; // 좋아하는 친구 수
    let maxEmpty = -1; // 빈 자리 수

    // 빈 자리 탐색하여 최적 좌석 찾기
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] !== 0) continue;

        let likeCount = 0;
        let emptyCount = 0;

        for (let [dx, dy] of directions) {
          const [newRow, newCol] = [row + dx, col + dy];
          if (newRow < 0 || newRow >= N || newCol < 0 || newCol >= N) continue;

          if (studentLikes[student].includes(board[newRow][newCol]))
            likeCount++;
          if (board[newRow][newCol] === 0) emptyCount++;
        }

        // 좋아하는 친구 수와 빈 자리 수 기준으로 최적의 좌석 찾기
        if (
          likeCount > maxLikes ||
          (likeCount === maxLikes && emptyCount > maxEmpty)
        ) {
          maxLikes = likeCount;
          maxEmpty = emptyCount;
          bestSeat = [row, col];
        }
      }
    }

    const [bestRow, bestCol] = bestSeat;
    board[bestRow][bestCol] = student;
  }

  // 만족도 계산
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      let student = board[row][col];
      let likeCount = 0;

      for (let [dx, dy] of directions) {
        const [newRow, newCol] = [row + dx, col + dy];
        if (newRow < 0 || newRow >= N || newCol < 0 || newCol >= N) continue;

        if (studentLikes[student].includes(board[newRow][newCol])) likeCount++;
      }

      // 만족도에 따른 점수 계산
      if (likeCount === 1) totalSatisfaction += 1;
      else if (likeCount === 2) totalSatisfaction += 10;
      else if (likeCount === 3) totalSatisfaction += 100;
      else if (likeCount === 4) totalSatisfaction += 1000;
    }
  }

  return totalSatisfaction;
}

console.log(solution(studentPrefs));
