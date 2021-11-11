import React from 'react';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: ''
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick(event) {
    const search = this.state.value;

    this.props.search(search);

    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="search-container">
        <input className="searchbar" value={this.state.value} onChange={this.handleChange} placeholder="Search for artist, sports team, or venue"></input>
        <button className="search-btn" onClick={this.handleClick}>SEARCH</button>
      </div>
    );
  }
}
