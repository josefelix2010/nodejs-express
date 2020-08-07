const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/usuarios')
const bicicletasRouter = require('./routes/bicicletas')
const tokenRouter = require('./routes/token')
const bicicletasRouterAPI = require('./routes/api/bicicletasAPI')
const usuariosRouterAPI = require('./routes/api/usuarioAPI')

const mongodb = 'mongodb://localhost/redBicicletas'
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/usuarios', usersRouter)
app.use('/bicicletas', bicicletasRouter)
app.use('/token', tokenRouter)
app.use('/api/bicicletas', bicicletasRouterAPI)
app.use('/api/usuarios', usuariosRouterAPI)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	
	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
