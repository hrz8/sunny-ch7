const express = require('express');
const { User, UserBio } = require('../../database/models');

const dashboardRouter = express.Router();

dashboardRouter.get('/', function(req, res) {
    res.redirect('/dashboard/login');
})

dashboardRouter.get('/dashboard/login', function(req, res) {
    res.render('dashboard/login');
});

dashboardRouter.get('/dashboard/home', async function(req, res) {
    const users = await User.findAll({
        include: {
            model: UserBio,
            as: 'bio',
        },
        order: [
            ['id', 'ASC'],
        ],
    });

    res.render('dashboard/home', {
        users,
    });
});

dashboardRouter.get('/dashboard/users/create', function(req, res) {
    res.render('dashboard/users/create');
});

dashboardRouter.get('/dashboard/users/:id/update', async function(req, res) {
    const id = req.params.id;

    const currentUser = await User.findOne({
        where: {
            id,
        },
        include: {
            model: UserBio,
            as: 'bio',
        },
    });

    if (!currentUser) {
        res.redirect('/dashboard/home');
    }

    res.render('dashboard/users/update', {
        user: currentUser,
    });
});

dashboardRouter.get('/dashboard/users/:id/delete', async function(req, res) {
    const id = req.params.id;

    const currentUser = await User.findOne({
        where: {
            id,
        },
        include: {
            model: UserBio,
            as: 'bio',
        },
    });

    res.render('dashboard/users/delete', {
        user: currentUser 
    });
});

module.exports = dashboardRouter;
