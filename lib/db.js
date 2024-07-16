const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Twohdesign', 'root', '', {
	host: '127.0.0.1',
	dialect: 'mysql'
});
const syncDatabase = async () => {
	try {
		await sequelize.sync({ force: false }); // 'force: false' ensures that the table is created if it doesn't exist, without dropping the table if it already exists
		console.log('Database synchronized successfully.');
	} catch (error) {
		console.error('Unable to synchronize the database:', error);
	}
};

syncDatabase();

module.exports = sequelize;
