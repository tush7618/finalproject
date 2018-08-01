exports.siteConfig = {
     base_url:"http://localhost:1500/"
};

// auth user table should have username and password field to validate
exports.db = {
    dbURL: 'mongodb://127.0.0.1:27017',
    dbName: 'crudDB',
    AuthUserTable:'users' 
};

exports.isLoggedIn = function(req,res){
    if(typeof req.session.isLoggedIn == "undefined"){
        return false;
    }else{
        return true;
    }
}
exports.logUserSearch = function(MongoClient,req,res){
        //req.path
        if(typeof req.session.isLoggedIn != "undefined"){
        MongoClient.connect("mongodb://127.0.0.1:27017", (err, client) => {
            if (err) return console.log(err);
            console.log("coming here");
            db = client.db("crudDB"); // use crudDB
            db.collection("analytics").save({
                page_url:req.path,
                username:req.session.userDetails.username,
                searchedat:new Date(Date.now())
            },function (err, result) {
              if (err) return console.log(err);
              console.log("logged saved result is : ",result);
            });
        });}else{
            console.log("skpping logging bcuase user is not logged");
        }
}
 
