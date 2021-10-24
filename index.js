const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const schedule = require("./routes/schedule")
const competitionInstructions = require("./routes/competition-instructions")
const results = require("./routes/results")

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'pug')

app.use("/ajakava", schedule)
app.use("/voistlusjuhend", competitionInstructions)
app.use("/tulemused", results)

app.get('/', (req, res) => {
  res.redirect('/ajakava')
})


app.listen(port, () => {
  console.log(`App started listening @ http://localhost:${port}`)
})