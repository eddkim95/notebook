import React from 'react';
import Note from './Note';

const NotesList = (props) => {
  const { notes, deleteNote, beginEdit } = props;
  return (
    <div>
      { notes.length ?
        notes.map((note) => {
          return (
            <Note
              title={note.title}
              content={note.content}
              tags={note.tags}
              id={note._id}
              deleteNote={deleteNote}
              beginEdit={beginEdit}
            />
          )
        }) :
        <div>No Matches Found</div>
      }
    </div>
  )
}

export default NotesList;