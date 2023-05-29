const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1477.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, L] = input[0].split(" ").map(Number);
let arr = N === 0 ? [] : input[1].split(" ").map(Number); // 현재 휴게소 개수(N)가 0일 수도 있음
const dist = [0, ...arr, L];
dist.sort((a, b) => a - b);

function solution(N, M, L, dist) {
  // 휴게소 간격의 최소값, 최대값
  let left = 1;
  let right = L - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // '휴게소 간격' 설정

    let cnt = 0; // 위에서 설정한 값으로 휴개소를 몇 개 만들 수 있는지 체크
    for (let i = 1; i < dist.length; i++) {
      // 같은 위치 설치 못하므로 1더빼줌 -> ex) 간격: 300 , 위치: 200, 500 일 경우 설치 불가
      cnt += Math.floor((dist[i] - dist[i - 1] - 1) / mid);
    }

    if (cnt > M) left = mid + 1; // 덜 설치해야할 경우 -> 간격 늘림
    else right = mid - 1; // 더 설치해야할 경우 -> 간격 좁힘
  }

  return left; // 최소 값 리턴
}

console.log(solution(N, M, L, dist));
