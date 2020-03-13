const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bicicletaSchema = new Schema({
  codigo: { type: Number },
  color: { type: String },
  modelo: { type: String },
  ubicacion: {
    type: [Number],
    index: {
      type: '2dsphere',
      sparse: true
    }
  }
})

bicicletaSchema.methods.toString = function () {
  return 'codigo: ' + this.codigo + '| color: ' + this.color
}

bicicletaSchema.statics.allBicis = function (callback) {
  return this.find({}, callback)
}

bicicletaSchema.statics.crearInstancia = function (codigo, color, modelo, ubicacion) {
  return new this({
    codigo: codigo,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  })
}

bicicletaSchema.statics.add = function (bici, cb) {
  this.create(bici, cb)
}

bicicletaSchema.statics.findByCode = function (codigo, cb) {
  return this.findOne({ codigo: codigo }, cb)
}

bicicletaSchema.statics.removeByCode = function (codigo, cb) {
  return this.deleteOne({ codigo: codigo }, cb)
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema)
