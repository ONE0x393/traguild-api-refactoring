require('module-alias/register');
const initialize = require('@src/models/initialize');
const app = require('@src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Initialize the database and then start the server
initialize().then(() => {
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error initializing database:', err);
});