const Usuario = require('../models/usuario')
const Token = require('../models/token')

exports.confirmationGet = function (req, res) {
	Token.findOne({ token: req.params.token }, function (err, token) {
		if (!token) { return res.status(400).send({ type: 'not-verified', msg: 'No está verificado.' }) }

		Usuario.findById(token._userId, function (err, usuario) {
			if (!usuario) { return res.status(400).send({ msg: 'No se encontró este usuario.' }) }
			if (usuario.verificado) return res.redirect('/usuarios')
			usuario.verificado = true
			usuario.save(function (err) {
				if (err) { return res.status(500).send({ msg: err.message }) }
				res.redirect('/')
			})
		})
	})
}