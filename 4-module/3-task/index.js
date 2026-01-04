function highlight(table) {
  // ваш код...\
  for (tr of table.rows) {
    if (tr.cells[0].textContent === "Name") continue;

    let ageCell = tr.cells[1];
    let genderCell = tr.cells[2];
    let statusCell = tr.cells[3];

    //status
    if (statusCell.dataset.available === undefined) {
      tr.hidden = true;
    } else if (statusCell.dataset.available === "true") {
      tr.classList.add("available");
    } else {
      tr.classList.add("unavailable");
    }

    //gender
    if (genderCell.textContent === "m") {
      tr.classList.add("male");
    } else if (genderCell.textContent === "f") {
      tr.classList.add("female");
    }

    //age
    if (Number(ageCell.textContent) < 18) {
      tr.style.textDecoration = "line-through";
    }
  }
}

