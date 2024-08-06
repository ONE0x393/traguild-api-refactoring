const RequestApplicant = require('@src/models/RequestApplicant');

const insertRequestApplicant = async () => {
    return RequestApplicant.bulkCreate([
        {
            "request_idx": "1",
            "applicant_idx": "1",
            "applicant_state": "수락"
        },{
            "request_idx": "1",
            "applicant_idx": "2",
            "applicant_state": "취소",
            "is_canceled": "1"
        },{
            "request_idx": "1",
            "applicant_idx": "3",
            "applicant_state": "대기"
        },{
            "request_idx": "5",
            "applicant_idx": "3",
            "applicant_state": "거절"
        },{
            "request_idx": "3",
            "applicant_idx": "5",
            "applicant_state": "수락"
        },
    ]);
}

module.exports = insertRequestApplicant;