var express = require('express')
var Router = express.Router()
var usuarioController = require('../../controllers/api/usuarioAPI')

Router.get('/', usuarioController.usuariosList)

Router.post('/create', usuarioController.usuarioCreate)

Router.post('/reservar', usuarioController.usuarioReserve)

module.exports = Router
