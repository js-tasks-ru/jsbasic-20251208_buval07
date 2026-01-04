function makeDiagonalRed(table) {
  // ваш код...
  let i = 0;
  for (let tr of table.rows) {
    //получаем ячейки
    let td = tr.cells[i];
    i++;
    //номер ячейки равен номеру строки при окрашевании
    td.style.backgroundColor = "red";
  }
}

