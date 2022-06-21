const express = require('express');
const supplies = express.Router();
const db = require('../dbconnection');

supplies.get('/main', (req,res) => {
    db.query("select * from supplies", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

/* list  부분 
supplies.get('/main', (req,res) => {
    db.query("select * from supplies order by no", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})*/


supplies.get('/detail/:id', (req,res) => {
    const no = req.params.id;
    db.query("select * from supplies where no = ?", [no], (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
            alert("상세정보를 가져오기 실패했습니다.")
        }
      }
    );
});

supplies.post('/input', (req, res) => {
    const name = req.body.data.data[0];
    const quantity = req.body.data.data[1];

    console.log(name);
    console.log(quantity);

    const success =true; // 정의되지 않았기때문에 서버가 다운된다. 그래서 이걸 넣어줘야한다. 

    db.query("insert into supplies(name,quantity) values(?, ?)", [name,quantity], (err, rows) => {
        if(!err) {
            res.send(success);
            console.log('success');
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
})

supplies.post('/update', (req, res) => {
    const name = req.body.data.data[0];
    const quantity = req.body.data.data[1];

    console.log(name);
    console.log(quantity);
   
    const success =true;
 
     db.query("update supplies set name=? , quantity =? where no=?", [name, quantity, no], (err, rows) => {
        const no = req.params.id;
       console.log(no);

        if(!err) {
             res.send(success);
             console.log('success')
         } else {
             console.log(`query error: ${err}`);
             res.send(err);
             alert("변경 실패했습니다.")
         }
     })
 })

supplies.delete('/delete/:id', (req, res) => {
   const no = req.params.id;
   console.log(no);
   // const name = req.body.data.data[0];
    //const quantity = req.body.data.data[1];
    
    //console.log(name)
   //console.log(quantity)

   const success =true;

    db.query("delete from supplies where no=?", [no], (err, rows) => {
        if(!err) {
            res.send(success);
            console.log('success')
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
            alert("삭제하기 실패했습니다.")
        }
    })
})

module.exports =supplies;