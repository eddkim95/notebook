import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchBasis: '',
    }
  }

  updateSearch(value) {
    this.setState({ searchTerm: value })
  }

  setSearchBasis(basis) {
    console.log(basis)
    this.setState({ searchBasis: basis })
  }

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <legend>Filter Notes</legend>
              <input
                value={this.state.searchTerm}
                onChange={(e) => this.updateSearch(e.target.value)}
              />
            <label>Title
              <input 
                type='radio'
                name='searchBasis'
                id='title'
                onClick={(e) => this.setSearchBasis(e.target.id)}
              />
            </label>
            <label>Tag
              <input 
                type='radio'
                name='searchBasis'
                id='tag'
                onClick={(e) => this.setSearchBasis(e.target.id)}
              />
            </label>
            <input 
              type='submit'
              value='Filter'
            />
          </fieldset>
        </form>
      </div>
    )
  }
}