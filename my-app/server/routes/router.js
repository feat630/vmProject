const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

router.get('/getData', (req,res) => {
    db.query("select * from login", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

// router.get('/getPatient', (req,res) => {
//     db.query("select * from patient_list order by key_value", (err, rows) => {
//         if(!err) {
//             res.send(rows);
//         } else {
//             console.log(`query error: ${err}`);
//             res.send(err);
//         }
//     })
// })

// router.get('/getOne/:idx', (req, res) => {
//     const keyValue = req.params.idx;
//     db.query("select * from patient_detail where key_value = ? order by date desc", [keyValue], (err, rows) => {
//         if(!err) {
//             res.send(rows);
//         } else {
//             console.log(`query error: ${err}`);
//             res.send(err);
//         }
//     })
// })

// router.post('/postData', (req, res) => {
//     const name = req.body.data.data[0];
//     const age = req.body.data.data[1];
//     const add = req.body.data.data[2];

//     console.log(name)
//     console.log(age)
//     console.log(add)

//     db.query("insert into test(name, age, test_data) values(?, ?, ?)", [name, age, add], (err, rows) => {
//         if(!err) {
//             // res.send(rows);
//             console.log('success')
//         } else {
//             console.log(`query error: ${err}`);
//             res.send(err);
//         }
//     })
// })

// router.post('/insertPatient', (req, res) => {
//     const keyValue = req.body.data.data[0];
//     const name = req.body.data.data[1];
//     const gender = req.body.data.data[2];
//     const age = req.body.data.data[3];

//     console.log(keyValue)
//     console.log(name)
//     console.log(gender)
//     console.log(age)

//     db.query("insert into patient_list(key_value, name, gender, age) values(?, ?, ?, ?)", [keyValue, name, gender, age], (err, rows) => {
//         if(!err) {
//             // res.send(rows);
//             console.log('success')
//         } else {
//             console.log(`query error: ${err}`);
//             res.send(err);
//         }
//     })
// })

// router.post('/insertRecord', (req, res) => {
//     const keyValue = req.body.data.data[0];
//     const medicalRecord = req.body.data.data[1];
//     const etc = req.body.data.data[2];

//     console.log(keyValue)
//     console.log(medicalRecord)
//     console.log(etc)

//     db.query("insert into patient_detail(key_value, medical_record, etc) values(?, ?, ?)", [keyValue, medicalRecord, etc], (err, rows) => {
//         if(!err) {
//             // res.send(rows);
//             console.log('success')
//         } else {
//             console.log(`query error: ${err}`);
//             res.send(err);
//         }
//     })
// })

// router.post('/insertRecord', (req, res) => {
//     const keyValue = req.body.data.data[0];
//     const medicalRecord = req.body.data.data[1];
//     const etc = req.body.data.data[2];

//     console.log(keyValue)
//     console.log(medicalRecord)
//     console.log(etc)

//     db.query("insert into patient_detail(key_value, medical_record, etc) values(?, ?, ?)", [keyValue, medicalRecord, etc], (err, rows) => {
//         if(!err) {
//             // res.send(rows);
//             console.log('success')
//         } else {
//             console.log(`query error: ${err}`);
//             res.send(err);
//         }
//     })
// })

// router.delete('/deleteData', (req, res) => {
//     const name = req.body.data.data[0];
//     const age = req.body.data.data[1];
//     const add = req.body.data.data[2];

//     console.log(name)
//     console.log(age)
//     console.log(add)

//     db.query("delete from test where name = ? and age = ? and test_data = ?", [name, age, add], (err, rows) => {
//         if(!err) {
//             // res.send(rows);
//             console.log('success')
//         } else {
//             console.log(`query error: ${err}`);
//             res.send(err);
//         }
//     })
// })

module.exports =router;