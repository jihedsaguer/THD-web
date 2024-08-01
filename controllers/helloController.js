const path = require('path');
const fs = require('fs');
const db = require('../lib/db'); // Ensure correct path

const Project = require('../models/project'); // Adjust the path if necessary
const Image = require('../models/image');


// Function to delete a specific image
exports.deleteImage = async (req, res) => {
    const { projectId, imageId } = req.params;
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Find and remove the image from the project's images array
        const images = project.images ? JSON.parse(project.images) : [];
        const imageIndex = images.indexOf(imageId);
        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image not found in project' });
        }
        images.splice(imageIndex, 1);

        // Update the project with the remaining images
        project.images = JSON.stringify(images);
        await project.save();

        // Optionally, delete the image file from the server
        const imagePath = path.join(__dirname, '../public', imageId);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.status(200).json({ success: 'Image successfully deleted' });
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ error: 'An error occurred while deleting the image' });
    }
};
// controllers/helloController.js

exports.getHelloWorld = (req, res) => {
    res.json({ message: 'Hello World' });
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({ include: Image });
        res.json(projects);
    } catch (err) {
        console.error("Error fetching projects:", err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

exports.getProjectImages = async (req, res) => {
    try {
        const projects = await Project.findAll({ include: Image });
        const projectImages = projects.map(project => ({
            id: project.id,
            name: project.name,
            description: project.description,
            image_url: `http://localhost:3000/images/${project.image_url}` // Correctly construct the URL
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(projectImages);
    } catch (err) {
        console.error("Error fetching project images:", err);
        res.status(500).json({ error: 'Failed to fetch project images' });
    }
};


// Controller function to get project by ID
exports.getProjectById = async (req, res) => {
    const projectId = parseInt(req.params.id, 10); // Convert ID to number

    if (isNaN(projectId)) {
        return res.status(400).json({ error: 'Invalid project ID' });
    }

    try {
        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project); // Return the project
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};
// Controller function to fetch images for a specific project by ID
exports.fetchImagesForProject = async (req, res) => {
    try {
        const projectId = parseInt(req.params.projectId, 10);

        if (isNaN(projectId)) {
            return res.status(400).json({ error: 'Invalid project ID' });
        }

        // Find images associated with the project ID
        const images = await Image.findAll({
            where: { projectId }
        });

        if (!images.length) {
            return res.status(404).json({ error: 'No images found for this project' });
        }

        // Format the image data with full URLs
        const imagesWithFullUrl = images.map(image => ({
            id: image.id,
            url: `${req.protocol}://${req.get('host')}${image.url}` // Construct the full URL
        }));

        res.json(imagesWithFullUrl);
    } catch (err) {
        console.error("Error fetching images:", err);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};
