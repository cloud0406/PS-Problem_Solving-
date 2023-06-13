const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13397.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function soloution(N, M, arr) {
  let answer = Infinity;

  let left = 0;
  let right = Math.max(...arr) - Math.min(...arr);
  let mid = Math.floor((left + right) / 2); // 구하고자 하는 '구간의 점수의 최대값의 최솟값'을 mid로 둠

  // mid값으로 M개 이하의 구간을 나눌 수 있는지 체크
  const divide = (mid) => {
    let cnt = 1;
    let min = (max = arr[0]);

    arr.forEach((item, idx) => {
      if (item > max) max = item;
      if (item < min) min = item;

      // 현재 구간 '최대값 - 최소값'이 mid보다 크면 구간 하나 늘림 -> 현재값을 최소, 최대값으로 정하고 다시 구간만들기
      if (max - min > mid) {
        cnt++;
        min = max = arr[idx];
      }
    });

    return M >= cnt; // 구간 수가 M개 이하인지 체크
  };

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // 해당 값으로 M개 이하로 구간을 나눌 수 있으면 mid값을 더 줄여보고 나눌 수 없으면 mid값을 늘려봄
    if (divide(mid)) {
      right = mid - 1;
      answer = Math.min(answer, mid); // 나눌 수 있다면 최솟값을 갱신
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

console.log(soloution(N, M, arr));
