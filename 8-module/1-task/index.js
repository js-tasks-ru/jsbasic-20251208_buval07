import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }
  // Отрисовать пустую иконку корзины
  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }
  // Заполнить её данными из объекта cart (объяснено ниже)
  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true },
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }
  // позиционировать иконку корзины на экране
  updatePosition() {
    // если элемент не виден — ничего не делаем
    if (!this.elem.offsetWidth && !this.elem.offsetHeight) {
      return;
    }

    // мобильная версия — сбрасываем стили
    if (document.documentElement.clientWidth <= 767) {
      Object.assign(this.elem.style, {
        position: "",
        top: "",
        left: "",
        zIndex: "",
      });
      return;
    }

    // сохраняем начальную позицию (один раз)
    if (!this.initialTopCoord) {
      this.initialTopCoord =
        this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    // если проскроллили ниже — фиксируем
    if (window.pageYOffset > this.initialTopCoord) {
      let container = document.querySelector(".container");

      let fromContainer = container.getBoundingClientRect().right + 20;

      let fromWindow =
        document.documentElement.clientWidth - this.elem.offsetWidth - 10;

      let leftIndent = Math.min(fromContainer, fromWindow) + "px";

      Object.assign(this.elem.style, {
        position: "fixed",
        top: "50px",
        left: leftIndent,
        zIndex: 1000,
      });
    } else {
      // возвращаем как было
      Object.assign(this.elem.style, {
        position: "",
        top: "",
        left: "",
        zIndex: "",
      });
    }
  }
}
