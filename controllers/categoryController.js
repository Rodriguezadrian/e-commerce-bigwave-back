const { Category } = require('../models');
const { Product } = require('../models');

const categoryController = {
	index: async (req, res) => {
		try {
			const categories = await Category.findAll();
			res.json(categories);
		} catch {
			console.error(err);
			res
				.status(500)
				.json({ message: 'There was a problem trying to get the categories' });
		}
	},
	store: (req, res) => {
		res.send('Category Store');
	},

	show: async (req, res) => {
		try {
			const { id } = req.params;
			const category = await Product.findAll({ where: { CategoryId: id } });
			res.json(category);
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({ message: 'There was a problem trying to get the product' });
		}
	},

	update: (req, res) => {
		res.send('Category Update');
	},
	destroy: (req, res) => {
		res.send('Category Destroy');
	},
};
module.exports = categoryController;
