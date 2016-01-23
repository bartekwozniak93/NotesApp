var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var noteController = require('./controllers/note');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');


mongoose.connect('mongodb://admin:admin@ds047315.mongolab.com:47315/notesdbbw');


var app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(passport.initialize());


var router = express.Router();


router.route('/notes')
  .post(authController.isAuthenticated, noteController.postNotes)
  .get(authController.isAuthenticated, noteController.getNotes);


router.route('/notes/:note_id')
  .get(authController.isAuthenticated, noteController.getNote)
  .put(authController.isAuthenticated, noteController.putNote)
  .delete(authController.isAuthenticated, noteController.deleteNote);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/user')
  .post(userController.verifyUser);

  

app.use('/api', router);
var port = Number(process.env.PORT || 3000);
app.listen(port);
