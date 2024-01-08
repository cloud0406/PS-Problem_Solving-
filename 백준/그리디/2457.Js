const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2457.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

let cnt = 0;

// 기준 날짜를 넘지 않고 가장 오래 지속되는 꽃을 고름
const find = () => {
  let month = 3;
  let day = 1;

  let index = -1;

  let endMonth = 0;
  let endDay = 0;

  const visit = Array(N).fill(false);

  while (true) {
    for (let i = 0; i < N; i++) {
      if (visit[i]) continue;

      // 해당 꽃이 피는 날짜가 기준 날짜(month, day) 보다 이전인지 체크
      if (arr[i][0] < month || (arr[i][0] === month && arr[i][1] <= day)) {
        // endMonth, endDay를 갱신하며 가장 늦게 지는 꽃 체크
        if (
          arr[i][2] > endMonth ||
          (arr[i][2] === endMonth && arr[i][3] > endDay)
        ) {
          index = i;
          endMonth = arr[i][2];
          endDay = arr[i][3];
        }
      }
    }

    // 만족하는 꽃이 없으면 0 출력
    if (index == -1) {
      console.log(0);
      break;
    }

    month = arr[index][2];

    // 11월 30일까지 꽃이 하나라도 피어있어야 됨 -> 12월에 지는 꽃을 찾으면 종료
    if (month === 12) {
      console.log(cnt + 1);
      break;
    }

    // 정보 초기화 해주고 다음 꽃 찾음 -> 현재 선택한 꽃보다 이전에 피는 꽃들 중 가장 늦게 지는 꽃 찾기
    day = arr[index][3];
    visit[index] = true;
    cnt++;
    endMonth = 0;
    endDay = 0;
    index = -1;
  }
};

find();
