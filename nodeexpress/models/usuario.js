const mongoose = require('mongoose')
const Reserva = require('./reserva')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const saltRounds = 10
const Schema = mongoose.Schema

const Token = require('../models/token')
const mailer = require('../mailer/mailer')

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
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un correo electrónico válido'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        trin: true,
        required: [true, ' La contraseña es obligatoria.']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.plugin(uniqueValidator, {
    message: 'El {PATH} ya existe con otro usuario.'
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

usuarioSchema.methods.enviarEmailBienvenido = function (callback) {
	const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') })
	const emailDestination = this.email

	token.save(function (err) {
		if (err) { return console.log(err.message); }

		const mailOptions = {
			from: 'clarissa59@ethereal.email',
			to: emailDestination,
			subject: 'Verificación de cuenta.',
			html: 'Hola, por favor, para verificar su cuenta haga click ' +
				'<a href="http://localhost:3000/token/confirmacion/' + token.token + '">aquí</a>.'
		}

		mailer.sendMail(mailOptions, function (err) {
			if (err) { return console.log(err.message); }

			console.log('Se ha enviado el mail de bienvenida a: ' + emailDestination +'.')
		})
	})
}

module.exports = mongoose.model('Usuario', usuarioSchema)
