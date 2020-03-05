const User = require('../models/user');

function getAllUsers(req,res){
    
    User.find({}, function(err, users) {
        if (err) throw err;
        console.log(users);
        res.json(users);
    });
}

function addUser(req, res) {
    const User = require('../models/user');

  const newUser = User ({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password
  });
  console.log(req.body);
  newUser.save(function(err) {
    if (err) throw err;
    res.json({info: 'Success'});

  });

}

function login(req, res) {
    const User = require('../models/user');

  const selog = User ({
      email : req.body.email,
      password : req.body.password
  });
  console.log(req.body);
  User.getAuthenticated(req.body.email, req.body.password, function(err, user, reason) {
    if (err) throw err;

    // login was successful if we have a user
    if (user) {
        // handle login success
        console.log('login success');
        res.json("login success")
        return;
    }

    // otherwise we can determine why we failed
    var reasons = User.failedLogin;
    switch (reason) {
        case reasons.NOT_FOUND:
        case reasons.PASSWORD_INCORRECT:
            // note: these cases are usually treated the same - don't tell
            // the user *why* the login failed, only that it did
            break;
        case reasons.MAX_ATTEMPTS:
            // send email or otherwise notify user that account is
            // temporarily locked
            break;
    }
});
}
module.exports.login=login;
module.exports.getAllUsers=getAllUsers;
module.exports.addUser=addUser; 