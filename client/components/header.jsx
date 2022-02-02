import React from 'react';
import Searchbar from './searchbar';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbar: false,
      menu: false
    };

    this.displaySearchbar = this.displaySearchbar.bind(this);
    this.displayMenu = this.displayMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    location.hash = '';
  }

  displaySearchbar() {
    if (!this.state.searchbar) {
      this.setState({
        searchbar: true,
        menu: false
      });
    } else {
      this.setState({
        searchbar: false
      });
    }
  }

  displayMenu() {
    if (!this.state.menu) {
      this.setState({
        menu: true,
        searchbar: false
      });
    } else {
      this.setState({
        menu: false
      });
    }
  }

  renderSearchbar() {
    if (this.state.searchbar) {
      return (
        <div className='pop-up-container flex-c'>
          <Searchbar search={this.props.search} />
        </div>
      );
    }
  }

  renderMenu() {
    if (this.state.menu) {
      return (
        <div className='pop-up-container flex-c'>
          <nav className="navbar-links">
            <a className="links ft-atf-franklin-gothic" href="#saved-events">Saved Events</a>
            <a className="links ft-atf-franklin-gothic" href="#contact">Contact</a>
            <a className="links ft-atf-franklin-gothic" href="#log-in">Log In</a>
          </nav>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <header className="header-layout-container flex-c">
          <div className="col-third">
            <div className="flex-s">
              <Searchbar search={this.props.search} />
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
              <i className="fas fa-search fa-lg header-icons" onClick={this.displaySearchbar}></i>
            </div>
          </div>
          <div className="col-third">
            <div className="flex-c">
              <h1 className="logo ft-cooper-black" onClick={this.handleClick}>Eventinerary</h1>
            </div>
          </div>
          <div className="col-third">
            <div className="flex-e">
              <i className="fas fa-bars fa-lg header-icons" onClick={this.displayMenu}></i>
            </div>
          </div>
        </header>
        {this.renderSearchbar()}
        {this.renderMenu()}
      </>
    );
  }
}
