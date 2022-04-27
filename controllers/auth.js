const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const register = async (req,res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{userID:user._id, name:user.name}, token})
}

const login = async (req,res) =>{
    const {email, password} = req.body
    
    if(!email||!password){
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const correctPassword = await user.checkPassword(password)
    if(!correctPassword){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: { userID:user._id, name: user.name}, token})
}

module.exports = {
    register,
    login,
}