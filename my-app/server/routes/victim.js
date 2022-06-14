const express = require('express');
const victim = express.Router();
const db = require('../dbconnection');

victim.get('/getData', (req,res) => {
    db.query("select * from victim", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

module.exports =victim;