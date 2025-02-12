const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18119.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [n, m] = input[line++].split(" ").map(Number);

// 단어들을 미리 비트마스크로 변환하여 저장
const words = new Array(n);
for (let i = 0; i < n; i++) {
  const word = input[line++];
  let mask = 0;
  for (let j = 0; j < word.length; j++) {
    mask |= 1 << (word[j].charCodeAt(0) - 97);
  }
  words[i] = mask;
}

// 모든 알파벳을 알고 있는 상태로 시작 (1로 채워진 26비트)
let knowingAlp = (1 << 26) - 1;

// 쿼리 처리를 더 효율적으로 수행
const result = [];
for (let i = 0; i < m; i++) {
  const [o, x] = input[line++].split(" ");
  const idx = x.charCodeAt(0) - 97;

  if (o === "1") {
    knowingAlp &= ~(1 << idx);
  } else {
    knowingAlp |= 1 << idx;
  }

  // 현재 알고 있는 단어 수 계산
  let count = 0;
  for (let j = 0; j < n; j++) {
    if ((knowingAlp & words[j]) === words[j]) {
      count++;
    }
  }
  result.push(count);
}

// 한 번에 출력
console.log(result.join("\n"));
