for (let a = 2; a <= 100; a++) {
  for (let b = 2; b <= 100; b++) {
    for (let c = b + 1; c <= 100; c++) {
      for (let d = c + 1; d <= 100; d++) {
        if (a * a * a === b * b * b + c * c * c + d * d * d) {
          console.log(`Cube = ${a}, Triple = (${b},${c},${d})`);
        }
        if (a * a * a < b * b * b + c * c * c + d * d * d) break;
      }
    }
  }
}
