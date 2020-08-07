const mailer = require('nodemailer');

const mailConfig = {
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'clarissa59@ethereal.email',
		pass: 'TGUjqQ9v2eFFUKUhpQ'
	}
}

module.exports = mailer.createTransport(mailConfig);
