var User = require('../models/user');


exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    touchPassword: req.body.touchPassword,
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'true' });
  });
};


exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};


exports.verifyUser = function(req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {

      if (err || !user) { 
        res.json({ message: 'false' });
      }
      else
      {
        user.verifyPassword(req.body.password, function(err, isMatch) {
        if (err || !isMatch) { 
          res.json({ message: 'false' });
        }
        else{
          res.json({ message: 'true' });
        }});
      }
    });

};