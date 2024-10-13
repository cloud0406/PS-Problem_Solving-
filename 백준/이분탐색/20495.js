const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20495.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input.shift(); // 첫 번째 줄에서 n 추출
const minRanges = []; // x - y
const maxRanges = []; // x + y
const sortedMinRanges = []; // 정렬 x - y
const sortedMaxRanges = []; // 정렬 x + y

for (const line of input) {
  const [center, tolerance] = line.split(" ").map(Number);
  const minRange = center - tolerance;
  const maxRange = center + tolerance;

  minRanges.push(minRange);
  maxRanges.push(maxRange);
  sortedMinRanges.push(minRange);
  sortedMaxRanges.push(maxRange);
}

sortedMinRanges.sort((a, b) => a - b);
sortedMaxRanges.sort((a, b) => a - b);

// 이진 탐색 함수 정의
const lowerBound = (arr, value) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= value) right = mid - 1;
    else left = mid + 1;
  }

  return left;
};

const upperBound = (arr, value) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= value) left = mid + 1;
    else right = mid - 1;
  }

  return right;
};

const answer = minRanges.map((minRange, i) => {
  const maxRange = maxRanges[i];
  const minPosition = lowerBound(sortedMaxRanges, minRange) + 1; // 작은 index
  const maxPosition = upperBound(sortedMinRanges, maxRange) + 1; // 큰 index
  return `${minPosition} ${maxPosition}`;
});

console.log(answer.join("\n"));
