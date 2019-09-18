import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchBasis: 'title',
    }
  }

  setSearchTerm(value) {
    this.setState({ searchTerm: value })
  }

  setSearchBasis(basis) {
    console.log(basis)
    this.setState({ searchBasis: basis })
  }

  render() {
    const { setFilter } = this.props;
    const { searchTerm, searchBasis } = this.state;
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          setFilter(searchTerm, searchBasis);
        }}>
          <fieldset>
            <legend>Filter Notes</legend>
              <input
                value={this.state.searchTerm}
                onChange={(e) => this.setSearchTerm(e.target.value)}
              />
            <label>Title
              <input
                defaultChecked
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
            <input 
              type='button'
              value='Show All'
              onClick={(e) => {
                e.preventDefault();
                this.setState({searchTerm: ''})
                setFilter('', '');
              }}
            />
          </fieldset>
        </form>
      </div>
    )
  }
}