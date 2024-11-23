const RequestApplicant = require('@src/models/RequestApplicant');

const insertRequestApplicant = async () => {
    return RequestApplicant.bulkCreate([
        {
            "request_idx": "1",
            "user_idx": "1",
            "applicant_state": "승인"
        },{
            "request_idx": "1",
            "user_idx": "2",
            "applicant_state": "취소",
            "is_canceled": "1"
        },{
            "request_idx": "1",
            "user_idx": "3",
            "applicant_state": "대기"
        },{
            "request_idx": "5",
            "user_idx": "3",
            "applicant_state": "반려"
        },{
            "request_idx": "3",
            "user_idx": "5",
            "applicant_state": "승인"
        },
    ]);
}

module.exports = insertRequestApplicant;