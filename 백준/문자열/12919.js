let [S, T] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/12919.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(S, T) {
  while (T.length >= S.length) {
    if (S === T) return 1;
    let reverseT = T.split("").reverse().join("");

    if (T[0] === "B" && reverseT[0] === "B") {
      T = reverseT.slice(0, -1);
    } else if (T[0] === "B" && reverseT[0] === "A") {
      if (reverseT.slice(0, -1) === S) return 1;
      else if (
        reverseT.slice(0, S.length) === S &&
        reverseT.length > S.length &&
        !reverseT.slice(S.length).includes("B")
      ) {
        return 1;
      } else {
        T = T.slice(0, -1);
      }
    } else if (T[0] === "A" && reverseT[0] === "A") {
      T = T.slice(0, -1);
    } else return 0;
  }

  return 0;
}

console.log(solution(S, T));
