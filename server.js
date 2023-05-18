require('dotenv').config();

const express = require('express');

const gameRouter = require('./domains/games/routes');

const PORT = process.env.PORT;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use('/static', express.static('public/static'));

app.use(gameRouter);

app.get('/', function(req, res) {
    res.redirect('/dashboard/login');
})

app.get('/dashboard/login', function(req, res) {
    res.render('dashboard/login');
});

app.get('/dashboard/home', function(req, res) {
    res.render('dashboard/home');
});

app.get('/dashboard/users/create', function(req, res) {
    res.render('dashboard/users/create');
});

app.get('/dashboard/users/:id/update', function(req, res) {
    const id = req.params.id;

    res.render('dashboard/users/update');
});

app.get('/dashboard/users/:id/delete', function(req, res) {
    const id = req.params.id;

    res.render('dashboard/users/delete');
});

app.listen(PORT, function() {
    console.log(`server listening on port: ${PORT}`);
});
