const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const app = express();
require('./passport')(passport)
// // DB Config
// const db = 'YOUR_MONGODB_CONNECTION_STRING';

// // Connect to MongoDB
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.get('/',(req,res)=>{
    res.send("hi")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))
