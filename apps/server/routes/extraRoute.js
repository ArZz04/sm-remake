const express = require('express');
const { getSchendule, setSchendule } = require('../controllers/extraController');

const router = express.Router();

router.get('/schendule', getSchendule);
router.post('/schendule', setSchendule);

module.exports = router;