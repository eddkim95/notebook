import React, { Component } from 'react';
import TagList from './TagList';

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.toEdit.title,
      content: props.toEdit.content,
      tags: props.toEdit.tags,
      _id: props.toEdit.id,
      tag: '',
    }
    this.deleteTag = this.deleteTag.bind(this)
  }
  
  updateField(field) {
    this.setState({[field.id]: field.value})
  }

  addTag() {
    const { tag, tags } = this.state;
    if (tag) this.setState({tags:[tag, ...tags], tag: ''})
  }

  deleteTag(tagIndex) {
    const { tags } = this.state;
    let updatedTags = tags.slice(0, tagIndex).concat(tags.slice(tagIndex + 1));
    this.setState({ tags: updatedTags });
  }

  render() {
    const { submitEdit } = this.props;
    const { title, content, tags, _id, tag } = this.state;
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          submitEdit({ title, content, tags, _id });
        }}>
          <label>Title
            <input
              id='title'
              value={title}
              onChange={(e) => this.updateField(e.target)}
            />
          </label>
          <label>Content
            <input
              id='content'
              value={content}
              onChange={(e) => this.updateField(e.target)}
            />
          </label>
          <label>Tag
            <input
              id='tag'
              value={tag}
              onChange={(e) => this.updateField(e.target)}
            />
          </label>
          <input
            type='button'
            value='Add Tag'
            onClick={() => this.addTag()}
          />
          <TagList tags={tags} deleteTag={this.deleteTag} />
          <input
            type='button'
            value='Cancel'
            onClick={() => submitEdit(null)}
          />
          <input
            type='submit'
            value='Submit'
          />
        </form>
      </div>
    )
  }
}