require('dotenv').config();
const Comment = require('../models/Comment')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');


const getComments = async (req,res) =>{
    const comments = await Comment.find({}).sort('createdBy')
    res.status(StatusCodes.OK).json({comments, count:comments.length})
}

const createComment = async (req,res) =>{
    req.body.createdBy = req.user.userID
    const newComment = await Comment.create(req.body)
    if(newComment){
        const comments = await Comment.find({}).sort('createdBy')
        res.status(StatusCodes.CREATED).json({comments, count:comments.length})
    }else{
        throw new BadRequestError(`No user id provided.`)
    }
    
}

const updateComment = async (req,res) => {
    const {id, msg} = req.body
    
    const comment = await Comment.findOneAndUpdate( {_id:id},
        {message:msg}, {returnOriginal: false}
    );
    if(!comment){
        throw new NotFoundError(`No game with id: ${id}`)
    }

    const comments = await Comment.find({}).sort('createdBy')
        res.status(StatusCodes.OK).json({comments, count:comments.length})
}

const deleteComment = async (req,res) => {
    const {id} = req.body
    const comment = await Comment.findByIdAndRemove({
        _id:id,
        createdBy:req.user.userID
    })
    if(!comment){
        throw new NotFoundError(`No comment with id: ${id}`)
    }
    const comments = await Comment.find({}).sort('createdBy')
    res.status(StatusCodes.OK).json({comments, count:comments.length})
}

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
}