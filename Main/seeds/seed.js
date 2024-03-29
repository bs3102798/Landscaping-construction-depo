const sequelize = require('../config/connections');
const { User } = require('../models');

const userData = require('./userData.json');
// const projectData = require('./projectData.json')


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

seedDatabase();