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
