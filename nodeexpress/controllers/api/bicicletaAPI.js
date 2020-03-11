const Bicicleta = require('../../models/bicicleta')

// Listar bicicletas
exports.bicicletaList = function (req, res) {
  res.status(200).json({
    bicicletas: Bicicleta.allBicis
  })
}

// Crear bicicleta
exports.bicicletaCreate = function (req, res) {
  const bicicleta = new Bicicleta(req.body.id, req.body.color, req.body.modelo, [req.body.lat, req.body.lng])
  Bicicleta.add(bicicleta)

  res.status(200).json({
    bicicleta: bicicleta
  })
}

// Actualizar bicicleta
exports.bicicletaUpdateGet = function (req, res) {
  const bicicleta = Bicicleta.findById(req.params.id)

  res.status(200).json({
    bicicleta: bicicleta
  })
}

exports.bicicletaUpdatePost = function (req, res) {
  const bicicleta = Bicicleta.findById(req.params.id)

  bicicleta.id = parseInt(req.params.id)
  bicicleta.color = req.body.color
  bicicleta.modelo = req.body.modelo
  bicicleta.ubicacion = [req.body.lat, req.body.lng]

  res.status(200).json({
    bicicleta: Bicicleta.allBicis
  })
}

// Borrar bicicleta
exports.bicicletaDelete = function (req, res) {
  Bicicleta.removeById(req.params.id)

  res.status(204).send()
}
