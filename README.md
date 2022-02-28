# Eventinerary

A full stack JavaScript web application for event-goers who want to find events and create itineraries for those events.

## Live Demo

[Eventinerary](https://eventinerary.herokuapp.com/)

## Technologies Used:
  - React.js
  - Node.js
  - Express
  - PostgreSQL
  - Webpack
  - Babel
  - JavaScript
  - HTML5
  - CSS3
  - Heroku

## Features:
  1. User can view local events.
  2. User can search for specific artists/sports teams.
  3. User can view all upcoming events for a specific artist/sports team.
  4. User can view information for a specific event.
  5. User can save an event.
  6. User can view all of their saved events.
  7. User can create an itinerary for a saved event.
  8. User can add custom locations to an itinerary.

## Stretch Features:
  - User can create an account.
  - User can send itinerary information via email or text.

## Preview:
![eventinerary-demo-1](https://user-images.githubusercontent.com/85265067/153956855-73cba1fe-9b7b-442c-9488-0df82d0bf125.gif)
![eventinerary-mobile](https://user-images.githubusercontent.com/85265067/156073322-30cabb8a-b24b-438c-b8fe-97c0d306866e.gif)

## System Requirements
  - Node.js 10 or higher
  - NPM 6 or higher
  - PostgreSQL 12.6 or higher

## Getting Started
  1. Clone the repository
  
    
    git clone git@github.com:dnypham/eventinerary.git
    cd eventinerary
    
   2. Install all dependencies with NPM

    npm install
    
   3. Get an API key from [Seatgeek](http://platform.seatgeek.com/)
    
   4. Make a copy of the provided .env.example file with the name .env. Switch all config variables to your project's variables.

    cp .env.example .env
    
   5. Create a new database

    pgweb --db=databaseName
    
   6. Import the database schema

    npm run db:import
    
   7. View application by opening http://localhost:3000 in your browser.

    npm run dev
    
