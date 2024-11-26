const RequestApplicant = require('../models/RequestApplicant');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

exports.createRequestApplicant = async (data) => {
    return RequestApplicant.create(data);
}

exports.getAllRequestApplicants = async () => {
    return await RequestApplicant.findAll();
}

exports.getRequestApplicantsByRequestIdx = async (requestIdxList, data) => {
    try {
        const offset = (data.page - 1) * data.limit;
        // request_idx 값이 배열에 포함된 데이터들을 검색
        const applicants = await RequestApplicant.findAll({
            where: {
                request_idx: {
                    [Op.in]: requestIdxList // 배열에 있는 값들을 조건으로 설정
                }
            },
            limit: data.limit,  // 한 페이지에 표시할 최대 데이터 수
            offset: offset // 시작 위치 (페이지 번호에 따라 계산된 값)
        });
        return applicants;
    } catch (error) {
        console.error('Error fetching request applicants by request_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.updateRequestApplicant = async (data) => {

    return await RequestApplicant.update({
        request_idx: data.request_idx,
        applicant_idx: data.applicant_idx,
        applicant_state: data.applicant_state,
        is_canceled: data.is_canceled
    }, {
        where: {
            request_idx: data.request_idx
        }
    });
}