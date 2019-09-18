import React, { Component } from 'react';
import SearchBar from  './SearchBar';
import NewNote from './NewNote';
import NotesList from './NotesList';

export default class NotebookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchTerm: '',
      searchBasis: '',
    }
    this.createNote = this.createNote.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:8080/notes')
      .then(res => res.json())
      .then(noteList => {
        this.setState({ notes: noteList.reverse() })
      })
  }

  setFilter(searchTerm, searchBasis) {
    this.setState({ searchTerm, searchBasis })
  }

  createNote(note) {
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
        this.setState({notes: [note, ...this.state.notes]})
      })
  }

  deleteNote(noteID) {
    const { notes } = this.state;
    let deleteIndex = notes.findIndex(x => x._id === noteID)
    let updatedNotes = notes.slice(0, deleteIndex).concat(notes.slice(deleteIndex + 1))
    this.setState({ notes: updatedNotes });
  }

  render() {
    const { notes, searchTerm, searchBasis } = this.state;
    console.log(notes)
    let filteredNotes = !searchTerm ? notes : notes.filter((note) => {
      return note[searchBasis].toLowerCase().includes(searchTerm.toLowerCase())
    })
    return (
      <div>
        <SearchBar setFilter={this.setFilter} />
        <NewNote createNote={this.createNote} />
        <NotesList notes={filteredNotes} deleteNote={this.deleteNote}/>
      </div>
    )
  }
}