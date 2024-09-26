const fs = require("fs");

// 입력을 받기 위한 코드
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1083.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const v = input[1].split(" ").map(Number);
let s = +input[2];

// 각 인덱스에서부터 가능한 최대한 큰 숫자를 앞으로 이동시킴
for (let i = 0; i < n && s > 0; i++) {
  let max = v[i]; // 최대 숫자
  let maxi = i; // 최대 숫자의 인덱스

  // 현재 인덱스 ~ 이동범위 s만큼 탐색하며 가장 큰 숫자 찾기
  for (let j = i + 1; j < n && j <= i + s; j++) {
    if (max < v[j]) {
      max = v[j];
      maxi = j;
    }
  }

  s -= maxi - i; // 최대 숫자 앞으로 이동시킨 만큼 이동 횟수 차감

  // 현 위치에 최대 숫자 넣기전 한칸식 뒤로 미루기
  while (maxi > i) {
    v[maxi] = v[maxi - 1];
    maxi--;
  }

  v[i] = max; // 현재 자리에 최대 숫자 넣기
}

console.log(v.join(" "));
