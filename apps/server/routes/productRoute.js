const express = require('express');
const {
    allProducts, 
    getProductFilteredBySubfamily, 
    getProductFilteredByFamily, 
    getProductFilteredByPlu, 
    searchProductByName, 
    getRecentProducts, 
    updateProduct, 
    newProduct, 
    massiveNewProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/all', allProducts);
router.get('/subfamily/:subfamily_id', getProductFilteredBySubfamily);
router.get('/family/:family_id', getProductFilteredByFamily);
router.get('/byplu/:product_plu', getProductFilteredByPlu);
router.get('/search/:product_name', searchProductByName);
router.get('/recent', getRecentProducts);

router.post('/update/:product_plu', updateProduct);

router.post('/new/individual', newProduct);
router.post('/new/massive', massiveNewProduct);


module.exports = router;