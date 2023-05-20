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

// POST: /form-dashboard/users/update
// endpoint yang bertugas menerima data updated user dari halaman dashboard update user
userRouter.post('/form-dashboard/users/update', async function(req, res) {
    const id = req.body.user_id;
    const username = req.body.username;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const address = req.body.address;
    const hobby = req.body.hobby;

    // await User.update({
    //     username,
    // }, {
    //     where: {
    //         id,
    //     },
    // });

    await UserBio.update({
        first_name: firstName,
        last_name: lastName,
        address,
        hobby,
    }, {
        where: {
            user_id: id,
        },
    });

    res.redirect('/dashboard/home');
});

// POST: /form-dashboard/users/delete
userRouter.post('/form-dashboard/users/delete', async function(req, res) {
    const id = req.body.user_id;

    try {
        await UserBio.destroy({
            where: {
                user_id: id,
            },
        });
        await User.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }

    res.redirect('/dashboard/home');
});

module.exports = userRouter;
