var express = require('express');
var router = express.Router();
var userModel = require("./user")

router.get('/', async function(req, res, next) {
  res.render("main")
});

router.post("/create", async function(req, res, next){
  let {name, email, image} = req.body;
  let userCreated =  await userModel.create({
    name,
    email,
    image
  });
  res.redirect("/read")
});

router.get('/read', async function(req, res, next){
  let users = await userModel.find();
  try{ 
    res.render("read", {users}) 
  } catch(err) {
    console.log(err);
    next(err);
  } 
});

router.get("/edit/:id", async(req, res)=>{
  let user = await userModel.findOne({_id: req.params.id});
  res.render("edit", {user});
})

router.post("/edit/:id", async(req, res)=>{
  let {name, email, image} = req.body;
  let user = await userModel.findOneAndUpdate(req.params.id, { $set: { name, email, image } }, { new: true });
  res.redirect("/read")
})


router.get("/delete/:id", async (req, res)=>{
  let deleteUser = await userModel.findOneAndDelete({_id: req.params.id});
  res.redirect("/read");
})

module.exports = router;
