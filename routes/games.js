const express = require('express')
const router = express.Router()

const {getAllGames, getUserGames, addGame, updateGame, deleteGame} = require('../controllers/games')

router.route('/').get(getAllGames)
router.route('/:id').get(getUserGames).delete(deleteGame).patch(updateGame).post(addGame)

module.exports = router
