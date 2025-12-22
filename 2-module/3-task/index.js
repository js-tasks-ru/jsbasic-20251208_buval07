let calculator = {
  // ваш код
  read: function (a, b) {
    this.a = a;
    this.b = b;
    return this;
  },
  sum: function () {
    return this.a + this.b;
  },
  mul: function () {
    return this.a * this.b;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
