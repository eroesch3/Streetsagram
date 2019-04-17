const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
//AWS stuff:
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
require('dotenv').config();


//AWS password/config:
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();

//we need to app.use logger, bodyparser, and cors for AWS
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(cors());
app.use("/", express.static("./build/"));
//USE ABOVE LINE WHEN WE DEPLOY !!!



//AWS upload file
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  }
  return s3.upload(params).promise()
};

//AWS post route
app.post('/upload', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error)
    try {
      const path = files.file[0].path
      const buffer = fs.readFileSync(path)
      const type = fileType(buffer)
      const timestamp = Date.now().toString()
      const fileName = `bucketFolder/${timestamp}-lg`
      const data = await uploadFile(buffer, fileName, type)
      return res.status(200).send(data)
    } catch (error) {
      return res.status(400).send(error)
    }
  })
});


// import models
const { Users, Photos, Comments, Profiles } = require('./models');
//LINE ABOVE NEED TO BE COMMENTED TO RUN SERVER WITHOUT DATABASE BEING CREATED
const PORT = process.env.PORT || 3001


//GET THE MAIN/ FEED PAGE
app.get('/', async (req, res) => {
  try {
    const photos = await Photos.findAll({ raw: true })
    res.json({
      photos
    })
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
})

//USERS SECTION (get, put, create, delete)
// GET /users
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const userGet = await Users.findByPk(userId, { raw: true })
    res.json({
      userGet
    })
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
})

// PUT /users
app.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const updateUser = {
      username: req.body.name,
      email: req.body.email,
    };
    const userPut = await Users.findByPk(userId, { raw: true })
    res.json(userPut)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// CREATE /users
app.post('/user', async (req, res) => {
  console.log(req.body)
  try {
    const createUser = await Users.create(req.body)
    res.json(createUser)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// DELETE /users
app.delete('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const deleteUser = await Users.destroy({ where: { id: userId } });
    res.json(deleteUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});


//COMMENTS SECTION (get, create, delete)
// GET /comments
app.get('/comments/:photo_id', async (req, res) => {
  try {
    const commentedOn = req.params.photo_id
    const comments = await Comments.findAll({ where: { photo_id: commentedOn } })
    res.json({
      comments
    })
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
})

// CREATE /comments
app.post('/comments/:photo_id', async (req, res) => {
  try {
    const addComment = await Comments.create(req.body)
    res.json(addComment)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// DELETE /comments
app.delete('/comments/:photo_id', async (req, res) => {
  try {
    const uncommentPhoto = req.params.photo_id;
    const deleteComment = await Comments.destroy({ where: { photo_id: uncommentPhoto } });
    res.json(deleteComment);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});


//PHOTOS SECTION (put, create, delete) Get photos path is our main page; see above!
//GET /photo
app.get('/photo/:id', async (req, res) => {
  try {
    const singlePhoto = req.params.id
    console.log(singlePhoto)
    const photo = await Photos.findByPk(singlePhoto, { where: { id: singlePhoto } })
    res.json({
      photo
    })
  } catch (error) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// PUT /photo
app.put('/photo/:id', async (req, res) => {
  try {
    const photoId = req.params.id
    const updatePhoto = {
      image: req.body.image,
      description: req.body.description,
      street: req.body.street,
      cross_street: req.body.cross_street,
      filter: ''
    };
    const photoPut = await Photos.update(updatePhoto, { where: { id: photoId } })
    res.json(photoPut)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// CREATE /photo
app.post('/post', async (req, res) => {
  try {
    const createPhoto = await Photos.create(req.body)
    res.json(createPhoto)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// DELETE /photo
app.delete('/photo/:id', async (req, res) => {
  try {
    const selectedPhoto = req.params.id;
    const deletePhoto = await Photos.destroy({ where: { id: selectedPhoto } });
    res.json(deletePhoto);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});


//PROFILES SECTION (get, put, create, delete)
// GET /profile
app.get('/profiles/:user_id', async (req, res) => {
  try {
    const profileId = req.params.user_id
    const requestedProfile = await Profiles.findAll({ where: { user_id: profileId } })
    res.json({
      requestedProfile
    })
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
})

// PUT /profiles
app.put('/profiles/:user_id', async (req, res) => {
  try {
    const profileId = req.params.user_id
    const updateProfile = {
      profile_desc: req.body.profile_desc,
      contact: req.body.contact,
      next_perform: req.body.next_perform
    };
    const profilePut = await Profiles.update(updateProfile, { where: { user_id: profileId } })
    res.json(profilePut)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// CREATE /profile
app.post('/profiles/:user_id', async (req, res) => {
  try {
    const createProfile = await Profiles.create(req.body)
    res.json(createProfile)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
})

// DELETE /profile
app.delete('/profiles/:user_id', async (req, res) => {
  try {
    const profileId = req.params.user_id;
    const deleteProfile = await Profiles.destroy({ where: { user_id: profileId } });
    res.json(deleteProfile);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

app.get("/*", function (request, response) {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Streetstagram app listening on port ${PORT}!`))