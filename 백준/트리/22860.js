const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22860.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(input) {
  let answer = [];

  const [n, m] = input[0].split(" ").map((val) => +val);

  const folderTree = {};
  let file = 0;

  // 폴더 구조 트리 생성
  for (let i = 1; i < n + m + 1; i++) {
    // 부모폴더, 현재 폴더 or 파일, 폴더 or 파일 여부
    const [P, F, C] = input[i].split(" ");

    if (folderTree[P]) folderTree[P].push([F, +C]);
    else folderTree[P] = [[F, +C]];
  }

  const searchFile = (target, folderType) => {
    // 폴더 비어있으면 종료
    if (!folderTree[target]) return;

    for (let [name, isFolder] of folderTree[target]) {
      // 폴더일경우 열어보면서 파일 계속 탐색
      if (isFolder) searchFile(name, folderType);
      else {
        file++;
        folderType.add(name);
      }
    }
  };

  for (let i = n + m + 2; i < n + m + 2 + Number(input[n + m + 1]); i++) {
    const target = input[i].split("/").at(-1);
    const folderType = new Set(); // 파일 종류

    file = 0;
    searchFile(target, folderType);
    answer.push([folderType.size, file]);
  }

  return answer.map((v) => v.join(" ")).join("\n");
}

console.log(solution(input));
