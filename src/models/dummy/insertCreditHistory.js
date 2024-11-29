const CreditHistory = require('@src/models/CreditHistory');
const esClient = require('@src/config/esClient');

const insertCreditHistory = async () => {
    const history = await CreditHistory.bulkCreate([
        {
            "user_idx": 1,
            "request_idx":3,
            "modify_credit": 120,
            "modify_type": false,
            "credit_from": "글 작성",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": 1,
            "request_idx":3,
            "modify_credit": 3500,
            "modify_type": true,
            "credit_from": "리뷰 작성",
            "created_date": "2024-10-29",
            "updated_time": "2024-10-29"
        },{
            "user_idx": 2,
            "request_idx":4,
            "modify_credit": 2800,
            "modify_type": true,
            "credit_from": "리뷰 작성",
            "created_date": "2024-11-12",
            "updated_time": "2024-11-12"
        },{
            "user_idx": 5,
            "request_idx":5,
            "modify_credit": 1600,
            "modify_type": false,
            "credit_from": "글 작성",
            "created_date": "2024-11-15",
            "updated_time": "2024-11-15"
        },
    ]);
    for(const thing of history){
        await esClient.index({
            index: 'credit_history',
            id: thing.credit_trade_idx,
            body: thing
        });
    }
    return history;
}

module.exports = insertCreditHistory;