const solve = (N, M, arr) => {
  const chosen = new Array(N).fill(false);
  const permutation = [];
  const output = [];
  const recursion = () => {
    if (permutation.length === M) {
      output.push(permutation.join(" "));
    } else {
      chosen.forEach((bool, i) => {
        if (!bool) {
          chosen[i] = true;
          permutation.push(arr[i]);
          recursion();
          chosen[i] = false;
          permutation.pop();
        }
      });
    }
  };
  recursion();
  console.log([...new Set(output)].join("\n"));
};

const [N, M, ...arr] = require("fs")
  .readFileSync(__dirname + "/input/15663.txt")
  .toString()
  .trim()
  .split(/\s+/);

arr.sort((a, b) => a - b);

solve(+N, +M, arr);
