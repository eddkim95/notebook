import React from 'react';

const Note =  (props) => {
  const { title, content, deleteNote, id } = props;
  return (
    <div className='note'>
      <text className='noteTitle'>{title}</text><br/>
      <text className='noteContent'>{content}</text>
      <input type='button' value='Delete' onClick={() => deleteNote(id)}/>
    </div>
  )
}

export default Note;