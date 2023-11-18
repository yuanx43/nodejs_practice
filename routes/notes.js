var express = require("express");
var router = express.Router();

// read
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

// create
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
    res.redirect('/notes');
    // res.send
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})

//get one
function getSelected(db, id) {
  return new Promise((rs, rj) => {
    let sql = 'SELECT * FROM `item` WHERE id = ?';
    let params = [id];
    db.query(sql, params, (err, rows) => {
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

router.get("/edit/:id", async function(req,res,next){
  let note_id = req.params.id;
  console.log(note_id);
  try{
    let result = await getSelected(req.db, note_id);
    // console.log(...result);
    res.render("edit", { title: "Edit", note: result});
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})



// update
function updateNote(db, id,title, description) {
  return new Promise((rs,rj) =>{
    let sql = 'UPDATE `item` SET `title`=?,`description`=?,`time` = CURRENT_TIMESTAMP WHERE id =?';
    let params = [title,description,id];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("[UPDATE ERROR] -", err);
        rj(err);
      } else {
        rs('OK');
      }
    })
  })
}

router.post("/edit/:id", async function(req,res,next){
  let note_id = req.params.id;
  let formData = req.body;
  console.log("f=",formData);
  try{ 
    let title = formData['title'];
    let description = formData['description'];
    await updateNote(req.db,note_id,title,description);
    console.log(description,note_id);
    res.redirect("/notes");
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})


module.exports = router;