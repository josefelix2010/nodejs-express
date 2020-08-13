var Usuario = require('../models/usuario')

//Listar usuarios
exports.usuariosList = function (req, res) {
	Usuario.find({}, (err, usuarios) => {
		res.render('usuarios/index', {usuarios: usuarios});
	});
}

//Obtener usuario a actualizar
exports.usuariosUpdateGet = function (req, res) {
	Usuario.findById(req.params.id, function (err, usuario) {
		res.render('usuarios/update', {errors: {}, usuario: usuario});
	});
}

//Subir actualización usuario
exports.usuariosUpdatePost = function (req, res) {
	var updateValues = { nombre: req.body.nombre };
	Usuario.findByIdAndUpdate(req.params.id, updateValues, function (err, usuario) {
		if (err) {
			console.log(err);
			res.render('usuarios/update', {errors: err.errors, usuario: new Usuario({ 
				nombre: req.body.nombre, 
				email: req.body.email 
			})});
		} else {
			res.redirect('/usuarios');
			return
		}
	});
}

//Ir a crear usuario nuevo
exports.usuariosCreateGet = function (req, res) {
	res.render('usuarios/create', {errors: {}, usuario: new Usuario()});
}

//Subir el nuevo usuario a crear
exports.usuariosCreatePost = function (req, res) {
	if (req.body.password != req.body.confirmPassword) {
		res.render('usuarios/create', {errors: {confirmPassword: {message: 'No coincide con la contraseña ingresada.'}}, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
		return;
	}

	Usuario.create({nombre: req.body.nombre, email: req.body.email, password: req.body.password}, function (err, nuevoUsuario) {
		if (err) {
			res.render('usuarios/create', {errors: err.errors, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email })})
		} else {
			nuevoUsuario.enviarEmailBienvenido();
			res.redirect('/usuarios');
		}
	})
}

//Eliminar usuario por id
exports.usuariosDeletePost = function (req, res) {
	Usuario.findByIdAndDelete(req.body.id, function (err) {
		if (err) {
			next(err);
		} else {
			res.redirect('/usuarios');
		}
	})
}