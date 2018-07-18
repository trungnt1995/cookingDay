var express = require('express');
var router = express.Router();
var	userHandlers = require('../controllers/userController.js');
var	foodHandlers = require('../controllers/foodController.js');
/* GET home page. */
router.get('/:categoryId',userHandlers.loginRequired, foodHandlers.get);
// new
router.get('/:foodById',userHandlers.loginRequired, foodHandlers.getFoodByUser);
router.post('/:categoryId/create',userHandlers.loginRequired, foodHandlers.create);
router.post('/:foodId/update',userHandlers.loginRequired, foodHandlers.update);
router.post('/:foodId/delete',userHandlers.loginRequired, foodHandlers.delete);

router.get('/:foodId/detail',userHandlers.loginRequired, foodHandlers.getDetail);


module.exports = router;
