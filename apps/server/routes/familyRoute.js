const express = require('express');
const { allFamilies, createFamily } = require('../controllers/familyController');

const router = express.Router();

router.get('/all', allFamilies);
router.post('/new', createFamily);

module.exports = router;