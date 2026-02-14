import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  // Конструктор вызывается при создании экземпляра:
  // let modal = new Modal();
  constructor() {
    // Создаём корневой DOM-элемент модалки
    // createElement принимает HTML-строку
    // и возвращает настоящий DOM-объект
    this.element = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">

            <!-- Кнопка закрытия -->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <!-- Заголовок -->
            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>

          <!-- Тело модалки -->
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>
    `);

    // Сохраняем ссылки на важные элементы,
    // чтобы потом не искать их каждый раз через querySelector
    this.titleElement = this.element.querySelector(".modal__title");
    this.bodyElement = this.element.querySelector(".modal__body");
    this.closeButton = this.element.querySelector(".modal__close");

    // Вешаем обработчик на кнопку закрытия
    // При клике вызывается метод close()
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    // Создаём обработчик для клавиши ESC
    // Сохраняем его как свойство,
    // чтобы потом можно было удалить removeEventListener
    this.onEsc = (event) => {
      if (event.code === "Escape") {
        this.close();
      }
    };
  }

  // Метод открытия модалки
  open() {
    // Добавляем модалку в body
    document.body.append(this.element);

    // Добавляем класс к body (для блокировки скролла и стилей)
    document.body.classList.add("is-modal-open");

    // Вешаем обработчик на ESC
    document.addEventListener("keydown", this.onEsc);
  }

  // Метод закрытия модалки
  close() {
    // Удаляем элемент из DOM
    this.element.remove();

    // Убираем класс у body
    document.body.classList.remove("is-modal-open");

    // Удаляем обработчик ESC
    document.removeEventListener("keydown", this.onEsc);
  }

  // Установка заголовка
  setTitle(title) {
    // Меняем текст заголовка
    // textContent безопаснее, чем innerHTML
    this.titleElement.textContent = title;
  }

  // Установка содержимого тела
  setBody(node) {
    // Очищаем старое содержимое
    this.bodyElement.innerHTML = "";

    // Вставляем переданный DOM-элемент
    this.bodyElement.append(node);
  }
}
