/** Imports */
require('dotenv').config();
const express = require('express')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const moment = require('moment-timezone');


const app = express()
const PORT = process.env.PORT || 3000


/** Route Paths */
const schedule = require("./routes/schedule")
const competitionInstructions = require("./routes/competition-instructions")
const results = require("./routes/results")
const trainings = require("./routes/trainings")


/** Static Files */
app.use(express.static(path.join(__dirname, 'public')))


/**  Timezone information with Moment to Morgan */
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
})

/**  Standard Apache combined log output to logs folder */
morgan.format('commonUTCplus2', ':remote-addr - :remote-user [:date[Europe/Tallinn]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
app.use(morgan('commonUTCplus2', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
}))

/** Response status for development use */
app.use(morgan('dev'))


app.use(express.urlencoded({ extended: false }))


/** Set Views */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug')
// app.set('view engine', 'ejs');


/** Define routes */
app.use("/ajakava", schedule)
app.use("/voistlusjuhend", competitionInstructions)
app.use("/tulemused", results)
app.use("/treeningud", trainings)

app.get('/', (req, res) => {
  res.redirect('/ajakava')
})


/** Server listening @ PORT */
app.listen(PORT, () => {
  console.log(`App "rml-web" started listening @ http://localhost:${PORT}`)
})