const express = require('express')
const router = express.Router()
const proteinsController = require('../controllers/proteinController')
const upload = require('../utils/multer')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(proteinsController.getProteins)
    .post(upload.single('proteinImage'), proteinsController.createNewProtein)

router.route('/mySales').get(proteinsController.getUserProteins)

router.route('/:id')
    .delete(proteinsController.deleteProtein)
    .patch(proteinsController.updateProtein)

    router.route('/addToCart').post(proteinsController.addProteinToCart)

module.exports = router