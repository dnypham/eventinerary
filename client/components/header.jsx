import React from 'react';
import Searchbar from './searchbar';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    location.hash = '';
  }

  render() {
    return (
      <header className="header-container">
        <div className="column-third">
          <div className="searchbar-flex">
            <Searchbar search={this.props.search}/>
          </div>
        </div>
        <div className="column-third">
          <div className="logo-flex">
            <h1 className="logo" onClick={this.handleClick}>Eventinerary</h1>
          </div>
        </div>
        <div className="column-third">
          <div className="nav-flex">
            <nav className="nav-links">
              <a className="pages" href="#saved-events">Saved Events</a>
              <a className="pages" href="#contact">Contact</a>
              <a className="pages" href="#log-in">Log In</a>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
