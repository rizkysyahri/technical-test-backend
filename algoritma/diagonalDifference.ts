function diagonalDiff(matrix: number[][]) {
  const n = matrix.length;
  let primaryDiagonalSum = 0;
  let secondaryDiagonalSum = 0;

  for (let i = 0; i < n; i++) {
    console.log("primaryDiagonalSum", (primaryDiagonalSum += matrix[i][i]));
    primaryDiagonalSum += matrix[i][i];
    secondaryDiagonalSum += matrix[i][n - 1 - i];
  }

  const different = Math.abs(primaryDiagonalSum - secondaryDiagonalSum);

  return different;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const result = diagonalDiff(matrix);
console.log(`Hasil : ${result}`);
