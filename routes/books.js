const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Image = require('../models/image'); // Ensure correct path
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images')); // Adjust the path if needed
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
// Display all projects

// Example route to render projects using layout.ejs

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            order: [['id', 'DESC']],
            include: Image
        });
        res.render('books/index', { projects, messages: req.flash() });
    } catch (err) {
        console.error("Error fetching projects:", err);
        req.flash('error', 'Failed to fetch projects');
        res.render('books/index', { projects: [], messages: req.flash() });
    }
});

router.get('/layout', async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            order: [['id', 'DESC']],
            include: Image
        });
        res.render('books/layout', { projects, messages: req.flash() });
    } catch (err) {
        console.error("Error fetching projects:", err);
        req.flash('error', 'Failed to fetch projects');
        res.render('books/layout', { projects: [], messages: req.flash() });
    }
});

// Display project details
router.get('/details/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const project = await Project.findByPk(id, { include: Image });
        if (!project) {
            req.flash('error', 'Project not found');
            return res.redirect('/books');
        }
        res.render('books/details', {
            title: 'Project Details',
            project: project,
            messages: req.flash()
        });
    } catch (err) {
        console.error("Error fetching project details:", err);
        req.flash('error', err.message);
        res.redirect('/books');
    }
});

// Display add project form
router.get('/add', (req, res, next) => {
    res.render('books/add', {
        name: '',
        description: '',
        messages: req.flash()
    });
});

// Handle add project form submission
router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res, next) => {
    const { name, description } = req.body;
    const image_url = req.files['image'] ? '/images/' + req.files['image'][0].filename : null;
    const images = req.files['images'] ? req.files['images'].map(file => '/images/' + file.filename) : [];

    // Validate input
    if (!name.trim() || !description.trim()) {
        req.flash('error', 'Name and Description are required');
        return res.redirect('/books/add');
    }

    try {
        const newProject = await Project.create({ name, description, image_url });

        // Save additional images to the Image table
        if (images.length > 0) {
            const imageRecords = images.map(url => ({ projectId: newProject.id, url }));
            await Image.bulkCreate(imageRecords);
        }

        req.flash('success', 'Project successfully added');
        res.redirect('/books/layout'); // layout if u want to be redirected to admin dashboard //
    } catch (err) {
        console.error("Error adding project:", err);
        req.flash('error', err.message);
        res.redirect('/books/add');
    }
});

// Display edit project form
router.get('/edit/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const project = await Project.findByPk(id, { include: Image });
        if (!project) {
            req.flash('error', 'Project not found');
            return res.redirect('/books');
        }
        res.render('books/edit', {
            title: 'Edit Project',
            id: project.id,
            name: project.name,
            description: project.description,
            image_url: project.image_url,
            images: project.Images.map(image => image.url),
            messages: req.flash()
        });
    } catch (err) {
        console.error("Error fetching project for edit:", err);
        req.flash('error', err.message);
        res.redirect('/books');
    }
});

// Update project data
router.post('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res, next) => {
    const id = req.params.id;
    const { name, description } = req.body;
    let image_url = req.body.existing_image_url; // Assuming existing image URL is sent via form

    // Handle single image upload
    if (req.files['image']) {
        image_url = '/images/' + req.files['image'][0].filename;
    }

    // Handle multiple image upload
    const newImages = req.files['images'] ? req.files['images'].map(file => '/images/' + file.filename) : [];

    try {
        const project = await Project.findByPk(id);
        if (!project) {
            req.flash('error', 'Project not found');
            return res.redirect('/books');
        }

        await project.update({ name, description, image_url });

        // Add new images to the Image table
        if (newImages.length > 0) {
            const imageRecords = newImages.map(url => ({ projectId: project.id, url }));
            await Image.bulkCreate(imageRecords);
        }

        req.flash('success', 'Project successfully updated');
        res.redirect('/books/layout');
    } catch (err) {
        console.error("Error updating project:", err);
        req.flash('error', err.message);
        res.redirect(`/books/edit/${id}`);
    }
});

// Handle delete project
router.get('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            req.flash('error', 'Project not found');
            return res.redirect('/books');
        }
        await project.destroy();
        req.flash('success', 'Project successfully deleted');
        res.redirect('/books/layout');
    } catch (err) {
        console.error("Error deleting project:", err);
        req.flash('error', err.message);
        res.redirect('/books/layout');
    }
});

// Search route
router.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const projects = await Project.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            },
            include: Image
        });
        res.render('books/layout', { projects });
    } catch (error) {
        console.error('Error searching for projects:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Add this route to render the layout.ejs template
router.get('/layout', (req, res) => {
    res.render('books/layout');
});
module.exports = router;
