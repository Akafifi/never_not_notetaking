const router = require('express').Router();
const fs = require('fs')

const { v4: uuidv4 } = require('uuid');

const util = require('util');

console.log('here')

const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
// show all notes in json data
router.get("/api/notes", (req, res) => {
  
      readFromFile('db/notes.json').then((data) => res.json(JSON.parse(data)));

  });

  router.post("/api/notes", (req, res) => {
    const id = uuidv4();
    console.log('req.body', req.body)
     // Destructuring assignment for the items in req.body
  const { title, text } = req.body;


 
    // Variable for the object we will save
    const newNote = {
      text,
      title,
      id
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  });  

  // Deleting note
  router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((server) => server.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/notes.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted`);
      });
  });

  module.exports = router;