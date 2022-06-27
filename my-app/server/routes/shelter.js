const express = require('express');
const shelter = express.Router();
const db = require('../dbconnection');

shelter.get('/getData', (req,res) => {
    if (req.session.num === undefined) {
        req.session.num = 1;
        console.log("생성")
      } else {
        req.session.num++;
        console.log("증가")
      }
      console.log(req.session);
      const num = req.session.num;
    db.query("select shelter_id, shelter_name, shelter_category, shelter_address, shelter_quantity, shelter_tel from shelter where del_yn = false", (err, rows) => {
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
    db.query("select shelter_id, shelter_name, shelter_category, shelter_address, shelter_quantity, shelter_tel from shelter where shelter_id = ?", [sId], (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

shelter.post('/postData', (req, res) => {
    const name = req.body.data.data[0];
    const quantity = req.body.data.data[1];
    const category = req.body.data.data[2];
    const address = req.body.data.data[3];
    const tel = req.body.data.data[4];

    db.query("insert into shelter(shelter_name, shelter_quantity, shelter_category, shelter_address, shelter_tel) values(?, ?, ?, ?, ?)", [name, quantity, category, address, tel], (err, rows) => {
        if(!err) {
            res.send(true);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

shelter.post('/deleteData', (req, res) => {
    const id = req.body.data.data[0];

    db.query("update shelter set del_yn = true, upt_date = now() where shelter_id = ?", [id], (err, rows) => {
        if(!err) {
            res.send(true);
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
    const category = req.body.data.data[3];
    const address = req.body.data.data[4];
    const tel = req.body.data.data[5];

    db.query("update shelter set shelter_name = ?, shelter_quantity = ?, shelter_category = ?, shelter_address = ?, shelter_tel = ?, upt_date = now() where shelter_id = ?", [name, quantity, category, address, tel,id], (err, rows) => {
        if(!err) {
            res.send(true);
            console.log('success')
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

module.exports =shelter;