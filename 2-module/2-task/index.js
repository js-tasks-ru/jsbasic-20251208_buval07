function isEmpty(obj) {
  // ваш код...

  for (let key in obj) {
    return false;
  }

  return true;
}

let schedule = {};

isEmpty(schedule); // true

schedule["8:30"] = "подъём";

isEmpty(schedule); // false
