const bodyParser = require("body-parser");
var path = require('path');
const express = require("express");
const app = express();
const db = require('./connection');
const postModel = require('./postModel');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//{
//  "name":"manoj",
//  "mobile":"8124590366"
//}



var cors = require('cors');


app.use(cors({origin: '*'}));

app.post('/user', async (req, res) => {
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


app.get('/user', async (req, res) => {
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


app.get('/user/:id', async (req, res) => {
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


app.put('/user/:id', async (req, res) => {
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


app.delete('/user/:id', async (req, res) => {
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
  console.log("listening on PORT: 3000");
});
