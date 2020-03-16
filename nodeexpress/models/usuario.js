const mongoose = require('mongoose')
const Reserva = require('./reserva')
const bcrypt = require('bcrypt')
const saltRounds = 10
const Schema = mongoose.Schema

const validateEmail = function (email) {
  const validation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return validation.test(email)
}

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre de usuario es obligatorio.']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'El correo electrónico es obligatorio.'],
    lowercase: true,
    validate: [validateEmail, 'Por favor, ingrese un correo electrónico válido'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: [true, ' La contraseña es obligatoria.']
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  }
})

usuarioSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync('password', saltRounds)
  }
  next()
})

usuarioSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

usuarioSchema.methods.reservar = function (idBicicleta, desde, hasta, cb) {
  var reserva = new Reserva({ usuario: this._id, bicicleta: idBicicleta, desde: desde, hasta: hasta })
  console.log(reserva)
  reserva.save(cb)
}

usuarioSchema.statics.allUsuarios = function (callback) {
  return this.find({}, callback)
}

module.exports = mongoose.model('Usuario', usuarioSchema)
