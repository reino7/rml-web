/** Imports */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const moment = require('moment-timezone');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Response status for development use */
app.use(morgan('dev'));

/** Static Files */
app.use(express.static(path.join(__dirname, 'public')));

/** Route Paths */
const schedule = require('./routes/schedule');
const calendar = require('./routes/calendar');
const competitionInstructions = require('./routes/competition-instructions');
const results = require('./routes/results');
const trainings = require('./routes/trainings');
const gallery = require('./routes/gallery');
const contact = require('./routes/contact');

/**  Timezone information with Moment to Morgan */
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
});

/**  Standard Apache combined log output to logs folder */
morgan.format(
  'commonUTCplus2',

  ':remote-addr - :remote-user [:date[Europe/Tallinn]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

app.use(
  morgan('commonUTCplus2', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {
      flags: 'a',
    }),
  })
);

/** Set Views */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/** Define routes */
app.get('/', (req, res) => {
  res.redirect('/ajakava');
});
app.use('/ajakava', schedule);
app.use('/kalender', calendar); // still testing
app.use('/juhendid/seeriavoistlus-2023-2024', competitionInstructions);
app.use('/tulemused', results);
app.use('/treeningud', trainings);
app.use('/galerii', gallery); // still testing
app.use('/kontakt', contact); // still testing

/** 404 */
app.use((req, res, next) => {
  res.status(404).render('schedule');
});

/** Server listening @ PORT */
app.listen(PORT, () => {
  console.log(`App "rml-web" started listening @ http://localhost:${PORT}`);
});
