const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resultSchema = new Schema({

    user_id:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    score:{
        type: Number,
        required:true
    },
    maxScore:{
        type: Number,
        required:true
    },
    lesson:{
        type: Number,
        required:true
    },
    questionlist:{
        type: Array
    }

})

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;