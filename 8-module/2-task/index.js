import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }
  /* - render() создаёт контейнер,показывает ВСЕ товары*/
  render() {
    //1. создать this.elem
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>`);
    //2. найти inner внутри него
    let inner = this.elem.querySelector(".products-grid__inner");

    inner.innerHTML = "";

    this.products.forEach((product) => {
      let productCard = new ProductCard(product);

      inner.append(productCard.elem);
    });
  }
  /*updateFilter() обновляет фильтры, фильтрует массив, очищает DOM, перерисовывает карточки*/
  updateFilter(filters) {
    //Копируем свойства из одного объекта в другой
    Object.assign(this.filters, filters);

    let filteredProducts = this.products.filter((product) => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }

      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        return false;
      }

      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      return true;
    });
    let inner = this.elem.querySelector(".products-grid__inner");
    //Удоляет содержимое, что бы отрисовать заново
    inner.innerHTML = "";

    filteredProducts.forEach((product) => {
      let card = new ProductCard(product);
      inner.append(card.elem);
    });
  }
}
