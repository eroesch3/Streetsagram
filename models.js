const Sequelize = require('sequelize');

// Connect to DB
const db = new Sequelize({
  database: 'streetstagram_db',
  dialect:  'postgres',
//   operatorsAliases: false,
  define: { 
    underscored: true
  }
});


// Define Users model
const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        // allowNull: false,
        field: 'id'
    },
    username: {
        type: Sequelize.STRING(20),
        // allowNull: false,
        // nots: true,
        field: 'username',
        set: function(val) {
            this.setDataValue('username', val.toLowerCase())
        },
    },    
    email: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: true,
        isEmail: true, 
        // notEmpty: true,
        field: 'email',
        set: function(val) {
            this.setDataValue('email', val.toLowerCase())
        },
    },
    password_digest: Sequelize.STRING
})

//Define Photos model
const Photos = db.define('photos', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    //   allowNull: false,
      field: 'id'
    },
    user_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        field: 'user id'
    },    
    image: {
        type: Sequelize.STRING,
        // allowNull: false,
        // notEmpty: true,
        field: 'images'
    },    
    description: {
        type: Sequelize.STRING,
        field: 'description'
    },
    street: {
        type: Sequelize.STRING,
        field: 'first street'
    },    
    cross_street: {
        type: Sequelize.STRING,
        field: 'cross street'
    },
    filter: {
        type: Sequelize.STRING,
        field: 'filter'
    }
})

//Define Comments model
const Comments = db.define('comments', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        // allowNull: false,
        // notEmpty: true,
        field: 'id'
      },
    photo_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // notEmpty: true,
        field: 'photo id'
    },
    user_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // notEmpty: true,
        field: 'user id'
    },
    comment: {
        type: Sequelize.STRING,
        field: 'comments'
    }
})

//Define Profiles model
const Profiles = db.define('profiles', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        // allowNull: false,
        // notEmpty: true,
        field: 'id'
      },
    user_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // notEmpty: true,
        field: 'user id'
    },
    profile_desc: {
        type: Sequelize.STRING,
        field: 'profile description'
    },
    contact: {
        type: Sequelize.STRING,
        field: 'contact info',
        next_perform: Sequelize.STRING,
    }
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
  Comments
}
