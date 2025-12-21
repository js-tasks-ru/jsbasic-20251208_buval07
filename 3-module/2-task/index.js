let arr = [5, 3, 8, 1];

function filterRange(arr, a, b) {
  // ваш код...
  return arr.filter((item) => item >= a && item <= b);
}

filterRange(arr, 1, 4);
