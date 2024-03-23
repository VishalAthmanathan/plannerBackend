const db = require('../database/db');

const test = (req, res) => {
  console.log("Working");
  res.json("Backend working");
}

const userReg = (req,res) =>{
    const fullname = req.body.username;
    const mailid = req.body.mail;
    const password = req.body.password;
    console.log(fullname,mailid,password);
    let sql = 'INSERT into users (name, email, password) VALUES ($1, $2, $3)';
    const VALUES = [fullname, mailid, password];
    db.query(sql, VALUES,(error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
      }
      console.log("Data added successfully");
      res.status(200).json("Added to DB Successfully");
      // res.redirect()
      
    });
  }

module.exports = {
    test,
    userReg
}