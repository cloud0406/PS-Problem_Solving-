const [N, ...player] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/15661.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

function solution() {
  let answer = Infinity;

  // 비트를 하나씩 이동하며 각 요소가 1인지 확인
  const check = (n) => {
    let cnt = 0;

    while (n > 0) {
      if (n & 1) cnt++;
      n = n >> 1; // ex: 13(1101) -> 6(110) , 10(1010) -> 5(101)
    }

    // 비트로 나타냈을때, 1이 0과 같거나 적으면 true
    if (cnt <= Math.floor(N / 2)) return true;
    else return false;
  };

  const getSpec = (arr) => {
    let spec = 0;
    for (let i = 0; i < arr.length; i++) {
      const x = arr[i];
      for (let j = 0; j < arr.length; j++) {
        if (i == j) continue;
        const y = arr[j];
        spec += player[x][y];
      }
    }

    return spec;
  };

  // 1<<N : 2^n -> 비트 표기위해서 / 4명일경우 ~15(1111 : 4자리 필요)
  for (let i = 0; i < 1 << N; i++) {
    if (check(i)) {
      let value = i;
      const start = [];
      const link = [];

      // 팀나누고.
      for (let j = 0; j < N; j++) {
        if (value & 1) start.push(j); // 해당 비트 1이면 스타트팀
        else link.push(j); // 해당 비트 0이면 링크팀

        value = value >> 1;
      }

      console.log(start);

      const specStart = getSpec(start);
      console.log(specStart);
      const specLink = getSpec(link);

      const specDiff = Math.abs(specLink - specStart);
      answer = Math.min(specDiff, answer);
    }
  }

  console.log(answer);
}

solution();
