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
          email: req.body.email
        };
        const userPut = await Users.update(updateUser, { where: { username: username } })
        res.json(userPut)
      } catch(e) {
        console.error(e)
        res.status(500).json({message: e.message})
      }
    
})








// GET /comments

app.get('/comments/:photo_id', async (req, res) => {
    try {
        const commentedOn = req.params.photo_id
        //NOT 100% SURE NEED (or CAN USE) LINE DIRECTLY ABOVE

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

// GET /profiles

app.get('/profiles/:user_id', async (req, res) => {
    try {
        const userProfile = req.params.user_id
        const profile = await Profiles.findAll({ where: { user_id: userProfile } })
        res.json({
            profile
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
        //STOPPED HERE 6:44
        const username = req.params.username
        const updateUser = {
          username: req.body.name,
          email: req.body.email
        };
        const userPut = await Users.update(updateUser, { where: { username: username } })
        res.json(userPut)
      } catch(e) {
        console.error(e)
        res.status(500).json({message: e.message})
      }
    
})





// GET buildings/1
app.get('/buildings/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const building = await Building.findByPk(id, { raw: true })
        if (!building) throw Error('Building not found!')
        res.json({ building })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

// POST /buildings
app.post('/buildings', async (req, res) => {
    console.log(req.body)
    try {
        const building = await Building.create(req.body)
        res.json(building)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e.message })
    }
})

// PUT /buildings/:id

app.put('/buildings/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateBuilding = {
            name: req.body.name,
            year_built: req.body.year_built,
            image: req.body.image,
            city: req.body.city
        };
        const building = await Building.update(updateBuilding, { where: { id: id } })
        res.json(building)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e.message })
    }
})

// DELETE /buildings/:id

app.delete('/buildings/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const building = await Building.destroy({ where: { id: id } });
        res.json(building);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
    app.get("/*", function (request, response) {
        response.sendFile(path.join(__dirname, "build", "index.html"));
    });
}







app.listen(PORT, () => console.log(`Streetsagram app listening on port ${PORT}!`))