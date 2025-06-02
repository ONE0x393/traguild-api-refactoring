const RequestApplicant = require('../../models/01-request/RequestApplicant');
const sequelize = require('../../config/database');
const { Op } = require('sequelize');
const RequestInfoService = require('../../services/01-reuest/requestInfoService');

exports.createRequestApplicant = async (data) => {
    const existingApplicant = await RequestApplicant.findOne({
        where: {
            user_idx: data.user_idx,
            request_idx: data.request_idx,
            applicant_state: { [Op.in]: ["대기", "승인"] },
            is_canceled: false
        }
    });
    if (existingApplicant) {
        return { http_status: "fail" };
    }
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
                },
                is_canceled: false,
                applicant_state: "대기",

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

exports.getFetchRequestInfosByUser = async (user_idx, data) => {
    try {
        const offset = (data.page - 1) * data.limit; // 페이지 시작 위치 계산

        const result = await sequelize.query(
            `
            SELECT ra.id, ra.applicant_state, ra.applicant_intro, ra.is_canceled, ri.*
            FROM TB_REQUEST_APPLICANT ra
            JOIN TB_REQUEST_INFO ri USING(request_idx)
            WHERE ra.user_idx = :user_idx
            ORDER BY ra.request_idx DESC
            LIMIT :limit OFFSET :offset
            `,
            {
                replacements: {
                    user_idx,      // `:user_idx`에 값을 바인딩
                    limit: data.limit,   // `:limit`에 페이지당 데이터 수를 바인딩
                    offset: offset,      // `:offset`에 계산된 오프셋 값 바인딩
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );

        return result;
    } catch (error) {
        console.error('Error fetching requestInfos by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.getApplicantInfoByUser = async (user_idx, data) => {
    try{

        const offset = (data.page - 1) * data.limit;
        let query = `
                SELECT
                    ri.request_title,
                    ri.request_idx,
                    ui.user_nickname,
                    ui.user_id,
                    ui.user_idx,
                    ra.applicant_intro,
                    ra.applicant_state,
                    ra.id,
                    ri.request_region
                FROM TB_REQUEST_INFO ri
                         JOIN TB_REQUEST_APPLICANT ra ON ri.request_idx = ra.request_idx
                         JOIN TB_USER_INFO ui ON ra.user_idx = ui.user_idx
                WHERE ri.user_idx = :user_idx
            `;
        if(data.status !== "전체"){
            query += `AND ra.applicant_state = :status`;
        }

        query +=`
            ORDER BY ri.request_idx DESC
        LIMIT :limit OFFSET :offset
        `
        const result = await sequelize.query(
            query,
            {
                replacements: {
                    user_idx,      // `:user_idx`에 값을 바인딩
                    limit: data.limit,   // `:limit`에 페이지당 데이터 수를 바인딩
                    offset: offset,      // `:offset`에 계산된 오프셋 값 바인딩
                    status: data.status,
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );
        if (!result || result.length === 0) {
            return [];
        }

        return result;

    }catch (error){
        console.error('Error fetching request applicants by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.getAcceptedApplicantByUser = async (user_idx) => {
    try{
        let query = `
            SELECT B.*
            FROM TB_REQUEST_APPLICANT A
            LEFT JOIN TB_REQUEST_INFO B ON A.request_idx = B.request_idx
            WHERE A.user_idx = :user_idx AND A.applicant_state = '승인' AND B.is_deleted = 0
            `;
        const result = await sequelize.query(
            query,
            {
                replacements: {
                    user_idx
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );
        if (!result || result.length === 0) {
            return [];
        }

        return result;

    }catch (error){
        console.error('Error fetching request accepted applicants by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.getFinishedApplicantByUser = async (user_idx) => {
    try{
        let query = `
            SELECT DISTINCT B.*
            FROM TB_REQUEST_APPLICANT A
            LEFT JOIN TB_REQUEST_INFO B ON A.request_idx = B.request_idx
            WHERE B.applicant_idx = :user_idx 
              AND A.applicant_state = '승인' 
              AND B.is_deleted = 0 
              AND B.request_state = '완료'
            `;
        const result = await sequelize.query(
            query,
            {
                replacements: {
                    user_idx
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );
        if (!result || result.length === 0) {
            return [];
        }
        return result;

    }catch (error){
        console.error('Error fetching request accepted applicants by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.getManyApplicantForThisRequest = async (request_idx) => {
    try {
        const applicants = await RequestApplicant.findAll({
            where: {
                request_idx: request_idx,
                is_canceled: false
            }
        });
        return applicants;
    } catch (error) {
        console.error("Error request applicants by request_idx:", error);
        throw error;
    }
};

exports.updateRequestApplicant = async (data) => {

    return await RequestApplicant.update({
        applicant_state: data.applicant_state,
        applicant_intro: data.applicant_intro,
        is_canceled: data.is_canceled
    }, {
        where: {
            request_idx: data.request_idx,
            user_idx: data.user_idx
        }
    });
}

exports.updateRequestAllApplicantForReject = async (data) => {
    const requestInfos = await RequestInfoService.getRequestInfoByIdx(data.request_idx);

    if (!requestInfos || requestInfos.length === 0) {
        throw new Error('의뢰 정보를 찾을 수 없습니다');
    }
    const applicantIdx = requestInfos[0].applicant_idx;//applicant_idx 추출

    return await RequestApplicant.update({
        applicant_state: "취소", //모두 취소처리
    }, {
        where: {
            request_idx: data.request_idx,
            user_idx: { [Op.ne]: applicantIdx } // request의 appliant_idx(확정자)를 제외하고
        }
    });
}