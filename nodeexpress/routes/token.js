const express = require('express')
const router = express.Router();
const tokenController = require('../controllers/token')

router.get('/confirmacion/:token', tokenController.confirmationGet)

module.exports = router
