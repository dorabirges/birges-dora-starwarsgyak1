// ide deklaráljátok a függvényeket.

// 1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble)
/*
function advBubble(array) {
  var i = array.length;
  while (i > 0) {
    var swap = 0;
    for (var j = 0; j < i - 1; j++) {
      if ((array[j].cost_in_credits !== null && array[j + 1].cost_in_credits === null) || (array[j].cost_in_credits !== null && array[j + 1].cost_in_credits !== null && parseInt(array[j].cost_in_credits) > parseInt(array[j + 1].cost_in_credits))) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swap = j + 1;
      }
    }
    i = swap;
  }
}
*/
function safeParseInt(s) {
  if (s === null) {
    return 0;
  } // else {
  return parseInt(s);
  // }
}

function advBubble(array) {
  var i = array.length;
  while (i > 0) {
    var swap = 0;
    for (var j = 0; j < i - 1; j++) {
      if (safeParseInt(array[j].cost_in_credits) > safeParseInt(array[j + 1].cost_in_credits)) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swap = j + 1;
      }
    }
    i = swap;
  }
}

/*
function advBubble(array) {
  var i = array.length;
  while (i > 0) {
    var swap = 0;
    for (var j = 0; j < i - 1; j++) {
      var first = array[j].cost_in_credits;
      var second = array[j + 1].cost_in_credits;
      if (first === null) {
        first = '0';
      }
      if (second === null) {
        second = '0';
      }
      if (parseInt(first) > parseInt(second)) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swap = j + 1;
      }
    }
    i = swap;
  }
}
*/

// 2. Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!
function deleteNullConsumables(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i].consumables === null) {
      array.splice(i, 1);
    }
  }
}

// 3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra
function modifyNullValues(array) {
  for (var i = 0; i < array.length; i++) {
    for (var k in array[i]) {
      if (array[i][k] === null) {
        array[i][k] = 'unknown';
      }
    }
  }
}

// 5. Készítened kell egy statisztikát, mely kiírja a következő statisztikai adatokat:

// * Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.

function numberOfShipsWithOneCrewMember(array) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i].crew === '1') {
      count += 1;
    }
  }
  return count;
}

// * A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)

function biggestCargoCapacity(array) {
  var biggest = null;
  for (var i = 0; i < array.length; i++) {
    if (array[i].cargo_capacity !== 'unknown') {
      if (biggest === null || parseInt(array[i].cargo_capacity) > parseInt(biggest.cargo_capacity)) {
        biggest = array[i];
      }
    }
  }
  return biggest.model;
}

// * Az összes hajó utasainak (passengers) összesített száma

function numberOfPassengers(array) {
  var passengers = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i].passengers !== 'unknown') {
      passengers += parseInt(array[i].passengers);
    }
  }
  return passengers;
}

// * A leghosszabb(lengthiness) hajó képének a neve

function longestShipImageName(array) {
  var longest = null;
  for (var i = 0; i < array.length; i++) {
    if (array[i].lengthiness !== 'unknown') {
      if (longest === null || parseInt(array[i].lengthiness) > parseInt(longest.lengthiness)) {
        longest = array[i];
      }
    }
  }
  return longest.image;
}

// 6. Legyen lehetőség a hajókra rákeresni _model_ szerint. (logaritmikus/binary sort)
// * A keresett nevet paraméterként kapja a függvényed.
// * A keresés nem case sensitive
// * Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
// * Ha több találatunk is lenne, azt a hajót adjuk vissza, amelyiknek a neve ABC sorrendben a legelső lenne.
// * Írasd ki a hajó adatait.

function searchByModel(array, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  var result = null;
  for (var i = 0; i < array.length; i++) {
    if (array[i].model.toLowerCase().indexOf(searchTerm) > -1) {
      if (result === null || array[i].model.localeCompare(result.model) < 0 ) {
        result = array[i];
      }
    }
  }
  return result;
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.

  advBubble(userDatas);
  deleteNullConsumables(userDatas);
  modifyNullValues(userDatas);
  console.log(userDatas);
  console.log(`Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma: ${numberOfShipsWithOneCrewMember(userDatas)}`);
  console.log(`A legnagyobb cargo_capacity-vel rendelkező hajó neve (model): ${biggestCargoCapacity(userDatas)}`);
  console.log(`Az összes hajó utasainak (passengers) összesített száma: ${numberOfPassengers(userDatas)}`);
  console.log(`A leghosszabb(lengthiness) hajó képének a neve: ${longestShipImageName(userDatas)}`);
  var model = searchByModel(userDatas, 'star');
  console.log(model);
  document.querySelector('.one-spaceship').innerHTML += `<img src='img/${model.image}'>`;
}
getData('/json/spaceships.json', successAjax);
