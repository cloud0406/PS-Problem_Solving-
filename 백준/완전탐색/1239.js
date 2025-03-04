const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1239.txt"
  )
  .toString()
  .trim()
  .split("\n");

function getPermutations(arr) {
  if (arr.length === 1) return [arr];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const fixed = arr[i];
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = getPermutations(rest);

    for (const perm of perms) {
      result.push([fixed, ...perm]);
    }
  }
  return result;
}

function check(arr) {
  const line = [];
  let sum = 0;
  let count = 0;

  for (const num of arr) {
    sum += num;
    line.push(sum);
  }

  // 50이 되는 쌍 찾기
  for (let i = 0; i < line.length - 1; i++) {
    for (let j = i + 1; j < line.length; j++) {
      if (line[i] + 50 === line[j]) {
        count++;
      }
    }
  }

  return count;
}

function solution() {
  const N = +input[0];
  const numbers = input[1].split(" ").map(Number);

  // 50보다 큰 수 0 반환
  if (Math.max(...numbers) > 50) {
    return 0;
  }

  let maxCount = 0;
  const permutations = getPermutations(numbers);

  for (const perm of permutations) {
    const count = check(perm);
    maxCount = Math.max(maxCount, count);
  }

  return maxCount;
}

console.log(solution());
