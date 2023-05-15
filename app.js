require('dotenv').config();

const {
    Game,
    User,
    UserBio,
    UserGameHistory,
} = require('./database/models');

(async function() {
    const games = await Game.findAll();
    const users = await User.findAll();
    const bios = await UserBio.findAll();
    const histories = await UserGameHistory.findAll();

    console.log(games, users, bios, histories);
})();
