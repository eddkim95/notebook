import React, { Component } from 'react';
import SearchBar from  './SearchBar';
import NewNote from './NewNote';
import NotesList from './NotesList';

export default class NotebookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      search: '',
      searchBy: '',
    }
    this.createNote = this.createNote.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:8080/notes')
      .then(res => res.json())
      .then(notes => {
        console.log(notes)
        this.setState({ notes: notes.reverse() })
      })
  }

  createNote(e, note) {
    e.preventDefault();
    console.log(JSON.stringify(note))
    fetch('http://localhost:8080/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then(res => res.json())
      .then(note => {
        console.log(note)
        let stateCopy = [note, ...this.state.notes];
        this.setState({notes: stateCopy})
      })
  }

  render() {
    return (
      <div>
        <SearchBar />
        <NewNote createNote={this.createNote} />
        <NotesList notes={this.state.notes}/>
      </div>
    )
  }
}