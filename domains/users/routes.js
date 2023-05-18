const express = require('express');

const { User } = require('../../database/models');

const userRouter = express.Router();

// POST: /api/v1/users/login
// endpoint yang bertugas menerima data login form dari halaman dashboard/login
userRouter.post('/api/v1/users/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        where: {
            username: username,
            password: password,
        },
    });

    if (!user) {
        res.redirect('/dashboard/login');

        return;
    }

    res.redirect('/dashboard/home');
});

module.exports = userRouter;
