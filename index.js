const bodyParser = require("body-parser");
var path = require('path');
const express = require("express");
const app = express();
const db = require('./connection');
const postModel = require('./postModel');
var cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "req.headers.origin"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET,POST");

  next();
});*/


/*app.use(cors({
  origin: ['http://localhost:4200'],
  "methods": "GET,PUT,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  credentials: true
}));*/


app.use(cors({ origin: "*"}));


/*app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.post('/user', async (req, res, next) => {
  const { name, mobile } = req.body;
  console.log(name)
  console.log(mobile)
  try {
    const newPost = await postModel.create({name, mobile});
    res.json(newPost);
  }
  catch (error) {
    res.status(500).send(error);
  }
});


app.get('/user', async (req, res, next) => {

  //res.header("Access-Control-Allow-Origin", "req.headers.origin"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET,POST");
  const { name, mobile } = req.body;
  console.log(name)
  console.log(mobile)
  try {
    const posts = await postModel.find();
    res.json(posts);
  }
  catch (error) {
    res.status(500).send(error);
  }
});


app.get('/user/:id', async (req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "req.headers.origin"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET,POST");
  const {id} = req.params;
  console.log(id)
  try {
    const posts = await postModel.findById(id);
    res.json(posts);

  }
  catch (error) {
    res.status(500).send(error);
  }
});


app.put('/user/:id', async (req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "req.headers.origin"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET,POST");
  const {id} = req.params;
  const { name, mobile } = req.body;
  console.log(id)
  try {
    const posts = await postModel.findByIdAndUpdate(id, {name,mobile});
    //res.json("Updated Successfully")
    try {
      const post = await postModel.findById(id);
      res.json(post);
      //res.json("Updated Successfully");
    }
    catch (error) {
      res.status(500).send(error);
    }
  }
  catch (error) {
    res.status(500).send(error);
  }
});


app.delete('/user/:id', async (req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "req.headers.origin"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET,POST");
  const {id} = req.params;
  console.log(req.params);
  console.log(id)
  try {
    const posts = await postModel.findById(id);
    await posts.remove();
    res.json("Deleted Successfully");
  }
  catch (error) {
    res.status(500).send(error);
  }
});

//Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, 'dist/frontend')));

//Any routes will be redirected to the angular app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/frontend/index.html'));
});

app.listen(3000, () => {
  console.log("listening on PORT verify: 3000");
});
