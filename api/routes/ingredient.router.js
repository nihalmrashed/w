const express = require('express');
const router = express.Router();
//const logger = require('../middleware/logger').logger;
const ingredientController = require('../controllers/ingredient.controller');

router.post('/view', ingredientController.viewAllIngredients)
router.post('/viewbyID', ingredientController.viewIngredientById)
router.post('/create', ingredientController.createIngredient)
router.post('/update', ingredientController.updateIngredient)
router.post('/delete', ingredientController.deleteIngredient)
router.post('/stock', ingredientController.stock)

module.exports = router;
