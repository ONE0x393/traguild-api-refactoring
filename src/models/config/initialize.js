const User = require('@src/models/User');
const sequelize = require('@src/config/database');

const initialize = async () => {
    await sequelize.sync({force: true});
    console.log('Database synchronized');

    // 기본값 삽입
    await User.bulkCreate([
        {name: 'John Doe', email: 'joh1234n@example.com', password: 'password123'},
        {name: 'Jane Smith', email: 'jan1234e@example.com', password: 'password123'}
    ]);

    console.log('Initial data inserted');
};

module.exports = initialize;