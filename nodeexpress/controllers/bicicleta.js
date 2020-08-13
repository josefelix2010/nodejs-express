var Bicicleta = require('../models/bicicleta')

//Mostrar la lista de bicicletas
exports.bicicletaList = function (req, res) {
	Bicicleta.find({}, (err, Bicicleta) => {
		res.render('bicicletas/index', { bicis: Bicicleta })
	})
}

//Obtener bicicleta a actualizar
exports.bicicletaUpdateGet = function (req, res) {
	Bicicleta.findById(req.params.id, function (err, bici) {
		res.render('bicicletas/update', { errors: {}, bici: bici})
	})
}

//Subir actualización de bicicleta
exports.bicicletaUpdatePost = function (req, res) {
	var updateValues = { color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng] }
	Bicicleta.findByIdAndUpdate(req.params.id, updateValues, function (err, bici) {
		if (err) {
			console.log(err);
			res.render('bicicletas/update', {errors: err.errors, bici: new Bicicleta({ 
				color: req.body.color,
				modelo: req.body.modelo,
				ubicacion: [req.body.lat, req.body.lng]
			})});
		} else {
			res.redirect('/bicicletas');
		}
	})
}

// Crea una bicicleta nueva
exports.bicicletaCreateGet = function (req, res) {
	res.render('bicicletas/create', { errors: {}, bici: new Bicicleta() })
}

//Subir la nueva bicicleta que se creó
exports.bicicletaCreatePost = function (req, res) {
	Bicicleta.create({ color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng] }, function (err, nuevaBici) {
		if (err) {
			res.render('bicicletas/create', {errors: err.errors, bici: new Bicicleta({ color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng] })})
		} else {
			res.redirect('/bicicletas');
		}
	})
}

// Eliminar bicicleta
exports.bicicletaDeletePost = function (req, res) {
	Bicicleta.findByIdAndDelete(req.body.id, function (err) {
		if (err) {
			next(err);
		} else {
			res.redirect('/usuarios');
		}
	})
}
