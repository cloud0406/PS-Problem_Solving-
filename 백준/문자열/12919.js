let [S, T] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/12919.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(S, T) {
  const case1 = (T) => T.slice(0, -1);

  const case2 = (T) => T.split("").reverse().join("").slice(0, -1);

  const game = (T) => {
    if (T.length < S.length) return false;
    if (T === S) return true;

    const firstChar = T[0];
    const lastChar = T[T.length - 1];

    if (firstChar === "B" && lastChar === "B") return game(case2(T));
    if (firstChar === "B" && lastChar === "A") {
      return game(case1(T)) || game(case2(T));
    }
    if (firstChar === "A" && lastChar === "A") return game(case1(T));
    if (firstChar === "A" && lastChar === "B") return false;
  };

  return game(T) ? 1 : 0;
}

console.log(solution(S, T));
