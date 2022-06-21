const express = require('express');
const shelter = express.Router();
const db = require('../dbconnection');

shelter.get('/getData', (req,res) => {
<<<<<<< HEAD
    if (req.session.num === undefined) {
        req.session.num = 1;
        console.log("생성")
      } else {
        req.session.num++;
        console.log("증가")
      }
      console.log(req.session);
      const num = req.session.num;
    db.query("select * from shelter", (err, rows) => {
        if(!err) {
            const ewq = {rows, num}
            res.send(ewq);
            // console.log(ewq)
            
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

shelter.get('/getOne/:index', (req,res) => {
    const sId = req.params.index;
    db.query("select * from shelter where shelter_id = ?", [sId], (err, rows) => {
        if(!err) {
=======
    db.query("select * from shelter", (err, rows) => {
        if(!err) {
>>>>>>> vmSupplies
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

<<<<<<< HEAD
shelter.post('/postData', (req, res) => {
    const name = req.body.data.data[0];
    const quantity = req.body.data.data[1];

    db.query("insert into shelter(shelter_name, shelter_quantity) values(?, ?)", [name, quantity], (err, rows) => {
        if(!err) {
            // res.send(rows);
            console.log('success')
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

shelter.post('/deleteData', (req, res) => {
    const id = req.body.data.data[0];

    db.query("delete from shelter where shelter_id = ?", [id], (err, rows) => {
        if(!err) {
            // res.send(rows);
            console.log('success')
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

shelter.post('/updateData', (req, res) => {
    const id = req.body.data.data[0];
    const name = req.body.data.data[1];
    const quantity = req.body.data.data[2];

    db.query("update shelter set shelter_name = ?, shelter_quantity = ? where shelter_id = ?", [name, quantity, id], (err, rows) => {
        if(!err) {
            // res.send(rows);
            console.log('success')
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

=======
>>>>>>> vmSupplies
module.exports =shelter;