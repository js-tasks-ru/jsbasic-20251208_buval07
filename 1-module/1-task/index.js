function factorial(n) {
  //ваш код...
  let i = 1;
  let result = 1;
  while (i <= n) {
    result *= i;
    i++;
  }

  return result;
}

console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
console.log(factorial(3)); // 6
console.log(factorial(5)); // 120
