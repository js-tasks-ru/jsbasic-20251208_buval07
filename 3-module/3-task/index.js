function camelize(str) {
  // ваш код...
  let arr = str.split('-');

  let caml = arr.map((element, index) => {
    if (index === 0) {
      return element;
    } else  {

      return element[0].toUpperCase() + element.slice(1);
    }
  })

  return caml.join('')
}

camelize('background-color')//'backgroundColor'
