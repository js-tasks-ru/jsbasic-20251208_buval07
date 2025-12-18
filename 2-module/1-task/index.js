let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
}

function sumSalary(salaries) {
  // ваш код...
  let sum = 0;
  for (let prop in salaries) {
    const value = salaries[prop];

    if (typeof value === "number" && isFinite(value)) {
      sum += value;
    }
  }

  return sum;

}

sumSalary(salaries);

