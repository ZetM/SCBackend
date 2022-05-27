const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    id:{
        type:Number,
        require:[true, 'Please provide item ID'],
    },
    name:{
        type:String,
        require:[true, 'Please provide a name'],
        maxlength:50,
    },
    released:{
        type:String,
        required:[true, 'Please release date'],
        maxlength:12,
    },
    background_image:{
        type:String,
    },
    genres:{
        type:[Array],
        require:[true, 'Please provide list of genres']
    },
    rating:{
        type:Number,
        require:true
    },
    personal_rating:{
        type:Number,
        default: 3,
    },
    favorite:{
        type:Boolean,
        default:false,
    },
    finished:{
        type:Boolean,
        default:false,
    },
    metacritic:Number,
    parent_platforms:{
        type:[Array],
        require:true
    },
    platinum:{
        type:Boolean,
        default:false
    },
    short_screenshots:{
        type:[Array],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Game', GameSchema)