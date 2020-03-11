var Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id
  this.color = color
  this.modelo = modelo
  this.ubicacion = ubicacion
}

Bicicleta.prototype.toString = function () {
  return 'id: ' + this.id + ' | color: ' + this.color
}

Bicicleta.allBicis = []
Bicicleta.add = function (bici) {
  Bicicleta.allBicis.push(bici)
}

Bicicleta.findById = function (biciId) {
  var id = parseInt(biciId)
  var bici = Bicicleta.allBicis.find(x => x.id === id)
  if (bici) {
    return bici
  } else {
    throw new Error(`No existe bicicleta con el id ${biciId}`)
  }
}

Bicicleta.removeById = function (biciId) {
  var id = parseInt(biciId)
  Bicicleta.findById(id)
  for (var i = 0; i < Bicicleta.allBicis.length; i++) {
    if (Bicicleta.allBicis[i].id === id) {
      Bicicleta.allBicis.splice(i, 1)
      break
    }
  }
}

var a = new Bicicleta(1, 'Roja', 'Urbana', [10.214, -67.971])
var b = new Bicicleta(2, 'Azul', 'Infantil', [10.260, -68.014])

Bicicleta.add(a)
Bicicleta.add(b)

module.exports = Bicicleta
