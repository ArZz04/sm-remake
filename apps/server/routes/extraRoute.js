const express = require('express');
const { getSchedule, setSchedule } = require('../controllers/extraController');

const router = express.Router();

router.get('/schedule', getSchedule);
router.post('/schedule', setSchedule);

module.exports = router;