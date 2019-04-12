const Sequelize = require('sequelize');

// Connect to DB
const db = new Sequelize({
  database: 'streetstagram_db',
  dialect:  'postgres',
});


// Define Users model
const Users = db.define('users', {
    id: Sequelize.INTEGER,
    username: Sequelize.STRING(20),
    email: Sequelize.STRING,
    password_digest: Sequelize.STRING,
    timestamps: false,
})

//Define Photos model
const Photos = db.define('photos', {
    id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER, 
    image: Sequelize.STRING,
    description: Sequelize.STRING,
    street: Sequelize.STRING,
    cross_street: Sequelize.STRING, 
    filter: Sequelize.STRING,
    timestamps: false,
})

//Define Comments model
const Comments = db.define('comments', {
    id: Sequelize.INTEGER,
    photo_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    comment: Sequelize.STRING,
    timestamps: false,
})

//Define Profiles model
const Profiles = db.define('profiles', {
    id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    profile_desc: Sequelize.STRING,
    contact: Sequelize.STRING,
    next_perform: Sequelize.STRING,
    timestamps: false,
})


// associations

Users.hasMany(Photos, {onDelete: 'cascade'}) //Delete all photos by user
Users.hasMany(Comments) 

Comments.belongsTo(Users)
Comments.belongsTo(Photos)

Photos.belongsTo(Users)
Photos.hasMany(Comments, {onDelete: 'cascade'}) //Delete photo, delete comments

Profiles.belongsTo(Users)



// Export models
module.exports = {
  db,
  Users,
  Photos,
  Comments,
}
