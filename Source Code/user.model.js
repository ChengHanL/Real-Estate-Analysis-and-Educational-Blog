const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema({
  isBanned: {
    type:Boolean,
    default: false
  },
  isAdmin: {
    type:Boolean,
    default: false
  },
  no_of_comments: {
    type: Number,
    default: 0
  },
  no_of_posts: {
    type: Number,
    default: 0
  },
  username: {
    type:String,
    required: true,
    unique: true,
    trim: true,
    minlength : 3,
    default: ''
  },
  password: {
    type:String,
    required: true,
    minlength : 6,
    default: ''
  },
  firstname: {
    type:String,
    default: ''
  },
  lastname: {
    type:String,
    default: ''
  },
  email: {
    type:String,
    default: ''
  },
  pictureUrl:{
    type: String,
    default: ''
  },
  isDeleted: {
    type:Boolean,
    default: false
  }},
  {
    timestamps: true,
  });

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
