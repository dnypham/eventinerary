import React from 'react';

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      index: 0
    });

    this.imageArray = [
      {
        url: 'images/concert.jpg',
        alt: 'Concert'
      },
      {
        url: 'images/nba-stadium.jpg',
        alt: 'NBA Game'
      },
      {
        url: 'images/mlb-stadium.jpg',
        alt: 'MLB Game'
      }
    ];

    this.handleClick = this.handleClick.bind(this);
  }

  handleCarousel() {
    clearInterval(this.carousel);

    this.carousel = setInterval(() => {
      if (this.state.index === 2) {
        this.setState({ index: 0 });
      } else {
        this.setState({ index: this.state.index + 1 });
      }
    }, 5000);
  }

  handleImage() {
    this.handleCarousel();
    return this.imageArray[this.state.index].url;
  }

  handleAlt() {
    return this.imageArray[this.state.index].alt;
  }

  handleClick(event) {
    const number = parseInt(event.target.getAttribute('data-id'));
    this.setState({ index: number });
  }

  getStatus1() {
    const index = this.state.index;

    if (index === 0) {
      return 'dot-active';
    } else {
      return '';
    }
  }

  getStatus2() {
    const index = this.state.index;

    if (index === 1) {
      return 'dot-active';
    } else {
      return '';
    }
  }

  getStatus3() {
    const index = this.state.index;

    if (index === 2) {
      return 'dot-active';
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className="banner-container">
        <div className="column-full">
          <div className="banner-flex">
            <div className="banner">
              <img src={this.handleImage()} alt={this.handleAlt()}></img>
              <div className="dot-container">
                <i data-id="0" className={`fas fa-circle fa-1x banner-icons ${this.getStatus1()}`} onClick={this.handleClick}></i>
                <i data-id="1" className={`fas fa-circle fa-1x banner-icons ${this.getStatus2()}`} onClick={this.handleClick}></i>
                <i data-id="2" className={`fas fa-circle fa-1x banner-icons ${this.getStatus3()}`} onClick={this.handleClick}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
