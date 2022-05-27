const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    message: {
        type:String,
        required:[true, 'Please provide the content of the comment.']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Comment', CommentSchema)