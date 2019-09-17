import React, { Component } from 'react';

export default class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  updateField(field) {
    this.setState({[field.id]: field.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.createNote(e, {title: this.state.title, content: this.state.content})}>
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