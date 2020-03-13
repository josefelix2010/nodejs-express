const mongoose = require('mongoose')
const Bicicleta = require('../../models/bicicleta')

describe('Testing de bicicletas', function () {
  beforeEach(function (done) {
    const mongodb = 'mongodb://localhost/testdb'
    mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'Error de conexión'))
    db.once('open', function () {
      console.log('Estamos conectados')
      done()
    })
  })

  afterEach(function (done) {
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) {
        console.log(err)
      } else {
        console.log('Final de la prueba')
        done()
      }
    })
  })

  describe('Bicicleta.crearInstancia', () => {
    it('Crear una instancia de bicicletas', () => {
      var bicicleta = Bicicleta.crearInstancia(1, 'Verde', 'Urbana', [-11.15, -11.15])

      expect(bicicleta.codigo).toBe(1)
      expect(bicicleta.color).toBe('Verde')
      expect(bicicleta.modelo).toBe('Urbana')
      expect(bicicleta.ubicacion[0]).toBe(-11.15)
      expect(bicicleta.ubicacion[1]).toBe(-11.15)
    })
  })

  describe('Bicicleta.allBicis', () => {
    it('Comienza vacía', (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        if (err) console.log(err)
        expect(bicis.length).toBe(0)
        done()
      })
    })
  })

  describe('Bicicleta.add', () => {
    it('Agregar una bici', (done) => {
      var agregar = new Bicicleta({codigo: 1, color: 'Verde', modelo: 'Urbana'})

      Bicicleta.add(agregar, function (err, nueva) {
        if (err) console.log(err)
        Bicicleta.allBicis(function (err, bicis) {
          if (err) console.log(err)
          expect(bicis.length).toEqual(1)
          expect(bicis[0].codigo).toEqual(agregar.codigo)
          done()
        })
      })
    })
  })

  describe('Bicicleta.findByCode', () => {
    it('Busca bicicleta segun codigo', (done) => {
      Bicicleta.allBicis(function (_err, bicis) {
        expect(bicis.length).toBe(0)
        var bici1 = new Bicicleta({ codigo: 1, color: 'Azul', modelo: 'Urbana' })

        Bicicleta.add(bici1, function (_err, nueva) {
          var bici2 = new Bicicleta({ codigo: 2, color: 'Roja', modelo: 'Infantil' })

          Bicicleta.add(bici2, function (_err, nueva) {
            Bicicleta.allBicis(function (_err, bicis) {
              Bicicleta.findByCode(1, function (_err, targetBici) {
                expect(targetBici.codigo).toBe(bici1.codigo)
                expect(targetBici.color).toBe(bici1.color)
                expect(targetBici.modelo).toBe(bici1.modelo)
                done()
              })
            })
          })
        })
      })
    })
  })
})

// beforeEach(() => {
//   // Bicicleta.allBicis = []
//   console.log('testeando...')
// })

// // Prueba de consulta de todas las bicicletas
// describe('Bicicleta.allBicis', () => {
//   it('Comienza vacío.', () => {
//     expect(Bicicleta.allBicis.length).toBe(0)
//   })
// })

// // Prueba de adición de bicicleta
// describe('Bicicleta.add', () => {
//   it('Agregar bicicleta.', () => {
//     expect(Bicicleta.allBicis.length).toBe(0)

//     var bicicleta = new Bicicleta(1, 'Rojo', 'Urbano', [10.214, -67.971])
//     Bicicleta.add(bicicleta)

//     expect(Bicicleta.allBicis.length).toBe(1)
//     expect(Bicicleta.allBicis[0]).toBe(bicicleta)
//   })
// })

// // Prueba encontrar bicicleta por id
// describe('Bicicleta.findById', () => {
//   it('Consulta según id.', () => {
//     var b1 = new Bicicleta(1, 'Rojo', 'Urbano', [10.214, -67.971])
//     var b2 = new Bicicleta(2, 'Azul', 'Infantil', [10.260, -68.014])

//     Bicicleta.add(b1)
//     Bicicleta.add(b2)

//     var targetBici = Bicicleta.findById(1)

//     expect(targetBici.id).toBe(1)
//     expect(targetBici.color).toBe(b1.color)
//     expect(targetBici.modelo).toBe(b1.modelo)
//   })
// })
