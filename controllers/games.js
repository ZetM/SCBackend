require('dotenv').config();
const Game = require('../models/Game');
const axios = require('axios').default;
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

axios.defaults.baseURL = process.env.JWT_GAMES_BASE_URL
axios.defaults.headers = {
            'x-rapidapi-key': `${process.env.JWT_RAPIDAPI_KEY}`,
            'x-rapidapi-host': `${process.env.JWT_RAPIDAPI_HOST}`}
axios.defaults.params = {
    key: `${process.env.JWT_API_KEY}`,
    page_size:'39'
} 


const instance = axios.create()

const getAllGames = async (req,res) => {
    const {query:{ordering: ordering, search: search}} = req
    
    if(!ordering && !search){
        const response = await instance.get(`/games`)
        const games = response.data.results
        res.status(StatusCodes.OK).json({games, count:games.length})
    }else if(ordering){
        const response = await instance.get(`/games`, {params:{ordering: ordering}})
        const games = response.data.results
        res.status(StatusCodes.OK).json({games, count:games.length})
    }else if(search){
        const response = await instance.get(`/games`, {params:{search: search}})
        const games = response.data.results
        res.status(StatusCodes.OK).json({games, count:games.length})
    }
}

const getUserGames = async (req,res) => {
    const games = await Game.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({games, count:games.length})
}

const addGame = async (req,res) => {
    req.body.createdBy = req.user.userID
    const game = await Game.create(req.body)
    res.status(StatusCodes.CREATED).json({game})
}

const updateGame = async (req,res) => {

    const {id, fav, fin, plat, rat} = req.body
    
    const game = await Game.findOneAndUpdate( {_id:id},
        {favorite:fav,
        finished:fin,
        platinum:plat,
        personal_rating:rat,}, {returnOriginal: false}
    );
    if(!game){
        throw new NotFoundError(`No game with id: ${id}`)
    }

    const games = await Game.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({games, count:games.length})
}

const deleteGame = async (req,res) => {
    const {id} = req.body

    const game = await Game.findByIdAndRemove({
        _id:id,
        createdBy:req.user.userID
    })
    if(!game){
        throw new NotFoundError(`No game with id: ${id}`)
    }
    const games = await Game.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({games, count:games.length})
}

module.exports = {
    getAllGames,
    getUserGames,
    addGame,
    updateGame,
    deleteGame,
    
}