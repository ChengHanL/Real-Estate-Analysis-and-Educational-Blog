const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportedlistSchema = new Schema({
    reporter: {
      type:String, 
      required: true,
      trim: true,
      minlength : 3
    },
    reporteduser:{
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
   {
     timestamps: true,
   }
);

const reportedlist = mongoose.model('reportedlist', reportedlistSchema);

module.exports = reportedlist;
