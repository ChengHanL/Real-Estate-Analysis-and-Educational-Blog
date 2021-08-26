const mongoose = require('mongoose')

const Schema = mongoose.Schema

const voteSchema = new Schema({

  post_id: {type:Schema.Types.ObjectId, ref:'post',required:true},
     user_id:
     [{type: Schema.Types.ObjectId, ref:'user'}],
  },
   {
     timestamps: true,
   }
);

const Votes = mongoose.model('votes', voteSchema);

module.exports = Votes;
