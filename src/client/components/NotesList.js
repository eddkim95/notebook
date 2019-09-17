import React from 'react';
import Note from './Note';

const NotesList = (props) => {
  const { notes } = props;
  return (
    <div>
      { notes.map(note => {
        return <Note title={note.title} content={note.content} />
      })}
    </div>
  )
}

export default NotesList;