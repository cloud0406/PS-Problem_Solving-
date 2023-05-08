const [N, ...input] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16987.txt"
  )
  .toString()
  .trim()
  .split("\n");

const egg = input.map((v) => v.split(" ").map(Number));

function soloution() {
  let answer = 0;

  const dfs = (now) => {
    // 순회 전부 마치면 깨진 계란 찾아서 답 갱신
    if (now === +N) {
      let cnt = 0;
      for (let i = 0; i < +N; i++) {
        if (egg[i][0] <= 0) cnt++;
      }

      answer = Math.max(answer, cnt);
      return;
    }

    // 현재 잡은 계란 깨졌으면 다음 계란으로 넘어감
    if (egg[now][0] <= 0) dfs(now + 1);
    else {
      let flag = false; // 계란 깨기 시도 체크용
      for (let i = 0; i < +N; i++) {
        // 현재 손에 든 계란과 다른 계란이면서 깨지지 않은 계란을 선택
        if (now !== i && egg[i][0] > 0) {
          egg[now][0] -= egg[i][1];
          egg[i][0] -= egg[now][1];
          flag = true;

          dfs(now + 1);

          // 내구도 복구
          egg[now][0] += egg[i][1];
          egg[i][0] += egg[now][1];
        }
      }
      // 현재 손에든 계란 외에 더 이상 깰 계란이 없으면 종료 단계로 넘어감
      if (!flag) dfs(+N);
    }
  };

  dfs(0);

  return answer;
}

console.log(soloution());
