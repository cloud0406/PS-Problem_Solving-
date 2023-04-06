const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1005.txt"
  )
  .toString()
  .trim()
  .split("\n");

let T = +input[0];
let arr = [];
let i = 1;

// 테스트케이스별 입력 정제
while (T > 0) {
  let [n, k] = input[i].split(" ").map((el) => +el);
  let values = input[i + 1].split(" ").map((el) => +el);
  values.unshift(0);

  let map = new Map();

  for (let j = 0; j < k; j++) {
    let [from, to] = input[i + j + 2].split(" ").map((el) => +el);

    if (!map.has(to)) map.set(to, new Map());
    map.get(to).set(from, true);
  }

  let destination = +input[i + k + 2];

  arr.push({ n, values, map, destination });
  i += k + 3;
  T--;
}

arr.forEach(({ n, values, map, destination }) => {
  let dp = new Map(); // dp에 해당 목적지까지의 최단 시간을 갱신

  // 목적지에 도달하기 위해 필요한 각 루트들까지의 최소시간을 dp에갱신하며 마지막 목적지에 도달
  const aux = (k) => {
    // 해당 정점까지 걸리는 최소 시간이 갱신되지 않았다면
    if (!dp.has(k)) {
      // 출발지점의 최단 시간은 해당 건물을 짓는 시간
      if (!map.has(k)) dp.set(k, values[k]);
      else {
        let tmp = 0;

        map.get(k).forEach((val, key) => {
          tmp = Math.max(aux(key), tmp); // 재귀로 목적지 k에 도달하기 위해 거쳐야 하는 루트들의 최소시간을 갱신함
        });

        dp.set(k, tmp + values[k]); // [목적지까지의 최소 시간 + 현재 건물의 건설 속도]로 최소 시간 갱신
      }
    }
    return dp.get(k);
  };

  console.log(aux(destination));
});
