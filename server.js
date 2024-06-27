require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(cors());

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
