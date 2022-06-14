const express = require('express');
const supplies = express.Router();
const db = require('../dbconnection');

supplies.get('/getData', (req,res) => {
    db.query("select * from supplies", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

module.exports =supplies;