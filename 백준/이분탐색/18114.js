const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18114.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const weights = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function soloution() {
  const binarySearch = (start, end, target, weights) => {
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      if (weights[mid] === target) return mid;
      if (weights[mid] < target) start = mid + 1;
      else end = mid - 1;
    }

    return -1;
  };

  const combination = (N, C, weights) => {
    if (binarySearch(0, N - 1, C, weights) >= 0) return true;

    let i = 0;
    let j = N - 1;
    while (i < j) {
      const weightSum = weights[i] + weights[j];
      if (weightSum > C) j--;
      else if (weightSum === C) return true;
      else {
        const diff = C - weightSum;

        if (
          diff !== weights[i] &&
          diff !== weights[j] &&
          binarySearch(0, N - 1, diff, weights) >= 0
        ) {
          return true;
        }

        i++;
      }
    }

    return false;
  };

  return combination(N, C, weights) ? 1 : 0;
}

console.log(soloution());
