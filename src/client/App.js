import React, { Component } from 'react';
import './App.css';
import NotebookContainer from './components/NotebookContainer'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <NotebookContainer />
      </div>
    )
  }
}