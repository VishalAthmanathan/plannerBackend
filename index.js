// const express = require("express");
// const db = require('./database/db');

// const app = express();
// app.use(express.json());
// app.use('/',require('./routes/authroutes'));

// app.listen(8000, () => {
//     console.log("Server running");
//     db.connect((err) => {
//         if (err) throw err;
//         console.log("DB Connected Succesfully");
//     })
// })
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/authroutes');
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