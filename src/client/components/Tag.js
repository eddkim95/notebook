import React from 'react';

const Tag = (props) => {
  const { tag, index, deleteTag } = props;
  return (
    <div>
      <text>{tag}</text>
      <span>
        <input
          type='button'
          value='X'
          onClick={() => {
            deleteTag(index);
          }}
        />
      </span>
    </div>
  )
}

export default Tag;