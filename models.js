const Sequelize = require('sequelize');

// Connect to DB
const db = new Sequelize({
  database: 'streetstagram_db',
  dialect:  'postgres',
});


// Define Users model
const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'id'
    },
    username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        notEmpty: true,
        field: 'username',
        set: function(val) {
            this.setDataValue('username', val.toLowerCase())
        }
    },    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true, 
        notEmpty: true,
        field: 'email',
        set: function(val) {
            this.setDataValue('email', val.toLowerCase())
        }
    },
    timestamps: false,
})

//Define Photos model
const Photos = db.define('photos', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'id'
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user id'
    },    
    images: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        field: 'images',
    },    
    description: {
        type: Sequelize.STRING,
        field: 'description',
    },
    street: {
        type: Sequelize.STRING,
        field: 'first street'
    },    
    cross_street: {
        type: Sequelize.STRING,
        field: 'cross street'
    },
    timestamps: false,
})

//Define Comments model
const Comments = db.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true,
        field: 'id'
      },
    photoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true,
        field: 'photo id'
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true,
        field: 'user id'
    },
    comment: {
        type: Sequelize.STRING,
        field: 'comments',
    },
    timestamps: false,
})


// associations

Users.hasMany(Photos, {onDelete: 'cascade'}) //Delete all photos by user
Users.hasMany(Comments) 

Comments.belongsTo(Users)
Comments.belongsTo(Photos)

Photos.belongsTo(Users)
Photos.hasMany(Comments, {onDelete: 'cascade'}) //Delete photo, delete comments




// Export models
module.exports = {
  db,
  Users,
  Photos,
  Comments,
}
