import React, { Component } from 'react';
import SearchBar from  './SearchBar';
import NewNote from './NewNote';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';

export default class NotebookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchTerm: '',
      searchBasis: '',
      showPopup: false,
      toEdit: null,
    }
    this.createNote = this.createNote.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.beginEdit = this.beginEdit.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
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

  filteredNotes() {
    const { notes, searchTerm, searchBasis } = this.state;
    if (!searchTerm) return notes;
    if (searchBasis === 'tags') {
      return notes.filter((note) => {
        return note[searchBasis].map((toSearch) => {
          return toSearch.toLowerCase()
        }).includes(searchTerm.toLowerCase())
      })
    } else {
      return notes.filter((note) => {
        return note[searchBasis].toLowerCase().includes(searchTerm.toLowerCase())
      })
    }
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
        console.log(note);
        this.setState({ notes: [note, ...this.state.notes] });
      })
  }

  deleteNote(noteID) {
    const { notes } = this.state;
    console.log(noteID)
    let deleteIndex = notes.findIndex(x => x._id === noteID)
    let updatedNotes = notes.slice(0, deleteIndex).concat(notes.slice(deleteIndex + 1))
    this.setState({ notes: updatedNotes });
    fetch('http://localhost:8080/notes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: noteID }),
    })
  }

  beginEdit(note) {
    this.setState({ showPopup: true, toEdit: note });
  }

  submitEdit(editedNote) {
    if (!editedNote) return this.setState({ showPopup: false, toEdit: null});
    const { notes } = this.state;
    const { title, content, tags, _id } = editedNote;
    console.log('EDITED NOTE', editedNote)
    let replaceIndex = notes.findIndex(x => x._id === _id)
    let updatedNotes = notes.slice(0, replaceIndex).concat(editedNote, notes.slice(replaceIndex + 1))
    this.setState({ notes: updatedNotes, showPopup: false, toEdit: null })
    fetch('http://localhost:8080/notes', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedNote),
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        { this.state.showPopup ? 
          <NoteEditor
            submitEdit={this.submitEdit}
            toEdit={this.state.toEdit}
          /> :
          null
        }
        <SearchBar setFilter={this.setFilter} />
        <NewNote createNote={this.createNote} />
        <NotesList
          notes={this.filteredNotes()}
          deleteNote={this.deleteNote}
          beginEdit={this.beginEdit}
        />
      </div>
    )
  }
}