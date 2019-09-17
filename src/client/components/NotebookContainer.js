import React, { Component } from 'react';
import SearchBar from  './SearchBar';
import NotesList from './NotesList'

export default class NotebookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      search: '',
      searchBy: '',
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/notes')
      .then(res => res.json())
      .then(notes => {
        console.log(notes)
        this.setState({ notes })
      })
  }

  render() {
    return (
      <div>
        <SearchBar />
        <NotesList notes={this.state.notes}/>
      </div>
    )
  }
}