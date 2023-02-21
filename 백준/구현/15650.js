const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input/15650.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const getCombinations = function (arr, selectNumber) {
  const results = [];

  // n개중에서 1개 선택할 때(nC1) -> 모든 배열의 원소 return
  if (selectNumber === 1) return arr.map((ele) => [ele]);

  arr.forEach((ele, idx, array) => {
    const rest = array.slice(idx + 1); // 해당 원소를 제외한 나머지 뒷부분을 배열로 만듬 (해당 원소를 fix하는 작업)

    const combinations = getCombinations(rest, selectNumber - 1); // 위에서 만든 나머지 부분에 대해 다시 조합을 구함

    const attached = combinations.map((e) => [ele, ...e]); // 구한 조합에 fix 해두었던 값 붙임

    results.push(...attached); // 답에 추가
  });

  return results;
};

const arr = Array.from({ length: n }, (ele, i) => i + 1);
const answer = getCombinations(arr, m);

console.log(answer.map((e) => e.join(" ")).join("\n"));
