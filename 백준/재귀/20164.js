const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20164.txt"
  )
  .toString()
  .trim();

function solution(input) {
  let max = -Infinity;
  let min = Infinity;

  const countOdd = (num) => {
    let result = 0;

    for (let x of num) {
      if (Number(x) % 2 !== 0) result++;
    }

    return result;
  };

  const divide = (N, cnt) => {
    cnt += countOdd(N);

    if (N.length === 1) {
      max = Math.max(max, cnt);
      min = Math.min(min, cnt);
      return;
    } else if (N.length === 2) {
      divide((Number(N[0]) + Number(N[1])).toString(), cnt);
    } else {
      for (let i = 1; i < N.length; i++) {
        for (let j = i + 1; j < N.length; j++) {
          divide(
            (
              Number(N.slice(0, i)) +
              Number(N.slice(i, j)) +
              Number(N.slice(j))
            ).toString(),
            cnt
          );
        }
      }
    }
  };

  divide(input, 0);

  return `${min} ${max}`;
}

console.log(solution(input));
