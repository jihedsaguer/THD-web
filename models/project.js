const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db'); // Adjust the path as necessary

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    images: {
        type: DataTypes.JSON, // Ensure this is JSON to store multiple image URLs
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'projects'
});

module.exports = Project;
