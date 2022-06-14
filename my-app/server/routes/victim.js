const express = require("express");
const victim = express.Router();
const db = require("../dbconnection");

victim.get("/list", (req, res) => {
  db.query("select * from victim", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(`query error: ${err}`);
      res.send(err);
    }
  });
});

victim.get("/detail/:id", (req, res) => {
  const victimId = req.params.id;
  db.query(
    "select * from victim where victim_id = ?",
    [victimId],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(`query error: ${err}`);
        res.send(err);
      }
    }
  );
});

victim.post("/register", (req, res) => {
  const name = req.body.data.data[0];
  const gender = req.body.data.data[1];
  const age = req.body.data.data[2];

  console.log(name);
  console.log(gender);
  console.log(age);

  db.query(
    "insert into victim(name, gender, age) values(?, ?, ?)",
    [name, gender, age],
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

module.exports = victim;
