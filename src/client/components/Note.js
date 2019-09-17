import React from 'react';

const Note =  (props) => {
  const { title, content } = props;
  return (
    <div>
      <h4>{title}</h4>
      <h3>{content}</h3>
    </div>
  )
}

export default Note;