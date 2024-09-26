// 입력 처리
const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1132.txt"
  )
  .toString()
  .trim()
  .split("\n");

let N = parseInt(input[0]);
const inputArr = [];
const isFront = []; // 각 문자가 앞에 등장했는지 여부를 기록할 배열

for (let i = 1; i <= N; i++) {
  let line = input[i];
  let len = line.length;

  line.split("").forEach((c, idx) => {
    const obj = inputArr.find(({ key }) => key === c);
    const value = Math.pow(10, len - idx - 1); // 자릿수에 따른 값 계산

    if (!obj) {
      inputArr.push({ key: c, value }); // 해당 문자가 처음 등장한 경우
    } else {
      obj.value += value; // 이미 등장한 문자라면 값 누적
    }

    if (idx === 0) {
      isFront[c] = true; // 첫 번째 위치에 등장한 문자 체크
    }
  });
}

const solution = () => {
  const map = new Map();

  //  value 기준 내림차순
  inputArr.sort((a, b) => b.value - a.value);

  if (inputArr.length === 10) {
    // 0 배치하기
    for (let i = 9; i >= 0; i--) {
      const key = inputArr[i].key;
      if (!isFront[key]) {
        map.set(key, 0); // 0으로 배치할 문자를 찾았을 때
        break;
      }
    }
  }

  let num = 9; // 숫자 9부터 시작
  inputArr.forEach(({ key }) => {
    if (!map.has(key)) {
      map.set(key, num--); // 해당 문자가 map에 없으면 할당
    }
  });

  let sum = 0;
  inputArr.forEach(({ key, value }) => {
    sum += value * map.get(key); // 각 문자의 값과 배정된 숫자를 곱해 더함
  });

  console.log(sum);
};

solution();
