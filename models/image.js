const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db'); // Adjust the path as necessary
const Project = require('./project'); // Ensure the path is correct

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'images'
});

// Define the association
Project.hasMany(Image, { foreignKey: 'projectId' });
Image.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = Image;
