const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lessonSchema = new Schema({

    lessonNum:{
        type: Number,
        required: true
    },
    lessonTitle:{
        type: String,
        required: true
    },
    videoURL:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
})

const Lesson = mongoose.model('lesson', lessonSchema);

module.exports = Lesson;