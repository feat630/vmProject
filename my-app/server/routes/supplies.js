const express = require('express');
const supplies = express.Router();
const db = require('../dbconnection');

supplies.get("/main", (req, res) => {
  db.query("select no,type, name,place, total,distribution,damage,possibility from supplies", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(`query error: ${err}`);
      res.send(err);
    }
  });
});

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

supplies.get("/detail/:id", (req, res) => {
  const no = req.params.id;
  db.query("select type, name,place, total,distribution,damage,possibility from supplies where no = ?", [no], (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(`query error: ${err}`);
      res.send(err);
      console.log("상세정보를 가져오기 실패했습니다.");
    }
  });
});

supplies.post("/input", (req, res) => {
  const type = req.body.data.data[0];
  const name = req.body.data.data[1];
  const place =  req.body.data.data[2];
  const total = req.body.data.data[3];
  const distribution = req.body.data.data[4];
  const damage = req.body.data.data[5];
  const possibility = req.body.data.data[6];
  


  console.log(name);
  console.log(type);
  console.log(place);
  console.log(total);
  console.log(distribution);
  console.log(damage);
 console.log(possibility);
  
 const success = true;

  db.query(
    "insert into supplies( type, name,place, total,distribution,damage,possibility) values(?, ?,? ,? ,?,?,?)",
    [type,name, place, total, distribution, damage, possibility ],
    (err, rows) => {
      if (!err) {
        res.send(success);
        console.log("success");
      } else {
        console.log(`query error: ${err}`);
        res.send(err);
      }
    }
    );
});

supplies.post("/update", (req, res) => {
    
  const name = req.body.data.data[0];
  const type = req.body.data.data[1];
  const place =  req.body.data.data[2];
  const total = req.body.data.data[3];
  const distribution = req.body.data.data[4];
  const damage = req.body.data.data[5];
  const possibility = req.body.data.data[6];
  const no =req.body.data.data[7];

  console.log(name);
  

    const success =true; // 정의되지 않았기때문에 서버가 다운된다. 그래서 이걸 넣어줘야한다. 

  db.query(
    "update supplies set name =?, type=? , place =?, total = ?, distribution =?, damage =? , possibility =?  where no=?",
    [name, type, place, total, distribution, damage, possibility, no],
    (err, rows) => {
      if (!err) {
        res.send(success);
        console.log("success");
      } else {
        console.log(`query error: ${err}`);
        res.send(err);
       console.log("변경 실패했습니다.");
      }
    }
  );
});

   


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