const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/23559.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  const [N, X] = input[0].split(" ").map(Number);

  // 각 메뉴 맛 차이 저장
  const menus = [];
  for (let i = 1; i <= N; i++) {
    const [A, B] = input[i].split(" ").map(Number);
    menus.push([A, B, A - B]); // [5000원 메뉴 맛, 1000원 메뉴 맛, 맛 차이]
  }

  // 맛 차이를 기준 -> 내림차순 정렬
  menus.sort((a, b) => b[2] - a[2]);

  let money = X - 1000 * N; // 1000원짜리 전부 구매했다고 가정
  let answer = menus.reduce((sum, menu) => sum + menu[1], 0); // 1000원짜리 전체 맛의 합

  // 맛 차이가 큰 순서대로 5000원 메뉴로 교체 가능한지 확인
  for (const [taste5000, taste1000, diff] of menus) {
    if (money >= 4000 && diff > 0) {
      answer += diff;
      money -= 4000;
    } else {
      break;
    }
  }

  console.log(answer);
}

solution();
