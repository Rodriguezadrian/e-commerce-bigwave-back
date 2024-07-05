const { User } = require('../models');
const formidable = require('formidable');
const bcrypt = require('bcrypt');

const userController = {
	index: async (req, res) => {
		try {
			const users = await User.findAll();
			res.json(users);
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({ message: 'There was a problem trying to get the users' });
		}
	},
	store: async (req, res) => {
		try {
			//const form = formidable({ multiples: true });
			const { email, password, firstname, lastname, avatar } = req.body;
			const hashedPassword = await bcrypt.hashSync(password, 10);
			const newUser = User.create({
				email,
				password: hashedPassword,
				firstname,
				lastname,
			});
			res.json({ msg: `${firstname}'s user created successfully` });
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({ message: 'There was a problem trying to create the user' });
		}
	},
	show: async (req, res) => {
		try {
			const user = await User.findOne({
				where: { email: req.auth.email },
				attributes: { exclude: ['password'] },
			});
			console.log(req.auth);
			res.json(user);
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({ message: 'There was a problem trying to get the user' });
		}
	},
	update: (req, res) => {
		res.send('User Update');
	},
	destroy: (req, res) => {
		res.send('User Destroy');
	},
};
module.exports = userController;
