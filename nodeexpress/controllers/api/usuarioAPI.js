const Usuarios = require('../../models/usuario')

// Listar usuarios
exports.usuariosList = function (req, res) {
  Usuarios.find({}, function (err, nombre) {
    if (err) console.log(err)
    res.status(200).json({
      nombre: nombre
    })
  })
}

// Crear usuario
exports.usuarioCreate = function (req, res) {
  var usuario = new Usuarios({ nombre: req.body.nombre })

  usuario.save(function (err) {
    if (err) console.log(err)
    res.status(200).json(usuario)
  })
}

// Crear reserva
exports.usuarioReserve = function (req, res) {
  Usuarios.findById(req.body.id, function (err, usuario) {
    if (err) console.log(err)
    console.log(usuario)
    usuario.reservar(req.body.biciId, req.body.desde, req.body.hasta, function () {
      res.status(200).send()
    })
  })
}
