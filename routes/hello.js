// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/helloController');
const helloController = require('../controllers/helloController'); // Adjust the path if necessary

router.get('/projects', projectController.getProjects);
// Example route for fetching projects


// Route to get a single project by ID
router.get('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Debug log to confirm ID
        console.log('Fetching project with ID:', id);

        const project = await Project.findByPk(id, { include: Image });
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


// Route to get images for a specific project ID
router.get('/api/project-images/:projectId', helloController.getProjectImages);

router.get('/projects/:projectId/images', helloController.fetchImagesForProject);

router.get('/projects/:id', helloController.getProjectById);


module.exports = router;

