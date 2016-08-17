var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');

module.exports.register = function(req,res) {
    console.log('registering users');
    var username = req.body.username;
    var name = req.body.name || null;
    var password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    User.create({
        username : username,
        name : name,
        password : password
    }, function(err, user){
        if(err) {
            console.log(err);
            res
                .status(400)
                .json(err);
        } else {
            console.log("user created ", user);
            res
                .status(201)
                .json(user);
        }

    });
};

module.exports.login = function(req, res) {
    console.log("logging in user");
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username : username
    })
        .exec(function(err, user){
            if(err){
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('compareSync ',bcrypt.compareSync(password, user.password));
                if(bcrypt.compareSync(password, user.password)){
                    console.log('found user ', user);
                    res.status(200).json(user);
                } else {
                    console.log("unauthorized password", password," user.password",user.password);
                    res.status(401).json({"message": "unauthorized"});
                }
                
            }
        });

};