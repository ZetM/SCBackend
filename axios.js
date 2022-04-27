
require('dotenv').config();
const axios = require('axios').defaults;

axios.defaults.baseURL = process.env.GAMES_BASE_URL
axios.defaults.headers = {
  'x-rapidapi-key': '10ffbb2a24msh18509fdbb4dac5bp1d68bbjsn2efb0aa7484f',
  'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
}
axios.defaults.params = {
            key: 'f319e894efbc45a8aa1f1f3514df94f0',
            page_size: '39'
  }

module.exports = axios