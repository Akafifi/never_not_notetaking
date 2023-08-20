const path = require('path')
const app = express()
const PORT = 3000
const notes = require(/data/pets.json)

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile(path.join(_dirname, 'public', 'index.html'))
})

app.get('/about', (req, res), => {
    res.sendFile(path.join(_dirname, 'public', 'contact.html'))
})
app.get('/api/all-notes', (req, res) => {
    res.json(notes)
})