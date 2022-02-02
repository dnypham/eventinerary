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
      <>
        <header className="header-layout-container flex-c">
          <div className="col-third">
            <div className="flex-s">
              <Searchbar search={this.props.search}/>
            </div>
          </div>
          <div className="col-third">
            <div className="flex-c">
              <h1 className="logo ft-cooper-black" onClick={this.handleClick}>Eventinerary</h1>
            </div>
          </div>
          <div className="col-third">
            <div className="flex-e">
              <nav className="navbar-links">
                <a className="links ft-atf-franklin-gothic" href="#saved-events">Saved Events</a>
                <a className="links ft-atf-franklin-gothic" href="#contact">Contact</a>
                <a className="links ft-atf-franklin-gothic" href="#log-in">Log In</a>
              </nav>
            </div>
          </div>
        </header>
        <header className="header-layout-container-2 flex-c">
          <div className="col-third">
            <div className="flex-s">
              <i className="fas fa-search fa-lg header-icons"></i>
            </div>
          </div>
          <div className="col-third">
            <div className="flex-c">
              <h1 className="logo ft-cooper-black" onClick={this.handleClick}>Eventinerary</h1>
            </div>
          </div>
          <div className="col-third">
            <div className="flex-e">
              <i className="fas fa-bars fa-lg header-icons"></i>
            </div>
          </div>
        </header>
      </>
    );
  }
}
