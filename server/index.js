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
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
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
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/events/:seatgeekEventId', (req, res) => {
  const seatgeekEventId = parseInt(req.params.seatgeekEventId);

  const sql = `
    SELECT "seatgeekEventId"
    FROM "events"
    WHERE "seatgeekEventId" = $1;
  `;

  const params = [seatgeekEventId];

  db.query(sql, params)
    .then(result => {
      let idExists = false;

      if (result.rows[0]) {
        idExists = true;
      }

      res.json(idExists);
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/locations/:itineraryId', (req, res) => {
  const itineraryId = parseInt(req.params.itineraryId);

  const sql = `
    SELECT *
    FROM "locations"
    WHERE "itineraryId" = $1
    ORDER BY "time" ASC;
  `;

  const params = [itineraryId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
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
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          res.status(500).json({
            error: 'an unexpected error occurred'
          });
        });

    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });

});

app.post('/api/locations', (req, res) => {
  for (const property in req.body) {
    if (req.body[property] === '') {
      req.body[property] = null;
    }
  }

  const { itineraryId, location, time, address, phone, notes } = req.body;
  const userId = 1;

  const sql = `
    INSERT INTO "locations" ("itineraryId", "location", "time", "address", "phoneNumber", "notes", "userId")
         VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const params = [itineraryId, location, time, address, phone, notes, userId];

  db.query(sql, params)
    .then(data => {
      res.status(201).json(data.rows);
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.delete('/api/events', (req, res) => {
  const { eventId, itineraryId } = req.body;

  if (itineraryId != null) {
    const sql3 = `
    DELETE FROM "locations"
          WHERE "itineraryId" = $1
    RETURNING *;
  `;
    const params3 = [itineraryId];

    db.query(sql3, params3)
      .then(data => {
        res.status(201);

        const sql2 = `
          DELETE FROM "itineraries"
                WHERE "itineraryId" = $1
          RETURNING *;
        `;
        const params2 = [itineraryId];

        db.query(sql2, params2)
          .then(data => {
            res.status(201);

            const sql1 = `
              DELETE FROM "events"
                    WHERE "eventId" = $1
              RETURNING *;
            `;
            const params1 = [eventId];

            db.query(sql1, params1)
              .then(data => {
                res.status(201).json(data.rows);
              })
              .catch(err => {
                // eslint-disable-next-line
                console.log(err);
                res.status(500).json({
                  error: 'an unexpected error occurred'
                });
              });
          })
          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
            res.status(500).json({
              error: 'an unexpected error occurred'
            });
          });
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err);
        res.status(500).json({
          error: 'an unexpected error occurred'
        });
      });
  } else {
    const sql1 = `
    DELETE FROM "events"
          WHERE "eventId" = $1
    RETURNING *;
  `;

    const params1 = [eventId];

    db.query(sql1, params1)
      .then(data => {
        res.status(201).json(data.rows);
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err);
        res.status(500).json({
          error: 'an unexpected error occurred'
        });
      });
  }
});

app.delete('/api/locations/delete', (req, res) => {
  const { locationId } = req.body;

  const sql = `
    DELETE FROM "locations"
          WHERE "locationId" = $1
    RETURNING *;
  `;
  const params = [locationId];

  db.query(sql, params)
    .then(data => {
      res.status(201).json(data.rows);
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.patch('/api/locations', (req, res) => {
  for (const property in req.body) {
    if (req.body[property] === '') {
      req.body[property] = null;
    }
  }

  const { locationId, location, time, address, phone, notes } = req.body;
  const userId = 1;

  const sql = `
    UPDATE "locations"
       SET "location" = $2,
           "time" = $3,
           "address" = $4,
           "phoneNumber" = $5,
           "notes" = $6
     WHERE "locationId" = $1
       AND "userId" = $7
    RETURNING *;
  `;
  const params = [locationId, location, time, address, phone, notes, userId];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      // eslint-disable-next-line
      console.log(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
