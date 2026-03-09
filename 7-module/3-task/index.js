import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  render() {
    // Вычисляем положение в процентах для начального состояния
    const valuePercents = (this.value / (this.steps - 1)) * 100;
    this.elem = createElement(`
  <div class="slider">

    <!--Ползунок слайдера c активным значением-->
    <div class="slider__thumb" style="left: ${valuePercents}%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: ${valuePercents}%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">

    </div>
  </div>
        `);

    const sliderSteps = this.elem.querySelector(".slider__steps");

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement("span");
      // Если номер шага совпадает с текущим значением, добавляем активный класс
      if (i === this.value) {
        step.classList.add("slider__step-active");
      }

      // Добавляем созданный span в контейнер (теперь для каждой итерации цикла)
      sliderSteps.append(step);
    }

    //Обработитчик событий
    this.elem.addEventListener("click", (event) => {
      //Получаем координату клика event.clientX и где начинается слайдер this.elem.getBoundingClientRect().left
      const left = event.clientX - this.elem.getBoundingClientRect().left;
      //Полученные значения в left = px нужно перевести в относительные значения от 0 до 1, т.е. полученые значения left  разделить на ширину слайдера this.elem.offsetWidth
      const leftRelative = left / this.elem.offsetWidth;
      //Переводим в значение шага по формуле из задания
      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const value = Math.round(approximateValue);

      //Обновили valut
      this.value = value;

      //Считаем проценты
      const valuePercents = (this.value / segments) * 100;

      //С двинем ползунок на 50%
      const thumb = this.elem.querySelector(".slider__thumb");
      thumb.style.left = `${valuePercents}%`;
      //Окрасим при движении на шаг т.е. 50%
      const progress = this.elem.querySelector(".slider__progress");
      progress.style.width = `${valuePercents}%`;
      //Меняем число
      const valueElem = this.elem.querySelector(".slider__value");
      valueElem.textContent = this.value;
      //Переключаем активный шаг
      const steps = this.elem.querySelectorAll(".slider__steps span");
      steps.forEach((step) => {
        step.classList.remove("slider__step-active");
      });
      steps[this.value].classList.add("slider__step-active");
      //Отправляем событие dispatchEvent
      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        }),
      );
    });
  }
}
