import React from 'react';
import Note from './Note';

const NotesList = (props) => {
  const { notes, deleteNote } = props;
  return (
    <div>
      { notes.map((note) => {
        return (
          <Note title={note.title}
            content={note.content}
            id={note._id}
            deleteNote={deleteNote}
          />
        )
      })}
    </div>
  )
}

export default NotesList;