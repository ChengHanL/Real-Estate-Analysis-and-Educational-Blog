const mongoose = require('mongoose')

const Schema = mongoose.Schema

const banlistSchema = new Schema({
    admin: {
      type:String, 
      required: true,
      trim: true,
      minlength : 3
    },
    user:{
      type:String,
      required: true,
      trim: true,
      minlength : 3
    },
    reason:
    {
        type:String, 
        required: true,
    },
    date:
    {
        type:Date
    }},
);

const banlist = mongoose.model('banlist', banlistSchema);

module.exports = banlist;
