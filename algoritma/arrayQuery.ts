function findArrayQuery(arr: string[], que: string[]): number[] {
  const result: number[] = [];
  const inputMap: { [key: string]: number } = {};

  arr.forEach((word) => {
    if (inputMap[word]) {
      inputMap[word]++;
    } else {
      inputMap[word] = 1;
    }
  });

  que.forEach((word) => {
    result.push(inputMap[word] || 0);
  });

  return result;
}

console.log(findArrayQuery(["xc", "dz", "bbb", "dz"], ["bbb", "ac", "dz"]));
