import React from 'react';

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };

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

  componentWillUnmount() {
    clearInterval(this.carousel);
  }

  handleCarousel() {
    clearInterval(this.carousel);

    this.carousel = setInterval(() => {
      if (this.state.index === this.imageArray.length - 1) {
        this.setState({ index: 0 });
      } else {
        this.setState({ index: this.state.index + 1 });
      }
    }, 6000);
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

  createDots() {
    return this.imageArray.map((img, index) => (
      <i onClick={this.handleClick} key={index} data-id={index} className={`fas fa-circle fa-1x banner-icons ${index === this.state.index ? 'dot-active' : ''}`} />
    ));
  }

  render() {
    return (
      <div className="banner-container">
        <div className="column-full">
          <div className="banner-flex">
            <div className="banner">
              <img src={this.handleImage()} alt={this.handleAlt()}></img>
              <div className="dot-container">
                {this.createDots()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
