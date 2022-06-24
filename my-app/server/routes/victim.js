const express = require("express");
const victim = express.Router();
const db = require("../dbconnection");

victim.get("/list", (req, res) => {
  db.query(
    "select victim_id, name, gender, age, address, delete_yn from victim",
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

victim.get("/detail/:id", (req, res) => {
  const victimId = req.params.id;
  db.query(
    "select victim_id, name, gender, age, address, delete_yn from victim where victim_id = ?",
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
  const address = req.body.data.data[3];

  console.log(name);
  console.log(gender);
  console.log(age);
  console.log(address);

  const success = true;

  db.query(
    "insert into victim(name, gender, age, address) values(?, ?, ?, ?)",
    [name, gender, age, address],
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

victim.post("/update", (req, res) => {
  const name = req.body.data.data[0];
  const gender = req.body.data.data[1];
  const age = req.body.data.data[2];
  const id = req.body.data.data[3];

  console.log(name);
  console.log(gender);
  console.log(age);
  console.log(id);

  const success = true;

  db.query(
    "update victim set name = ?, gender = ?, age = ? where victim_id = ?",
    [name, gender, age, id],
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

victim.post("/delete/:id", (req, res) => {
  const victimId = req.params.id;

  console.log(victimId);

  const deleteYn = "Y";

  const success = true;

  db.query(
    "update victim set delete_yn = ? where victim_id = ?",
    [deleteYn, victimId],
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
