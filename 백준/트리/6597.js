const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6597.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution() {
  function buildPostOrder(preorder, inorder) {
    if (inorder === "") return "";

    const root = preorder[0];
    const rootIndex = inorder.indexOf(root);

    // 인오더를 루트 기준으로 왼쪽, 오른쪽 서브트리로 분할
    const leftInorder = inorder.slice(0, rootIndex);
    const rightInorder = inorder.slice(rootIndex + 1);

    // 프리오더에서 왼쪽, 오른쪽 서브트리 분할
    const leftPreorder = preorder.slice(1, leftInorder.length + 1);
    const rightPreorder = preorder.slice(leftInorder.length + 1);

    // 후위 순회: 왼쪽 -> 오른쪽 -> 루트
    return (
      buildPostOrder(leftPreorder, leftInorder) +
      buildPostOrder(rightPreorder, rightInorder) +
      root
    );
  }

  const result = [];
  for (const testCase of input) {
    const [preorder, inorder] = testCase.split(" ");
    result.push(buildPostOrder(preorder, inorder));
  }

  console.log(result.join("\n"));
}

solution();
