const express = require('express');
const router = express.Router();
const todosController = require('../app/controllers/todos.controller');

router.get('/', todosController.getAll);
router.post('/', todosController.create);
router.get('/:id', todosController.getById);
router.patch('/:id', todosController.updateById);
router.delete('/:id', todosController.deleteById);

module.exports = router;
