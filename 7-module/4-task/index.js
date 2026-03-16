import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    // количество шагов слайдера
    this.steps = steps;

    // текущее значение
    this.value = value;

    // рендерим компонент
    this.render();
  }

  render() {
    // вычисляем положение ползунка в процентах для начального значения
    const valuePercents = (this.value / (this.steps - 1)) * 100;

    // создаем DOM элемент слайдера
    this.elem = createElement(`
      <div class="slider">

        <!-- Ползунок -->
        <div class="slider__thumb" style="left: ${valuePercents}%;">
          <span class="slider__value">${this.value}</span>
        </div>

        <!-- Закрашенная часть -->
        <div class="slider__progress" style="width: ${valuePercents}%;"></div>

        <!-- Контейнер шагов -->
        <div class="slider__steps"></div>

      </div>
    `);

    // получаем контейнер шагов
    const sliderSteps = this.elem.querySelector(".slider__steps");

    // получаем основные элементы
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const valueElem = this.elem.querySelector(".slider__value");

    // отключаем стандартный браузерный drag
    thumb.ondragstart = () => false;

    // создаем шаги
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement("span");

      // подсвечиваем активный шаг
      if (i === this.value) {
        step.classList.add("slider__step-active");
      }

      sliderSteps.append(step);
    }

    // получаем все шаги
    const steps = this.elem.querySelectorAll(".slider__steps span");

    /* -----------------------------
       DRAG AND DROP (перетаскивание)
       ----------------------------- */

    // пользователь нажал на ползунок
    thumb.addEventListener("pointerdown", (event) => {
      // отменяем стандартные действия браузера
      event.preventDefault();

      // добавляем класс во время перетаскивания
      this.elem.classList.add("slider_dragging");

      // функция движения мыши
      const onPointerMove = (event) => {
        // положение курсора относительно начала слайдера
        let left = event.clientX - this.elem.getBoundingClientRect().left;

        // переводим в относительное значение (0 - 1)
        let leftRelative = left / this.elem.offsetWidth;

        // ограничиваем диапазон
        if (leftRelative < 0) leftRelative = 0;
        if (leftRelative > 1) leftRelative = 1;

        // переводим в проценты
        const leftPercents = leftRelative * 100;

        // двигаем ползунок
        thumb.style.left = `${leftPercents}%`;

        // закрашиваем прогресс
        progress.style.width = `${leftPercents}%`;

        // считаем сегменты
        const segments = this.steps - 1;

        // получаем приблизительное значение
        const approximateValue = leftRelative * segments;

        // округляем до ближайшего шага
        const value = Math.round(approximateValue);

        // обновляем значение
        this.value = value;

        // обновляем текст
        valueElem.textContent = this.value;

        // убираем активный класс у всех шагов
        steps.forEach((step) => step.classList.remove("slider__step-active"));

        // добавляем активный шаг
        steps[this.value].classList.add("slider__step-active");
      };

      // слушаем движение мыши
      document.addEventListener("pointermove", onPointerMove);

      // пользователь отпустил кнопку мыши
      document.addEventListener(
        "pointerup",
        () => {
          // убираем класс перетаскивания
          this.elem.classList.remove("slider_dragging");

          // перестаем слушать движение
          document.removeEventListener("pointermove", onPointerMove);

          // фиксируем ползунок точно на шаге
          const segments = this.steps - 1;
          const valuePercents = (this.value / segments) * 100;

          thumb.style.left = `${valuePercents}%`;
          progress.style.width = `${valuePercents}%`;

          // отправляем пользовательское событие
          this.elem.dispatchEvent(
            new CustomEvent("slider-change", {
              detail: this.value,
              bubbles: true,
            }),
          );
        },
        { once: true },
      );
    });

    /* -----------------------------
       КЛИК ПО СЛАЙДЕРУ
       ----------------------------- */

    this.elem.addEventListener("click", (event) => {
      // получаем положение клика
      let left = event.clientX - this.elem.getBoundingClientRect().left;

      // переводим в относительное значение
      let leftRelative = left / this.elem.offsetWidth;

      // ограничиваем диапазон
      if (leftRelative < 0) leftRelative = 0;
      if (leftRelative > 1) leftRelative = 1;

      const segments = this.steps - 1;

      // получаем значение шага
      const approximateValue = leftRelative * segments;

      const value = Math.round(approximateValue);

      this.value = value;

      // вычисляем проценты
      const valuePercents = (this.value / segments) * 100;

      // двигаем ползунок
      thumb.style.left = `${valuePercents}%`;

      // закрашиваем прогресс
      progress.style.width = `${valuePercents}%`;

      // обновляем число
      valueElem.textContent = this.value;

      // обновляем активный шаг
      steps.forEach((step) => step.classList.remove("slider__step-active"));
      steps[this.value].classList.add("slider__step-active");

      // отправляем событие изменения
      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        }),
      );
    });
  }
}
