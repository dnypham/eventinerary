import React from 'react';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: ''
    });

    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const search = this.state.value;

    this.props.search(search);

    this.setState({ value: '' });
  }

  getSearchTerm(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="search-container">
        <input className="searchbar" value={this.state.value} onChange={this.getSearchTerm} placeholder="Search for artist, sports team, or venue"></input>
        <a href="#results" className="search-btn" onClick={this.handleClick}>SEARCH</a>
      </div>
    );
  }
}
