const router = require('express').Router();
const productController = require('../controllers/productControllers');
const authGuard = require('../middleware/authGuard');

// create product api
router.post('/create_product', productController.createProduct);

// get all products api
router.get('/get_products', productController.getAllProducts);

//  get single product API
router.get('/get_product/:id', productController.getSingleProduct);

// update product API
router.put('/update_product/:id', productController.updateProduct);

// delete product API
router.delete('/delete_product/:id',authGuard, productController.deleteProduct);

module.exports = router;
