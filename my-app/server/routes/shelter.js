const express = require('express');
const shelter = express.Router();
const db = require('../dbconnection');

shelter.get('/getData', (req,res) => {
    db.query("select * from shelter", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

module.exports =shelter;