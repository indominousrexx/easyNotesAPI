const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("successfully connected to the database");
}).catch(err => {
  console.log('could not connect to the database. Exiting now...', err);
  process.exit();
})

app.get('/', (req, res) => {
  res.json({"message": "welcome to noteEASY application. Take notes quickly. Organise and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});