const mongoose = require('mongoose')
const Bicicleta = require('../../models/bicicleta')
const Usuario = require('../../models/usuario')
const Reserva = require('../../models/reserva')

describe('Testing Bicicleta', function () {
  beforeEach(function (done) {
    const mongoDb = 'mongodb://localhost/testdb'
    mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Error de Conexion'))
    db.once('open', function () {
      console.log('Nos estamos conectando al DB Test')
      done()
    })
  })

  afterEach(function (done) {
    Reserva.deleteMany({}, function (err, success) {
      if (err) console.log(err)
      Usuario.deleteMany({}, function (err, success) {
        if (err) console.log(err)
        Bicicleta.deleteMany({}, function (err, success) {
          if (err) console.log(err)
          done()
        })
      })
    })
  })

  describe('Reserva de un usuario', () => {
    it('Debe existir la reserva', (done) => {
      const usuario = new Usuario({ nombre: 'Jose' })
      usuario.save()
      const bicicleta = new Bicicleta({ codigo: 1, color: 'Verde', modelo: 'Urbano' })
      bicicleta.save()

      var hoy = new Date()
      var mañana = new Date()
      mañana.setDate(hoy.getDate() + 1)
      usuario.reservar(bicicleta.id, hoy, mañana, function (_err, reserva) {
        Reserva.find({}).populate('bicicleta').populate('usuario').exec(function (_err, reservas) {
          expect(reservas.length).toBe(1)
          expect(reservas[0].diasReserva()).toBe(2)
          expect(reservas[0].bicicleta.codigo).toBe(1)
          expect(reservas[0].usuario.nombre).toBe(usuario.nombre)
          done()
        })
      })
    })
  })
})
