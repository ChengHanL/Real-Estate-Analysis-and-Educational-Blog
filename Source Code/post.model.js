const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({

  post_user_name:{
    type:String,
    required: true,
    unique:false,
  },
  title: {
    type:String, required: true
  },
  content: {
    type:String, required: true
  },
  post_category:{
    type:String, required: true
  },
  comment_count: {
    type: Number, default: 0
  },
  vote_count: {
    type: Number, default : 0
  },
  image_header: {
    type: String,
    default: ''
  },
  post_user_id:     {type: Schema.Types.ObjectId, ref:'User', required:true},
  report_id: {type: Schema.Types.ObjectId, ref:'report'},
  results_id: {type: Schema.Types.ObjectId, ref:'Result'},
  comment_id: [{type:Schema.Types.ObjectId, ref:'comment'}],
  vote_id: [{type:Schema.Types.ObjectId, ref:'votes'}],
  },
  {
    timestamps: true,
  });

const Post = mongoose.model('post', postSchema);

module.exports = Post;
