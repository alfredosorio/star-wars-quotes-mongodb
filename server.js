const express = require('express');
const bodyParser= require('body-parser')
const app = express(); // the main app
const MongoClient = require('mongodb').MongoClient

var db

// Connect and start the MongoClient (MongoLab)
// Move app.listen into the connect method and start our servers only when the database in connected.
MongoClient.connect('mongodb://aosorio:863Rovu$@ds131312.mlab.com:31312/star-wars-quotes', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('Successfully authenticated. Listening on port 3000')
  })
})

// Implement ejs (Embedded Javascript) to assist with dynamic content handling into HTML.
app.set('view engine', 'ejs')

// Ensure all middleware is placed BEFORE the CRUD handlers!
// The 'urlencoded' method tells the bodyParser to extract the data from the <form> element and add them to the
//  body property of the request object.
app.use(bodyParser.urlencoded({extended: true}))

// CRUD - Read
// app.get(path, callback)
// Return index.html and append '/index.html' to the web address.
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// Showing quotes to users
// The 'cursor' (Mongo Object) returns your quote and other properties and methods that allow you to 
//  work with the data easily.
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

// CRUD - Create
// Create the quotes collection -- db.collection('quotes')
//  AND save the entry with .save
//    THEN redirect the user back to the index.html page ('/')
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Saved to database')
    res.redirect('/')
  })
})