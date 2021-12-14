require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/events', (req, res, next) => {
  const { seatgeekEventId, performer, performerImage, date } = req.body;
  const userId = 1;

  const sql = `
    INSERT INTO "events" ("userId", "seatgeekEventId", "performer", "performerImage", "date")
         VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const params = [userId, seatgeekEventId, performer, performerImage, date];

  db.query(sql, params)
    .then(data => {
      const [event] = data.rows;
      res.status(201).json(event);
    })
    .catch(err => next(err));
});

app.get('/api/events', (req, res) => {
  const sql = `
    SELECT *
    FROM "events"
    WHERE "userId" = 1
    ORDER BY "date" ASC;
  `;

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/itineraries/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId);

  const sql = `
    SELECT *
    FROM "itineraries"
    JOIN "events" USING ("eventId")
    WHERE "eventId" = $1;
  `;

  const params = [eventId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/events/:seatgeekEventId', (req, res) => {
  const seatgeekEventId = parseInt(req.params.seatgeekEventId);

  const sql = `
    SELECT "seatgeekEventId"
    FROM "events"
    WHERE "seatgeekEventId" = $1
  `;

  const params = [seatgeekEventId];

  db.query(sql, params)
    .then(result => {
      const id = result.rows[0].seatgeekEventId;
      res.json(id);
    });
});

app.get('/api/locations/:itineraryId', (req, res) => {
  const itineraryId = parseInt(req.params.itineraryId);

  const sql = `
    SELECT *
    FROM "locations"
    WHERE "itineraryId" = $1;
  `;

  const params = [itineraryId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    });
});

app.post('/api/itineraries', (req, res, next) => {
  const { eventId, location, time, address } = req.body;
  const userId = 1;

  const sql1 = `
    INSERT INTO "itineraries" ("eventId", "userId")
         VALUES ($2, $1)
    RETURNING *;
  `;
  const params1 = [userId, eventId];

  db.query(sql1, params1)
    .then(data => {
      const { itineraryId } = data.rows[0];

      const sql2 = `
        INSERT INTO "locations" ("userId", "itineraryId", "location", "time", "address")
             VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
  `;
      const params2 = [userId, itineraryId, location, time, address];

      db.query(sql2, params2)
        .then(data => {
          const [event] = data.rows;
          res.status(201).json(event);
        })
        .catch(err => next(err));

    })
    .catch(err => next(err));

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
