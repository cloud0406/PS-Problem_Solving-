const [T, ...input] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20437.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(T, input) {
  for (let i = 0; i < T; i++) {
    const W = input[0 + i * 2];
    const K = Number(input[1 + i * 2]);
    const checkSet = new Set();

    let min = Infinity;
    let max = -1;

    for (let word of W) {
      // 해당 알파벳을 이미 확인힌적 있으면 패스
      if (checkSet.has(word)) continue;
      checkSet.add(word);

      let left = (right = 0);
      let cnt = 0; // 배열내 해당 알파벳 개수
      let idx = 0; // 반복문 인덱스
      const idxCollection = []; // 해당 알파벳 인덱스 위치 모음
      let nextIdx = 0; // 위의 배열에서 left 인덱스 다음으로 옮기기 위함

      for (let curWord of W) {
        if (curWord === word) {
          idxCollection.push(idx);
          cnt++;

          if (cnt === 1) left = idx;

          if (cnt === K) {
            right = idx;
            min = Math.min(min, right - left + 1);
            max = Math.max(max, right - left + 1);

            // left 인덱스를 다음으로 변경해주고 알파벳 개수를 하나 줄임
            left = idxCollection[++nextIdx];
            cnt--;
          }
        }
        idx++;
      }
    }

    if (max === -1) console.log(max);
    else console.log(min, max);
  }
}

solution(T, input);
