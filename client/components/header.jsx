import React from 'react';
import Searchbar from './searchbar';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header-container">
        <div className="column-third">
          <div className="searchbar-flex">
            <Searchbar search={this.props.search} searchTerm={this.props.searchTerm} getSearchTerm={this.props.getSearchTerm}/>
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
              <a className="pages" href="#trips">Trips</a>
              <a className="pages" href="#contact">Contact</a>
              <a className="pages" href="#log-in">Log In</a>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
