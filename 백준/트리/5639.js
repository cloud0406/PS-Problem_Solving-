const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/5639.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution(input) {
  class Node {
    constructor(v) {
      this.value = v;
      this.left = null;
      this.right = null;
    }

    // 입력 값을 통해 이진 검색트리 생성
    // 현재 값보다 작으면 왼쪽 서브트리, 크면 오른쪽 서브트리로 이동
    insert(v) {
      if (v < this.value) {
        if (!this.left) this.left = new Node(v);
        else this.left.insert(v);
      } else {
        if (!this.right) this.right = new Node(v);
        else this.right.insert(v);
      }
    }
  }

  // 후위 순회
  const postOrder = (node) => {
    node.left && postOrder(node.left);
    node.right && postOrder(node.right);
    console.log(node.value);
  };

  // 루트 노드부터 트리 구성
  const root = new Node(input[0]);
  for (let i = 1; i < input.length; i++) {
    root.insert(input[i]);
  }

  // 후위 순회로 출력
  postOrder(root);
}

solution(input);
