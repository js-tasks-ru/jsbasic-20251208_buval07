function toggleText() {
  // ваш код...
  let button = document.querySelector(".toggle-text-button");
  let text = document.querySelector("#text");

  function textHidden() {
    if (text.hidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  }

  button.addEventListener("click", textHidden);
}
