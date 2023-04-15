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

  // (0001, 1110)의 경우 해당 구성원들이 어느 팀이냐만 다르기 때문에 중복되므로 굳이 확인 필요 x
  const checkOverlap = (n) => {
    let cnt = 0;

    while (n > 0) {
      if (n & 1) cnt++;
      n = n >> 1; // ex: 13(1101) -> 6(110) , 10(1010) -> 5(101)
    }

    // 스타트팀의 인원이 총 인원의 절반보다 많을 경우는 건너뜀 , ex) 1110 -> 0001에서 이미 체크
    if (cnt <= Math.floor(N / 2)) return true;
    else return false;
  };

  const getSpec = (team) => {
    let spec = 0;

    for (let i = 0; i < team.length; i++) {
      for (let j = 0; j < team.length; j++) {
        spec += player[team[i]][team[j]];
      }
    }

    return spec;
  };

  // 1<<N : 2^n -> 비트 표기위해서 / 4명일경우 ~15(1111 : 4자리 필요)
  for (let i = 0; i < 1 << N; i++) {
    if (checkOverlap(i)) {
      let value = i;
      const start = [];
      const link = [];

      // 팀나누고.
      for (let j = 0; j < N; j++) {
        if (value & 1) start.push(j); // 해당 비트 1이면 스타트팀
        else link.push(j); // 해당 비트 0이면 링크팀

        value = value >> 1; // ex: 1101 -> 110 , 1010 -> 101
      }

      const specStart = getSpec(start);
      const specLink = getSpec(link);

      const specDiff = Math.abs(specLink - specStart);
      answer = Math.min(specDiff, answer);
    }
  }

  console.log(answer);
}

solution();
