import React from 'react';

const Note =  (props) => {
  const { title, content, tags, deleteNote, beginEdit, id } = props;
  return (
    <div className='note'>
      <text className='noteTitle'>{title}</text><br/>
      <text className='noteContent'>{content}</text>
      {tags && tags.map((tag) => {
        return (
          <text className='tag'>{tag}</text>
        )
      })}
      <input type='button' value='Edit' onClick={() => beginEdit({title, content, tags, id})}/>
      <input type='button' value='Delete' onClick={() => deleteNote(id)}/>
    </div>
  )
}

export default Note;