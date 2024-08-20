const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const outputFile = '../swagger-output.json'; // Swagger JSON 파일 경로
const endpointsFiles = ['../app.js'];

const doc = {
    info: {
        title: '캡스톤 디자인 API',
        description: '캡스톤 디자인 API 문서입니다.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    basePath: '/', // 기본 경로 설정
};

swaggerAutogen(outputFile, endpointsFiles, doc);

