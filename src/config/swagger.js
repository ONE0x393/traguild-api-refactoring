const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const outputFile = '../swagger-output.json'; // Swagger JSON 파일 경로
const endpointsFiles = ['../app.js'];

const doc = {
    info: {
        title: 'Your API Title',
        description: 'API documentation for your project',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    basePath: '/', // 기본 경로 설정
};

swaggerAutogen(outputFile, endpointsFiles, doc);

