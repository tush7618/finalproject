var express = require('express');
var router = express.Router();
var config = require('./config');
var mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
/* GET home page. */
router.get('/login.html', function (req, res, next) {
    
    if(config.isLoggedIn(req,res)){
        res.redirect(config.siteConfig.base_url);
    }
     res.render("admin_panel/auth/login",{base_url:config.siteConfig.base_url,session:req.session});
}); 

// it will check login
router.post('/checklogin.html', function (req, res, next) {
    // console.log("config.dbURL" + config.db.dbURL);
    // return;
    MongoClient.connect(config.db.dbURL, (err, client) => {
        if (err) return console.log(err);
        console.log("coming here");
        db = client.db(config.db.dbName); // use crudDB
        db.collection(config.db.AuthUserTable).find(req.body).toArray(function (err, result) {
          if (err) return console.log(err);
          console.log("length of result is "+result.length);
          if(result.length>0){
              req.session.userDetails = result[0];
              req.session.isLoggedIn = true;
              console.log(req.session);
              res.redirect(config.siteConfig.base_url);
          }else{
            res.redirect(config.siteConfig.base_url+"auth/login.html?loginsucc=0");
          }
        //   res.json(result);
        });
    });
}); 


router.get('/register.html', function (req, res, next) {
    res.render("admin_panel/auth/register",{base_url:config.siteConfig.base_url,session:req.session});
});  
router.get('/user.html', function (req, res, next) {
    if(!config.isLoggedIn(req,res)){
        res.redirect(config.siteConfig.base_url);
    }
    res.render("admin_panel/auth/user",{base_url:config.siteConfig.base_url,session:req.session});
});  
router.get('/register.html', function (req, res, next) {
    res.render("admin_panel/auth/register",{base_url:config.siteConfig.base_url,session:req.session});
});  
router.get('/add', function (req, res, next) {
    res.render("admin_panel/auth/add",{base_url:config.siteConfig.base_url,session:req.session});
});  
router.get('/delete', function (req, res, next) {
    res.render("admin_panel/auth/delete",{base_url:config.siteConfig.base_url,session:req.session});
});  


router.get('/logout.html', function (req, res, next) {
    req.session.destroy();
    res.redirect(config.siteConfig.base_url);    
});
router.get('/forget-password', function (req, res, next) {
        
});
router.get('/reset-password', function (req, res, next) {
        
});
router.get('/dashboard', function (req, res, next) {
        console.log(req.session);
        res.end("you are here");
});
module.exports = router;
    