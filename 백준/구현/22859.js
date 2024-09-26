let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22859.txt"
  )
  .toString()
  .trim();

function solution(input) {
  function getTitle(str) {
    let isTitle = false;
    let result = "";

    for (let x of str) {
      // 타이틀 텍스트 저장
      if (x !== '"' && isTitle) result += x;
      // "" 안에 있는 타이틀 텍스트의 위치 찾기
      if (x === '"' && !isTitle) {
        isTitle = true;
      } else if (x === '"' && isTitle) {
        isTitle = false;
        break;
      }
    }
    return result;
  }

  // 불필요한 태그 제거 (br, b, i 등...)
  function deleteTags(p) {
    let str = "";
    let prev = "";
    let isTag = false;

    for (let i = 0; i < p.length; i++) {
      // 태그는 건너뛰고 아닌 문자열만 추가
      if (p[i] === "<" && !isTag) {
        isTag = true;
        continue;
      } else if (p[i] === ">" && isTag) {
        isTag = false;
        continue;
      } else if (!isTag) {
        if (prev === " " && prev === p[i]) continue; // 공백이 연속으로 나오면 제거
        str += p[i];
        prev = p[i];
      }
    }

    return str;
  }

  const answer = [];
  const divTags = input.match(/<div(.*?)>(.*?)<\/div>/g);

  for (let div of divTags) {
    const pTags = div.split(/<p(.*?)>(.*?)<\/p>/g);
    const title = getTitle(pTags[0]);

    const result = [];
    // 하나의 div 블럭 안의 p 태그들 내용 저장
    for (let i = 1; i < pTags.length - 1; i++) {
      let p = pTags[i].trim();
      if (!p.length) continue;

      p = deleteTags(p);

      result.push(p);
    }
    answer.push([`title : ${title}`, result.join("\n")]);
  }

  return answer.map((v) => v.join("\n")).join("\n");
}

console.log(solution(input));
