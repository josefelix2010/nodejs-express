const mongoose = require('mongoose')
const Reserva = require('./reserva')
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
  nombre: String
})

usuarioSchema.methods.reservar = function (idBicicleta, desde, hasta, cb) {
  var reserva = new Reserva({ usuario: this._id, bicicleta: idBicicleta, desde: desde, hasta: hasta })
  console.log(reserva)
  reserva.save(cb)
}

usuarioSchema.statics.allUsuarios = function (callback) {
  return this.find({}, callback)
}

module.exports = mongoose.model('Usuario', usuarioSchema)
