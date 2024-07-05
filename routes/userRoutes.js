const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { expressjwt: checkJwt } = require('express-jwt');

router.get('/', userController.index); //para el admin
router.post('/', userController.store); //guardar un nuevo usuario (admin o cliente)
router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ['HS256'] }));
router.get('/my-profile', userController.show); //para el admin, cliente en su perfil
router.patch('/:id', userController.update); //para el admin, cliente en su perfil
router.delete('/:id', userController.destroy); //para el admin, cliente en su perfil

module.exports = router;
