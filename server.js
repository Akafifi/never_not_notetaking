const htmlRoutes = require('./routes/html_routes')
const apiRoutes = require('./routes/api_routes')
// const requestLogger = require('./middleware/request-logger')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


// // allows the browser to request ANYTHING out of the public folder
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())



app.use('/', apiRoutes)
app.use('/', htmlRoutes);

app.get ('/', (req, res) => {
  res.send('Hello Express!')
})


app.listen(PORT, () => {
  console.log(`Express listening on http://localhost:${PORT}`)
})