import React from 'react';
import Searchbar from './searchbar';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header-container">
        <div className="column-third">
          <div className="searchbar-flex">
            <Searchbar />
          </div>
        </div>
        <div className="column-third">
          <div className="logo-flex">
            <h1 className="logo">Eventinerary</h1>
          </div>
        </div>
        <div className="column-third">
          <div className="nav-flex">
            <nav className="nav-links">
              <a className="page" href="#trips">Trips</a>
              <a className="page" href="#contact">Contact</a>
              <a className="page" href="#log-in">Log In</a>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
