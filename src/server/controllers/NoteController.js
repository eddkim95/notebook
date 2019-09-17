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
     const { title, content } = req.body;
     Note.create({ title, content }, (err, note) => {
       if (err) return res.status(400).send(err);
       res.locals.new_note = note;
       next();
     })
   }
 }

 module.exports = NoteController; 