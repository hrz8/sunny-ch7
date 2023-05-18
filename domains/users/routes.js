const express = require('express');

const { User } = require('../../database/models');
const { UserBio } = require('../../database/models');

const userRouter = express.Router();

// POST: /form-dashboard/users/login
// endpoint yang bertugas menerima data login form dari halaman dashboard/login
userRouter.post('/form-dashboard/users/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        where: {
            username: username,
            password: password,
            role: 'ADMIN',
        },
    });

    if (!user) {
        res.redirect('/dashboard/login');

        return;
    }

    res.redirect('/dashboard/home');
});

// POST: /form-dashboard/users/create
// endpoint yang bertugas menerima data new user dari halaman dashboard create user
userRouter.post('/form-dashboard/users/create', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const address = req.body.address;
    const hobby = req.body.hobby;

    const created = await User.create({
        username,
        password,
        role: 'PLAYER',
    });

    await UserBio.create({
        user_id: created.id,
        first_name: firstName,
        last_name: lastName,
        address,
        hobby,
    });

    res.redirect('/dashboard/home');
});

module.exports = userRouter;
