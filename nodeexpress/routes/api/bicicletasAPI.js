const express = require('express')
const router = express.Router()
const bicicletaControllerAPI = require('../../controllers/api/bicicletaAPI')

// Listar bicicletas con la API
router.get('/', bicicletaControllerAPI.bicicletaList)

// Crear nueva bicicleta con la API
router.post('/create', bicicletaControllerAPI.bicicletaCreate)

// Modificar bicicleta con la API
router.get('/:id/update', bicicletaControllerAPI.bicicletaUpdateGet)
router.post('/:id/update', bicicletaControllerAPI.bicicletaUpdatePost)

// Eliminar bicicleta por id con la API
router.delete('/:id/delete', bicicletaControllerAPI.bicicletaDelete)

module.exports = router
