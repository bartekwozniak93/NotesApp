// Load required packages
var Note = require('../models/note');


exports.postNotes = function(req, res) {

  var note = new Note();

  note.title = req.body.title;
  note.content = req.body.content;
  note.userId = req.user._id;
  note.creationDate = Date.now();

  note.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'note added!', data: note });
  });
};


exports.getNotes = function(req, res) {


  Note.find({ userId: req.user._id }, function(err, notes) {
    if (err)
      res.send(err);

    res.json(notes);
  });
};


exports.getNote = function(req, res) {
  Note.find({ userId: req.user._id, _id: req.params.note_id }, function(err, note) {
    if (err)
      res.send(err);

    res.json(note);
  });
};


exports.putNote = function(req, res) {
  Note.update({ userId: req.user._id, _id: req.params.note_id }, { content: req.body.content }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};


exports.deleteNote = function(req, res) {
  Note.remove({ userId: req.user._id, _id: req.params.note_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Note removed from the locker!' });
  });
};