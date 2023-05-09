const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9934.txt"
  )
  .toString()
  .trim()
  .split("\n");

const K = +input[0];
const arr = input[1].split(" ").map(Number);
const answer = Array.from({ length: K }, () => []);

function makeTree(tree, L) {
  // 자르다 마지막 레벨에 도달하면 배열에 원소 하나만 남음
  if (L === K - 1) {
    answer[L].push(tree.pop());
    return;
  }

  const center = Math.floor(tree.length / 2); // 가운데 요소가 부모
  const leftTree = tree.slice(0, center); // 부모 기준 왼쪽 부분 떼어냄
  const rightTree = tree.slice(center + 1, tree.length); // 부모 기준 오른쪽 부분 떼어냄

  answer[L].push(tree[center]); // 부모 요소 푸쉬
  makeTree(leftTree, L + 1); // 잘라낸 왼쪽 부분 재귀
  makeTree(rightTree, L + 1); // 오른쪽 부분 재귀

  return;
}

makeTree(arr, 0);
console.log(answer.map((v) => v.join(" ")).join("\n"));
