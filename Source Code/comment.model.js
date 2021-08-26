const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({

  post_id: {type:Schema.Types.ObjectId, ref:'post',required:true},
  username:{
    type:String, required: true
  },
    description: {
      type:String, required: true
    },
     user_id:
     {type: Schema.Types.ObjectId, ref:'User', required:true},
  },
   {
     timestamps: true,
   }
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
