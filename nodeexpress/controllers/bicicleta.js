var Bicicleta = require('../models/bicicleta')

// Mostrar la lista de bicicletas
exports.bicicletaList = function (req, res) {
  res.render('bicicletas/index', { bicis: Bicicleta.allBicis })
}

// Crea una bicicleta nueva
exports.bicicletaCreateGet = function (req, res) {
  res.render('bicicletas/create')
}

exports.bicicletaCreatePost = function (req, res) {
  var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo, [req.body.lat, req.body.lng])
  Bicicleta.add(bici)

  res.redirect('/bicicletas')
}

// Actualizar bicicleta
exports.bicicletaUpdateGet = function (req, res) {
  var bici = Bicicleta.findById(req.params.id)

  res.render('bicicletas/update', { bici })
}

exports.bicicletaUpdatePost = function (req, res) {
  var bici = Bicicleta.findById(req.params.id)
  bici.id = parseInt(req.body.id)
  bici.color = req.body.color
  bici.modelo = req.body.modelo
  bici.ubicacion = [req.body.lat, req.body.lng]

  res.redirect('/bicicletas')
}

// Eliminar bicicleta
exports.bicicletaDeletePost = function (req, res) {
  Bicicleta.removeById(req.body.id)

  res.redirect('/bicicletas')
}
