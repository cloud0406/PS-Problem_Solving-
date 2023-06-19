const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1092.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const crane = input[1].split(" ").map(Number);
const M = +input[2];
const box = input[3].split(" ").map(Number);

function soloution(N, crane, M, box) {
  crane.sort((a, b) => b - a);
  box.sort((a, b) => b - a);

  if (box[0] > crane[0]) return -1;

  const craneArr = new Array(N).fill(0);
  let craneWeight = 0;

  for (let i = 0; i < M; i++) {
    let boxWeight = box[i];

    if (crane[craneWeight] >= boxWeight) {
      craneArr[craneWeight]++;

      // 가장 무거운 크레인이거나, 바로 이전 무게의 크레인 만큼 옮겼다면 다음 크레인으로 이동
      if (
        craneWeight === 0 ||
        craneArr[craneWeight - 1] === craneArr[craneWeight]
      ) {
        craneWeight++;
      }
    } else {
      // 현재 크레인으로 못 옮기면 다시 젤 무거운 크레인으로 옮김, 이후 다음 크레인으로 이동
      craneWeight = 0;
      craneArr[craneWeight++]++;
    }
  }

  return craneArr[0];
}

console.log(soloution(N, crane, M, box));
