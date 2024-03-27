const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/12908.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [line1, line2, ...coords] = input;

let [XS, YS] = line1.trim().split(" ").map(Number);
let [XE, YE] = line2.trim().split(" ").map(Number);

// 8개의 좌표 배열 생성, 본인으로의 거리는 0
let Dist = [];
for (let i = 0; i < 8; i++) {
  Dist.push(new Array(8).fill(Infinity));
  Dist[i][i] = 0;
}

// 처음 출발점, 도착점 넣기
let Vec = [
  [XS, YS],
  [XE, YE],
];

for (let i = 0; i < 3; i++) {
  const [A, B, C, D] = coords[i].trim().split(" ").map(Number);
  Vec.push([A, B]);
  Vec.push([C, D]);

  // (A,B) -> (C,D)로 텔레포트 처리
  Dist[Vec.length - 2][Vec.length - 1] = 10;
  Dist[Vec.length - 1][Vec.length - 2] = 10;
}

for (let i = 0; i < Vec.length; i++) {
  for (let j = 0; j < 8; j++) {
    if (i === j) continue;

    const [x1, y1] = Vec[i];
    const [x2, y2] = Vec[j];
    const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);

    // x1, y1 -> x2, y2로 이동하는데 텔레포트보다 거리가 더 빠를 경우 최단 거리 갱신
    Dist[i][j] = Math.min(Dist[i][j], dist);
    Dist[j][i] = Math.min(Dist[j][i], dist);
  }
}

//  8개 각각의 좌표에서 다른 좌표까지 걸어서 이동할 때 걸리는 시간을 기록하고,
// 텔레포트가 가능한 경로라면 걸어서 이동할 때 걸리는 시간과 비교해 최솟값 갱신 완료

// 플로이드-와샬로 최종 최단 거리 갱신
for (let k = 0; k < Vec.length; k++) {
  for (let i = 0; i < Vec.length; i++) {
    for (let j = 0; j < Vec.length; j++) {
      Dist[i][j] = Math.min(Dist[i][j], Dist[i][k] + Dist[k][j]);
    }
  }
}

// 입력순대로 처음 입력 받은 출발점, 바로 다음 입력받은 도착점까지 최소 시간
console.log(Dist[0][1]);
