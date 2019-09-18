import React, { Component } from 'react';
import TagList from './TagList';

export default class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tag: '',
      tags: [],
    }
    this.deleteTag = this.deleteTag.bind(this);
  }

  updateField(field) {
    this.setState({[field.id]: field.value})
  }

  addTag() {
    this.setState({tags:[this.state.tag, ...this.state.tags], tag: ''})
  }

  deleteTag(tagIndex) {
    const { tags } = this.state;
    let updatedTags = tags.slice(0, tagIndex).concat(tags.slice(tagIndex + 1));
    this.setState({ tags: updatedTags });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.createNote({title: this.state.title, content: this.state.content});
        }}>
          <fieldset>
            <legend>Create Note</legend>
            <label>Title
              <input
                id='title'
                value={this.state.title}
                onChange={(e) => this.updateField(e.target)}
              />
            </label>
            <label>Content
              <input
                id='content'
                value={this.state.content}
                onChange={(e) => this.updateField(e.target)}
              />
            </label>
            <label>Tag
              <input
                id='tag'
                value={this.state.tag}
                onChange={(e) => this.updateField(e.target)}
              />
            </label>
            <input
              type='button'
              value='Add Tag'
              onClick={() => this.addTag()}
            />
            <TagList tags={this.state.tags} deleteTag={this.deleteTag} />
            <input 
              type='submit'
              value='Create'
            />
          </fieldset>
        </form>
      </div>
    )
  }
}