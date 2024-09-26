const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16434.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(BigInt));

const [N, initialATK] = input.shift();
let answer = Infinity;

const fight = (hp, atk) => {
  const maxHP = hp;

  for (let i = 0n; i < N; i++) {
    const [type, a, h] = input[i];

    switch (type) {
      case 1n: // 몬스터와 전투
        // 몬스터를 죽이기 위한 공격 수
        // 소수점 올림 위한 처리 -> Ex) h=10, atk=3 -> 4번 공격해야함
        const hitsToKillMonster = (h + atk - 1n) / atk;
        const damageTaken = (hitsToKillMonster - 1n) * a; // 받는 총 데미지
        hp -= damageTaken;

        if (hp <= 0n) return false; // 만약 HP가 0 이하로 떨어지면 실패
        break;

      case 2n: // 포션 먹기
        atk += a;
        hp = hp + h > maxHP ? maxHP : hp + h; // 최대 HP 초과하지 않도록 조정
        break;
    }
  }

  return true;
};

let minHP = 1n;
let maxHP = 1n;

input.forEach(([type, a, h]) => {
  if (type === 1n) {
    maxHP += ((h + initialATK - 1n) / initialATK) * a; // 최대 HP 계산
  }
});

// 이분 탐색 시작
while (minHP <= maxHP) {
  const midHP = (minHP + maxHP) / 2n;

  if (fight(midHP, initialATK)) {
    answer = midHP < answer ? midHP : answer;
    maxHP = midHP - 1n;
  } else {
    minHP = midHP + 1n;
  }
}

console.log(answer.toString());
