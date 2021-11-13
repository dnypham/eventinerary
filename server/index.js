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
  const { seatgeekEventId } = req.body;
  const userId = 1;

  const sql = `
    INSERT INTO "events" ("userId", "seatgeekEventId")
         VALUES ($1, $2)
    RETURNING *
  `;
  const params = [userId, seatgeekEventId];

  db.query(sql, params)
    .then(data => {
      const [event] = data.rows;
      res.status(201).json(event);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
