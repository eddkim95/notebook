const Note = require('../schemas/NoteSchema');

 const NoteController = {
   getNotes(req, res, next) {
      Note.find({}, (err, notes) => {
        if (err) return res.status(400).send(err);
        if (notes.length === 0) return res.status(400).send('Notes not found');
        res.status(200);
        res.locals.found_notes = notes;
        next();
      })
   },

   createNote(req, res, next) {
     const { title, content, tags } = req.body;
     Note.create({ title, content, tags }, (err, newNote) => {
       if (err) return res.status(400).send(err);
       res.locals.new_note = newNote;
       next();
     })
   },

   deleteNote(req, res, next) {
     const { id } = req.body;
     Note.deleteOne({ _id: id }, (err) => {
      if (err) return res.status(400).send(err);
      res.status(200);
      next();
     })
   }
 }

 module.exports = NoteController; 