// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const { test, userReg } = require('../controllers/authcontroller');

// router.use(
//     cors({
//         origin : 'http://localhost:5173',
//         credentials : true
//     })
// )

// router.get('/',test);
// router.post('/userReg',userReg);


// module.exports = router;
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const data=require('../passport').dt
require('../passport')(passport);

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    // Generate a JWT token
    console.log(req.user,'user')
    let payload={"email": req.user.email}
    const token = jwt.sign(payload,'IloveCatsandDogs', { expiresIn: '1h' });

    res.json({ token });
  }
);
// @desc    Protected route example
// @route   GET /auth/protected
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ msg: 'This is a protected route', user: req.user });
});

module.exports = router;