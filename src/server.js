require('module-alias/register');
const initialize = require('@src/models/initialize');
const esClient = require('@src/config/esClient');
const app = require('@src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Initialize the database and then start the server
initialize().then(async () => {
    //* // 서비스 시, 삭제 필요
    try {
        // 모든 인덱스 삭제
        await esClient.indices.delete({ index: '_all' });
        console.log('Deleted all indices');
    } catch (error) {
        console.error('Failed to delete all indices', error);
    }
    // */

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error initializing database:', err);
});

// JIRA 연결 테스트