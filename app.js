const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const createError = require('http-errors');
const projectsRouter = require('./routes/books');
const authRouter = require('./routes/auth');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to redirect to login if not authenticated
app.use((req, res, next) => {
    const allowedRoutes = ['/auth/login', '/auth/register']; // Add more routes if necessary
    if (!req.session.user && !allowedRoutes.includes(req.path)) {
        return res.redirect('/auth/login');
    }
    next();
});

app.use('/books', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
}, projectsRouter);

app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
