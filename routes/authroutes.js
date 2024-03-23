const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, userReg } = require('../controllers/authcontroller');

router.use(
    cors({
        origin : 'http://localhost:5173',
        credentials : true
    })
)

router.get('/',test);
router.post('/userReg',userReg);


module.exports = router;