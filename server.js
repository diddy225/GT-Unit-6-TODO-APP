const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

// mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true });
mongoose.connect('mongodb://mcarpenter:test12@ds119523.mlab.com:19523/heroku_w09m497r/todolists', { useNewUrlParser: true })

require('./routes/api-routes.js')(app);


app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
  })
  