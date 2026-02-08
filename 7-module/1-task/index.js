import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  render() {
    const linksHTML = this.categories
      .map(
        ({ id, name }) =>
          ` <a href="#" class="ribbon__item" data-id="${id}">${name}</a>`,
      )
      .join("");

    this.elem = document.createElement("div");
    this.elem.innerHTML = `
      <div class="ribbon">
          <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>

          <nav class="ribbon__inner">
          ${linksHTML}
          </nav>

          <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>
      </div> `;
    this.elem = this.elem.firstElementChild; // берём ribbon как корень
    this.onClick();
    return this.elem;
  }

  onClick() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const ribbonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    const ribbonArrowRight = this.elem.querySelector(".ribbon__arrow_right");

    console.log(ribbonInner);

    ribbonArrowLeft.addEventListener("click", () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonArrowRight.addEventListener("click", () => {
      ribbonInner.scrollBy(350, 0);
    });

    //Обработчик scroll

    ribbonInner.addEventListener("scroll", () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
      } else {
        ribbonArrowLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight < 1) {
        ribbonArrowRight.classList.remove("ribbon__arrow_visible");
      } else {
        ribbonArrowRight.classList.add("ribbon__arrow_visible");
      }
    });

    //обработчик кликов по категориям
    ribbonInner.onclick = (event) => {
      const link = event.target.closest(".ribbon__item"); //Ищет ближайшего предка с данным классом
      if (!link) return; //если не ссылка останавливаем

      //убрать active со всех ссылок
      this.elem.querySelectorAll(".ribbon__item").forEach((item) => {
        item.classList.remove("ribbon__item_active");
      });
      //добавить acnive только кликнутой
      link.classList.add("ribbon__item_active");

      //событие ribbon-select c id
      const categoryId = link.dataset.id;
      this.elem.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: categoryId,
          bubbles: true,
        }),
      );
    };
  }
}
