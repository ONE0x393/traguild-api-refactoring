require('module-alias/register');
const logger = require("@src/config/winston/logger");
const initialize = require('@src/config/initialize');
const esClient = require('@src/config/esClient');
const app = require('@src/app');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({path: envFile});

const RequestInfo = require('@src/models/01-request/RequestInfo');
const { Op } = require('sequelize');

const PORT = process.env.PORT || 3000;

// 배치 작업: 1분마다 실행, 3일 이상 경과한 데이터를 찾아서 request_state를 '완료'로 업데이트
setInterval(async () => {
    try {
        console.log(RequestInfo);

        if (!RequestInfo) {
            console.error('RequestInfo 모델을 찾을 수 없습니다.');
            return;
        }
        const result = await RequestInfo.update(
            { request_state: "완료" },
            {
                where: {
                    reserved_start_time: {
                        [Op.lte]: new Date(new Date() - 3 * 24 * 60 * 60 * 1000), // 3일 전 날짜 계산
                        [Op.lte]: new Date(),
                    },
                    request_state: {
                        [Op.ne]: "완료", // 이미 '완료'인 상태는 제외
                    },
                },
            }
        );

        console.log(`${result[0]}개의 요청 상태가 '완료'로 변경되었습니다.`);
    } catch (error) {
        console.error('배치 작업 오류 발생:', error);
    }
}, 60 * 1000);  // 1분마다 실행 (60,000ms)


// Initialize the database and then start the server
initialize().then(async () => {
    // 서버 시작
    app.listen(PORT, "0.0.0.0", () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    logger.error('Error initializing database:', err);
});