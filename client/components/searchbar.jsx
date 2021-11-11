import React from 'react';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: ''
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const search = this.state.value.trim().replaceAll(' ', '-');

    this.props.search(search);

    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-container">
          <input required className="searchbar" value={this.state.value} onChange={this.handleChange} placeholder="Search for artist, sports team, or venue"></input>
          <button className="search-btn">SEARCH</button>
        </div>
      </form>
    );
  }
}
