var express = require("express");
var router = express.Router();

function getNotes(db) {
  return new Promise((rs,rj) => {
    let sql = 'Select * from item';
      db.query(sql, (err, rows) => {
        if (err) {
          console.log("[SELECT ERROR] -", err);
          rj(err);
        } else {
          if (rows.length == 0) {
            rj('No data');
          } else {
            rs(rows);
          }
        }
      })
  })
}

router.get('/', async function(req, res, next ){
  try{
    let notes = await getNotes(req.db);
    console.log('Here are the notes');
    console.log(notes);
    res.render('notes',{title: 'This is note',todolist : notes});
  } catch (err) {
    console.log(err);
  }
})

function addNotes(db, data) {
  return new Promise((rs, rj) => {
    let sql = 'INSERT INTO `item`(`title`,`description`) VALUES (?,?)';
    let params = [data['title'],data['description']];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("[INSERT ERROR] -", err);
        rj(err);
      } else {
        rs('OK');
      }
    })
  })
}

router.post("/", async function(req,res,next) {
  try{
    let formData = req.body;
    console.log(formData);
    let title = formData['title'];
    await addNotes(req.db, formData);
    console.log(`added ${title} succeed`);
    // res.send
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})


module.exports = router;