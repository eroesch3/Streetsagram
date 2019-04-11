const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
//BELOW THIS LINE ARE BOILERS NOT USED IN Buildings app server
const cors = require('cors');
const logger = require('morgan');

// const usersRouter = require('./routes/users');
// const tweetsRouter = require('./routes/tweets');

// app.use('/users', usersRouter);
// app.use('/tweets', tweetsRouter);

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(cors());
// app.use("/", express.static("./streetsagram/"));
//USE ABOVE LINE WHEN WE DEPLOYE !!!



// import models
// const { Users, Photos, Comments, Profiles } = require('./models');
//2 LINES ABOVE NEED TO BE COMMENTED TO RUN SERVER WITHOUT DATABASE BEING CREATED
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
app.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username
        //NOT 100% SURE NEED (or CAN USE) LINE DIRECTLY ABOVE

        const userGet = await Users.findAll({ where: { username: username } })
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
app.put('/user/:username', async (req, res) => {
    try {
        const username = req.params.username
        const updateUser = {
          username: req.body.name,
          email: req.body.email,
        };
        const userPut = await Users.update(updateUser, { where: { username: username } })
        res.json(userPut)
      } catch(e) {
        console.error(e)
        res.status(500).json({message: e.message})
      }
})

// CREATE /users
app.post('/user/:username', async (req, res) => {
    console.log(req.body)
    try {
      const createUser = await Users.create(req.body)
      res.json(createUser)
    } catch(e) {
      console.error(e)
      res.status(500).json({message: e.message})
    }
  })

// DELETE /users
  app.delete('/user/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const deleteUser = await Users.destroy({ where: {username: username} });
      res.json(deleteUser);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message});
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
    } catch(e) {
      console.error(e)
      res.status(500).json({message: e.message})
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
      res.status(500).json({ message: e.message});
    }
  });


//PHOTOS SECTION (put, create, delete) Get photos path is our main page; see above!
// PUT /photo
app.put('/photos/:username', async (req, res) => {
    try {
        const username = req.params.username
        const updatePhoto = {
          image: req.body.image,
          description: req.body.description,
          street: req.body.street,
          crossStreet: req.body.crossStreet,
          filter: req.body.filter
        };
        const photoPut = await Photos.update(updatePhoto, { where: { username: username } })
        res.json(photoPut)
      } catch(e) {
        console.error(e)
        res.status(500).json({message: e.message})
      }
})

// CREATE /photo
app.post('/photos/:username', async (req, res) => {
    try {
      const createPhoto = await Photos.create(req.body)
      res.json(createPhoto)
    } catch(e) {
      console.error(e)
      res.status(500).json({message: e.message})
    }
  })

// DELETE /photo
  app.delete('/photos/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const deletePhoto = await Photos.destroy({ where: {username: username} });
      res.json(deletePhoto);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message});
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
          profileDesc: req.body.name,
          contact: req.body.contact,
          nextPeform: req.body.nextPeform
        };
        const profilePut = await Profiles.update(updateProfile, { where: { username: profileId } })
        res.json(profilePut)
      } catch(e) {
        console.error(e)
        res.status(500).json({message: e.message})
      }
})


// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
// if (process.env.NODE_ENV == "production") {

// Note: the buildings app used line above to check if in production.... I thought better to use the redirect to main page in dev and production
app.get("/*", function (request, response) {
        response.sendFile(path.join(__dirname, "build", "index.html"));
    });



app.listen(PORT, () => console.log(`Streetsagram app listening on port ${PORT}!`))