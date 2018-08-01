var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
var dbURL = "mongodb://127.0.0.1:27017";

var config = require("./config");

/* GET home page. */
router.get('/', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  
  res.render('index', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/index', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('index', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});

router.get('/productList', function(req, res, next) {
  
  config.logUserSearch(MongoClient,req,res);

  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crudDB'); // use crudDB

    db.collection('products').find(req.query).toArray(function (err, result) {
      if (err) return console.log(err);
      catTitle = "All products";
      if(typeof req.query.product_cat !="undefined"){
          catTitle = req.query.product_cat;
      }
      res.render('products/product_list', { products:result, title: catTitle,base_url:config.siteConfig.base_url,session:req.session });
    });
  });

  
});

router.get('/washing', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('washing', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/about', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('about', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/bakery', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('bakery', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/displayequipment', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('displayequipment', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/table&trolly', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('table&trolly', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/contact', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('contact', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});

router.get('/news', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('news', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});







router.get('/enquiry', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('enquiry', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/serman', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('serman', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/cold', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('cold', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/bar&baverage', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  
  res.render('bar&baverage', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/rasntional', function(req, res, next) {
  // console.log("current path is "+req.path);
  config.logUserSearch(MongoClient,req,res);
  res.render('rasntional', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/hot', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  res.render('hot', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/prep', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  res.render('prep', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/monitowoc', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  res.render('monitowoc', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});

router.get('/canteen', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  res.render('canteen', { title: 'Express',base_url:config.siteConfig.base_url,session:req.session });
});
router.get('/login', function(req, res, next) {
  config.logUserSearch(MongoClient,req,res);
  res.render('login', { title: 'Login Form',
    subTitle: 'Create User',
    extraMessage: typeof req.query.insertSuccess !="undefined" ? req.query.insertSuccess==1?"User Added Successfully":"Error while adding users":""
  });
});
// doing insert
router.post('/insert', function (req, res, next) {
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crudDB'); // use crudDB
    db.collection('users').save(req.body, function (err, result) {
      if (err) return console.log(err);
      res.end("/?insertSuccess=1");
    });
  });
});

// doing insert
router.post('/reg', function (req, res, next) {
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crudDB'); // use crudDB
    db.collection('users').save(req.body, function (err, result) {
      if (err) return console.log(err);
      res.redirect("auth/login.html");
    });
  });
});



// doing insert
router.post('/save', function (req, res, next) {
  console.log("save contact ",req.body);
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crudDB'); // use crudDB
    db.collection('users').save(req.body, function (err, result) {
      if (err) return console.log(err);
      res.end("/?insertSuccess=1");
    });
  });
});

// doing insert
router.post('/psave', function (req, res, next) {
  // var app = express();
  // res.send(__dirname+"\\..\\");
  // return; 
// console.log(req.files);
// res.send("Hello");
// return;
  let product_img = req.files.pro;
  url = "product_images/file"+Math.random(0,999)+req.files.pro.name;
  // console.log("product url",url);
  // final_path = __dirname+"/../public/"+url;
  // console.log(final_path);
  product_img.mv("public/"+url, function(err) {
    if (err)
      return res.status(500).send(err);

      MongoClient.connect(dbURL, (err, client) => {
        if (err) return console.log(err);
        db = client.db('crudDB'); // use crudDB

        var insertdata = {
          product_name:req.body.product_name,
          product_url:url,
          product_cat:req.body.product_cat,
          product_price:req.body.product_price
        }

        console.log(insertdata);  
        db.collection('products').save(insertdata, function (err, result) {
          if (err) return console.log(err);
          res.end("/?insertSuccess=1");
        });
      });
  });
  
 

  console.log("save  ",req.body);
  
});


router.post('/sav', function (req, res, next) {
  console.log("save contact ",req.body);
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crudDB'); // use crudDB
    db.collection('contact').save(req.body, function (err, result) {
      if (err) return console.log(err);
      res.end("/?insertSuccess=1");
    });
  });
});



router.get('/dele', function (req, res, next) {
  // console.log(req.query);
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crudDB'); // use crudDB
    db.collection('users').remove({ "_id": new mongodb.ObjectId(req.query.objectID) }, function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      res.redirect("/listofusers?delSucc=1");
    });
  });
});




router.get('/delete', function (req, res, next) {
  // console.log(req.query);
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crudDB'); // use crudDB
    db.collection('products').remove({ "_id": new mongodb.ObjectId(req.query.objectID) }, function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      res.end("/listofproduct?delSucc=1");
    });
  });
});

// list of all users
router.get('/listofusers', function (req, res, next) {
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crudDB'); // use crudDB
    db.collection('users').find().toArray(function (err, result) {
      if (err) return console.log(err);
      res.render('userslist', {
        title: 'Users List',
        subTitle: 'All Users',
        'users': result,
        extraMessage: typeof req.query.delSucc !="undefined" ? req.query.delSucc==1?"User Deleted Successfully":"Error while deleting users":""
      });
    });
  });
});


// list of all users
router.get('/updateUser', function (req, res, next) {
  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crudDB'); // use crudDB
    db.collection('users').find({"_id":new mongodb.ObjectId(req.query.objectID)}).toArray(function (err, result) {
      if (err) return console.log(err);
      // console.log("value coming for userid "+req.query.objectID);
      // console.log(result[0]);
      res.render('updateuserForm', {
        title: 'Update Page',
        subTitle: 'Update User',
        usersDetails:result[0],
        extraMessage: typeof req.query.insertSuccess !="undefined" ? req.query.insertSuccess==1?"User Added Successfully":"Error while adding users":""
      });
    });
  }); 

});

// doing insert
router.post('/updateuserindb', function (req, res, next) {

  MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crudDB'); // use crudDB
    db.collection('users').update({'username':req.body.username},req.body,{upsert:false}, function (err, result) {
      if (err) return console.log(err);
      res.redirect("/listofusers");
    });
  });
});

module.exports = router;
