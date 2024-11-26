const RequestApplicant = require('@src/models/RequestApplicant');

const insertRequestApplicant = async () => {
    return RequestApplicant.bulkCreate([
        {
            "request_idx": 1,
            "applicant_idx": 2,
            "applicant_state": "대기"
        },{
            "request_idx": 2,
            "applicant_idx": 7,
            "applicant_state": "취소",
            "is_canceled": "1"
        },{
            "request_idx": 2,
            "applicant_idx": 8,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 3,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 5,
            "applicant_state": "대기"
        },{
            "request_idx": 4,
            "applicant_idx": 1,
            "applicant_state": "대기"
        },{
            "request_idx": 5,
            "applicant_idx": 32,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 23,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 45,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 55556,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 34556,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 2346,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 12684,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 43244,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 87554,
            "applicant_state": "대기"
        },{
            "request_idx": 6,
            "applicant_idx": 3859,
            "applicant_state": "대기"
        },
    ]);
}

module.exports = insertRequestApplicant;