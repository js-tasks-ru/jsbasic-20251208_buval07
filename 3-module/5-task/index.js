let inputData = "1 и -5.8 или 10 хотя 34 + -5.3 и 73";

function getMinMax(str) {
  const result = {};
  const numbers = [];
  const arrayStr = str.split(" ");

  // ваш код...
  for (let item of arrayStr) {
    const num = parseFloat(item);

    if (!Number.isNaN(num)) {
      numbers.push(num);
    }
  }

  const min = Math.min(...numbers); // спред раскладывает каждое чесло в массиве, как отдельный аргумент
  const max = Math.max(...numbers);

  result.min = min;
  result.max = max;

  return result;
}

getMinMax(inputData);
