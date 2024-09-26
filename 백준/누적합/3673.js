const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/3673.txt"
  )
  .toString()
  .trim()
  .split("\n");

const C = +input[0];

for (let c = 1; c <= C; c++) {
  const [d, n] = input[c * 2 - 1].split(" ").map(Number);
  const nums = input[c * 2].split(" ").map(Number);

  const mods = new Array(d).fill(0);
  let cnt = 0;
  let sum = 0;

  // * 누적합을 하며 d로 나눴을 때, 나머지가 같은 경우끼리 빼면 d로 나누어 떨어지는 수를 구할 수 있음
  for (const num of nums) {
    // 누적합과 누적합의 나머지 구함
    sum += num;
    let mod = sum % d;

    // 현재 나머지 배열에 요소만큼 더해줌 -> ex) 현재 나머지 2라면, mods[2]에 담긴 수만큼 부분 수열을 만들 수 있기 때문
    cnt += mods[mod];
    mods[mod]++;

    if (mod === 0) cnt++; // 시작점부터 현재까지 쭉 연결했을때 0인 경우 처리
  }

  console.log(cnt);
}
