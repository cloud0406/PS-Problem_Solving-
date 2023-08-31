const N = +require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2661.txt"
  )
  .toString()
  .trim();

function soloution(N) {
  // 숫자 '좋은 수열' 인지 체크
  const check = (num) => {
    // 뒤에서부터 길이를 하나씩 늘려가며 (전체 길이의 절반까지) 펠린드롬인지 확인
    for (let i = 1; i < Math.floor(num.length / 2) + 1; i++) {
      if (num.slice(-i) === num.slice(-i * 2, -i)) return false;
    }
    return true;
  };

  const dfs = (num) => {
    if (num.length === N) {
      console.log(num);
      return true; // 그냥 return으로 하면 시간 초과
    }

    // 1부터 3까지 작은 숫자부터 넣고 최소값을 만들기
    for (let i = 1; i <= 3; i++) {
      if (check(num + String(i)) && dfs(num + String(i))) return true;
    }

    return false;
  };

  dfs("1");
}

soloution(N);
