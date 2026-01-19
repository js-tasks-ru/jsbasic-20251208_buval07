import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.currentSlideIndex = 0; //текущий активный слайд

    this.render(); //метод рендера

    this.updateSlides();
  }

  render() {
    this._container = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_left" data-action="left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_right" data-action="right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.getSlides()}
        </div>
      </div>
    `);
    this.initEvents();
  }

  getSlides() {
    return this.slides
      .map(
        (slide) => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="${slide.name}">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `,
      )
      .join("");
  }

  initEvents() {
    this._container.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event) {
    // 1. Проверяем стрелку
    const arrow = event.target.closest("[data-action]");
    if (arrow) {
      const action = arrow.dataset.action;
      if (action === "left") {
        this.scrollPrev();
      } else if (action === "right") {
        this.scrollNext();
      }
    }

    // 2. Проверяем кнопку "+"
    const button = event.target.closest(".carousel__button");
    if (button) {
      const slide = event.target.closest(".carousel__slide");
      const slideId = slide.dataset.id;
      this._container.dispatchEvent(
        new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true,
        }),
      );
    }
  }

  scrollNext() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0;
    }
    this.updateSlides(); // моя старая логика
  }

  scrollPrev() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.slides.length - 1;
    }
    this.updateSlides();
  }

  updateSlides() {
    const carouselInner = this._container.querySelector(".carousel__inner");
    const slideWidth = carouselInner.children[0].offsetWidth;

    const buttonLeft = this._container.querySelector(".carousel__arrow_left");
    const buttonRight = this._container.querySelector(".carousel__arrow_right");

    buttonLeft.style.display = this.currentSlideIndex === 0 ? "none" : "";
    buttonRight.style.display =
      this.currentSlideIndex === this.slides.length - 1 ? "none" : "";

    carouselInner.style.transform = `translateX(-${slideWidth * this.currentSlideIndex}px)`;
  }

  get elem() {
    return this._container;
  }
}
