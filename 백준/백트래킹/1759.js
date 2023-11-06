const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1759.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [L, C] = input.shift().split(" ").map(Number);
const words = input.shift().split(" ").sort();
const vowel = ["a", "e", "i", "o", "u"];
const answer = [];

function solution(str, startIndex) {
  if (str.length === L) {
    let cnt = 0;

    for (let i = 0; i < str.length; i++) {
      if (vowel.includes(str[i])) cnt++;
    }

    if (cnt > 0 && L - cnt > 1) answer.push(str);

    return;
  } else {
    for (let i = startIndex; i < C; i++) {
      solution(str + words[i], i + 1);
    }
  }

  return answer;
}

solution("", 0);

console.log(answer.join("\n"));
