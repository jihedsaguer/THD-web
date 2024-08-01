const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const createError = require('http-errors');
const cors = require('cors');
const projectsRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const projectRoutes = require('./routes/hello');
const helloRoutes = require('./routes/hello'); // Adjust the path if necessary
const imageRoutes = require('./routes/hello'); // Adjust path according to your file structure

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:4200',  // Allow requests from Angular development server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.static(path.join(__dirname, 'dist/thd')));
// Ensure authentication middleware does not block the API route

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use('/api', projectRoutes); // Ensure this line is added to include the new project routes

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
    const allowedRoutes = ['/auth/login', '/auth/register','/api/projects'];
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

// Use the projects router for /api/projects endpoint
app.use('/api/projects', projectsRouter);

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});
app.use('/api', helloRoutes);
app.use('/api', imageRoutes); // Include your image routes

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

module.exports = app;
