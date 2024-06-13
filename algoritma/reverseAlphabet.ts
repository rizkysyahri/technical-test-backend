function reverseAlphabet(s: string): string {
  const letters = s.replace(/[0-9]/g, "");
  const digits = s.replace(/[^\d]/g, "");

  let reverseAlphabet = letters.split("").reverse().join("");

  const result = reverseAlphabet + digits

  return result
}

console.log(reverseAlphabet("NIGIE1"));
console.log(reverseAlphabet("EIGEN1"));
