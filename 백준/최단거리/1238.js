let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1238.txt"
  )
  .toString()
  .trim()
  .split("\n");

let informations = input[0].split(" ");
let n = +informations[0];
let m = +informations[1];
let x = +informations[2];
let answer = 0;

if (n === 1) console.log(answer);
else {
  let mapInformations = [];

  for (let i = 1; i < input.length; i++) {
    mapInformations.push(input[i].split(" ").map((e) => +e));
  }

  let floyd = setFloyd();
  answer = findMaxtimeOfRoundTrip(floyd);
  console.log(answer);

  function findMaxtimeOfRoundTrip(floyd) {
    let timeFromDestination = floyd[x - 1];
    let max = 0;

    for (let i = 0; i < floyd.length; i++) {
      let oneWayToDestination = floyd[i][x - 1];
      timeFromDestination[i] += oneWayToDestination;

      if (max < timeFromDestination[i]) max = timeFromDestination[i];
    }

    return max;
  }

  function setFloyd() {
    let floyd = initFloyd();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (j === i) continue;

        for (let k = 0; k < n; k++) {
          if (
            floyd[j][i] !== Infinity &&
            floyd[i][k] !== Infinity &&
            floyd[j][k] > floyd[j][i] + floyd[i][k]
          ) {
            floyd[j][k] = floyd[j][i] + floyd[i][k];
          }
        }
      }
    }
    return floyd;
  }

  function initFloyd() {
    let floyd = [];
    for (let i = 0; i < n; i++) {
      floyd.push(Array(n).fill(Infinity));
      floyd[i][i] = 0;
    }
    for (let i = 0; i < mapInformations.length; i++) {
      let s = mapInformations[i][0];
      let d = mapInformations[i][1];
      let w = mapInformations[i][2];
      floyd[s - 1][d - 1] = w;
    }
    return floyd;
  }
}
