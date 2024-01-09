const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13905.txt"
  )
  .toString()
  .trim();
const [nm, se, ...data] = input.split`\n`.map((e) => e.split` `.map(Number));

function solution([n, m], [s, e], data) {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  const find = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  };

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if (s1 === s2) return;
    if (s1 < s2) parent[s2] = s1;
    else parent[s1] = s2;
  };

  const getSameParent = (x, y) => {
    return find(x) === find(y);
  };

  data.sort((a, b) => b[2] - a[2]);

  for (const [h1, h2, k] of data) {
    if (getSameParent(h1, h2)) continue;
    union(h1, h2);
    if (getSameParent(s, e)) {
      return k;
    }
  }
  return 0;
}

console.log(solution(nm, se, data));
