var express = require('express');
var	userHandlers = require('../controllers/userController.js');
var	imageHandlers = require('../controllers/imageController.js');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      	cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
	    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});
var router = express.Router();

router.get('/:imageId',userHandlers.loginRequired, imageHandlers.get);
router.post('/', upload.any(),userHandlers.loginRequired, imageHandlers.create);

module.exports = router;
