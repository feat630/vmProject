const express = require('express');
const login = express.Router();
const db = require('../dbconnection');

login.post('/check', (req,res) => {
    const id = req.body.data.data[0];
    const pw = req.body.data.data[1];

    db.query("select * from login where id = ? and password = ?", [id, pw], (err, rows) => {
        if(rows[0] != null) {
            req.session.user = rows[0];
            res.send(rows);
            console.log(req.session);
        } else {
            res.send(false);
            console.log(`ID or PW not match`);
        }
    })
})
 
login.get('/logout', (req,res) => {
    req.session.destroy();
    res.send(true);
})

login.get('/status', (req,res) => {
    if (req.session.user === undefined) {
        res.send(false);
      } else {
        res.send(req.session.user);
      }
})

module.exports =login;