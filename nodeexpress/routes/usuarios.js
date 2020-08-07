var express = require('express')
var router = express.Router()
var usuariosController = require('../controllers/usuario')

router.get('/', usuariosController.usuariosList)
router.get('/create', usuariosController.usuariosCreateGet)
router.post('/create', usuariosController.usuariosCreatePost)
router.get('/:id/update', usuariosController.usuariosUpdateGet)
router.post('/:id/update', usuariosController.usuariosUpdatePost)
router.post('/:id/delete', usuariosController.usuariosDeletePost)

module.exports = router
