import React from 'react';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      search: ''
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    return (
      <div className="search-container">
        <input className="searchbar" value={this.state.search} onChange={this.handleChange} placeholder="Search for artist, sports team, or venue"></input>
        <a href="#results" className="search-btn">SEARCH</a>
      </div>
    );
  }
}
