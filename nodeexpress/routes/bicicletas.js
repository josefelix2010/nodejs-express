const express = require('express')
const router = express.Router()
const bicicletaController = require('../controllers/bicicleta')

// Listar bicicletas
router.get('/', bicicletaController.bicicletaList)

// Agregar bicicleta
router.get('/create', bicicletaController.bicicletaCreateGet)
router.post('/create', bicicletaController.bicicletaCreatePost)

// Actualizar bicicleta
router.get('/:id/update', bicicletaController.bicicletaUpdateGet)
router.post('/:id/update', bicicletaController.bicicletaUpdatePost)

// Eliminar bicicleta
router.post('/:id/delete', bicicletaController.bicicletaDeletePost)

module.exports = router
