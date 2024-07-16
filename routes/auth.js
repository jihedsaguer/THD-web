const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Ensure the path is correct
const router = express.Router();


// Register route
router.get('/register', (req, res) => {
    res.render('auth/register', { messages: req.flash() });
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user in the database

        // Set user session

        req.session.user = await User.create({username, email, password: hashedPassword});

        // Redirect to profile or dashboard after successful registration
        res.redirect('/books');
    } catch (err) {
        console.error('Registration error:', err);
        req.flash('error', 'Registration failed');
        res.redirect('/auth/register'); // Redirect back to register page on error
    }
});




// Login route
router.get('/login', (req, res) => {
    res.render('auth/login', { messages: req.flash() });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });

        // If user exists, compare passwords
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                req.session.user = user; // Store user session
                return res.redirect('/books/layout'); // Redirect to profile on successful login
            }
        }

        // Handle invalid credentials
        req.flash('error', 'Invalid username or password');
        res.redirect('/auth/login');
    } catch (err) {
        console.error('Login error:', err);
        req.flash('error', 'Login failed');
        res.redirect('/auth/login');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy(err => {
        if (err) {
            console.error('Session destroy error:', err);
        }
        res.redirect('/auth/login'); // Redirect to home page after logout
    });
});

module.exports = router;
