const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15811.txt"
  )
  .toString()
  .trim()
  .split("\n");

// 입력 처리
const [op1, op2, ans] = input[0].split(" ").map((str) => str.split(""));

/**
 * 순열 생성 함수
 */
function* permutations(arr, r) {
  const n = arr.length;
  if (r === 1) {
    for (const item of arr) {
      yield [item];
    }
    return;
  }

  for (let i = 0; i < n; i++) {
    const fixed = arr[i];
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest, r - 1)) {
      yield [fixed, ...perm];
    }
  }
}

/**
 * 수식이 성립하는지 확인하는 함수
 */
function solve(alnumDict) {
  let fir = 0,
    sec = 0,
    thi = 0;

  for (const char of op1) {
    fir = fir * 10 + alnumDict[char];
  }
  for (const char of op2) {
    sec = sec * 10 + alnumDict[char];
  }
  for (const char of ans) {
    thi = thi * 10 + alnumDict[char];
  }

  return thi === fir + sec;
}

// 알파벳 리스트 생성 (중복 제거 및 정렬)
const alphaList = Array.from(new Set([...op1, ...op2, ...ans])).sort();
const alphaLength = alphaList.length;

// 0~9까지의 숫자 배열
const nums = Array.from({ length: 10 }, (_, i) => i);

// 알파벳이 10개를 초과하면 불가능
if (alphaLength > 10) {
  console.log("NO");
  process.exit(0);
}

// 가능한 모든 순열에 대해 검사
for (const perm of permutations(nums, alphaLength)) {
  const alnumDict = {};

  // 알파벳-숫자 매핑 생성
  for (let i = 0; i < alphaLength; i++) {
    alnumDict[alphaList[i]] = perm[i];
  }

  // 해당 매핑으로 수식이 성립하는지 확인
  if (solve(alnumDict)) {
    console.log("YES");
    process.exit(0);
  }
}

console.log("NO");
