import React from 'react';
import Tag from  './Tag';

const TagList = (props) => {
  const { tags, deleteTag } = props;
  if (!tags) return null;
  return (
    <div>
      { tags.map((tag, i) => {
        return (
          <Tag tag={tag} index={i} deleteTag={deleteTag} />
        )
      })}
    </div>
  )
}

export default TagList;