const RequestInfo = require('@src/models/RequestInfo');
const esClient = require('@src/config/esClient');

const insertRequestInfo = async () => {
    const requests = await RequestInfo.bulkCreate([
        {
            "user_idx": "1",
            "request_region": "경상남도 김해시",
            "request_title": "오전 중 창고정리",
            "request_content": "오전 중에 야채창고 정리할 인력 다섯분 구합니다. 야리끼리로 처리되고 일당은 7만원입니다. 오후에 창고물자 입고랑 연계 신청가능합니다",
            "request_cost": 70000,
            "request_state": "모집완료",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "1",
            "request_region": "경상남도 김해시",
            "request_title": "오후 중 창고물자 입고",
            "request_content": "오후 중에 창고에 물자 입고할 인력 10명 구합니다. 야리끼리로 처리되고 일당은 10만원입니다. 오전 정리일 일당이랑 별개입니다.",
            "request_cost": 100000,
            "request_state": "모집중",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "3",
            "request_region": "경상남도 창원시",
            "request_title": "행사장 관리",
            "request_content": "광복절 기념 행사 관리인력 모집합니다. 오전중으로만 진행되고 9시부터 12까지 진행됩니다. (중식 제공포함)",
            "request_cost": 50000,
            "request_state": "모집완료",
            "created_date": "2024-08-01",
            "updated_time": "2024-08-01"
        },{
            "user_idx": "4",
            "request_region": "울산광역시",
            "request_title": "자동차 공장 단기알바",
            "request_content": "2주 동안 현대차 생산라인에서 일할 분 모집합니다. 모집인원 0명, 중식과 석식 제공",
            "request_cost": 250000,
            "request_state": "모집중",
            "created_date": "2024-07-14",
            "updated_time": "2024-07-14"
        },{
            "user_idx": "5",
            "request_region": "부산광역시",
            "request_title": "엑스포 안내 인원",
            "request_content": "3일 동안 엑스포에서 행사장 안내하실분 구합니다. 이전 행사안내에 참여하신분 우대합니다.(중식 제공)",
            "request_cost": 50000,
            "request_state": "모집예정",
            "created_date": "2024-08-20",
            "updated_time": "2024-08-20"
        },
        {
            "user_idx": "12",
            "request_region": "세종특별자치시",
            "request_title": "공무원 취임식 행사",
            "request_content": "오전 중에 야채창고 정리할 인력 다섯분 구합니다. 야리끼리로 처리되고 일당은 7만원입니다. 오후에 창고물자 입고랑 연계 신청가능합니다",
            "request_cost": 70000,
            "request_state": "모집완료",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "9",
            "request_region": "제주특별시",
            "request_title": "감귤박스 포장",
            "request_content": "오후 중에 창고에 물자 입고할 인력 10명 구합니다. 야리끼리로 처리되고 일당은 10만원입니다. 오전 정리일 일당이랑 별개입니다.",
            "request_cost": 100000,
            "request_state": "모집중",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "8",
            "request_region": "경상남도 양산시",
            "request_title": "가로수 정리 알바",
            "request_content": "광복절 기념 행사 관리인력 모집합니다. 오전중으로만 진행되고 9시부터 12까지 진행됩니다. (중식 제공포함)",
            "request_cost": 50000,
            "request_state": "모집완료",
            "created_date": "2024-08-01",
            "updated_time": "2024-08-01"
        },{
            "user_idx": "11",
            "request_region": "경상남도 진주시",
            "request_title": "LH인턴십",
            "request_content": "2주 동안 현대차 생산라인에서 일할 분 모집합니다. 모집인원 0명, 중식과 석식 제공",
            "request_cost": 250000,
            "request_state": "모집중",
            "created_date": "2024-07-14",
            "updated_time": "2024-07-14"
        },{
            "user_idx": "5",
            "request_region": "부산광역시",
            "request_title": "갈매기 시장 홍보 행사 관련 스텝",
            "request_content": "3일 동안 엑스포에서 행사장 안내하실분 구합니다. 이전 행사안내에 참여하신분 우대합니다.(중식 제공)",
            "request_cost": 50000,
            "request_state": "모집예정",
            "created_date": "2024-08-20",
            "updated_time": "2024-08-20"
        },
        {
            "user_idx": "7",
            "request_region": "강원도 춘천시",
            "request_title": "닭갈비 홍보모델",
            "request_content": "오전 중에 야채창고 정리할 인력 다섯분 구합니다. 야리끼리로 처리되고 일당은 7만원입니다. 오후에 창고물자 입고랑 연계 신청가능합니다",
            "request_cost": 70000,
            "request_state": "모집완료",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "11",
            "request_region": "전라남도 신안",
            "request_title": "튼튼한 사람 구해요.",
            "request_content": "오후 중에 창고에 물자 입고할 인력 10명 구합니다. 야리끼리로 처리되고 일당은 10만원입니다. 오전 정리일 일당이랑 별개입니다.",
            "request_cost": 100000,
            "request_state": "모집중",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "13",
            "request_region": "경기도 광명시",
            "request_title": "1달 짜리 홀서빙 단기알바",
            "request_content": "광복절 기념 행사 관리인력 모집합니다. 오전중으로만 진행되고 9시부터 12까지 진행됩니다. (중식 제공포함)",
            "request_cost": 50000,
            "request_state": "모집완료",
            "created_date": "2024-08-01",
            "updated_time": "2024-08-01"
        },{
            "user_idx": "54",
            "request_region": "울산광역시",
            "request_title": "선박 수주 관리인력",
            "request_content": "2주 동안 현대차 생산라인에서 일할 분 모집합니다. 모집인원 0명, 중식과 석식 제공",
            "request_cost": 250000,
            "request_state": "모집중",
            "created_date": "2024-07-14",
            "updated_time": "2024-07-14"
        },{
            "user_idx": "15",
            "request_region": "부산광역시",
            "request_title": "횟집 알바",
            "request_content": "3일 동안 엑스포에서 행사장 안내하실분 구합니다. 이전 행사안내에 참여하신분 우대합니다.(중식 제공)",
            "request_cost": 50000,
            "request_state": "모집예정",
            "created_date": "2024-08-20",
            "updated_time": "2024-08-20"
        },
        {
            "user_idx": "12",
            "request_region": "강원도 태릉시",
            "request_title": "태릉 선수촌 관리인 모집",
            "request_content": "오전 중에 야채창고 정리할 인력 다섯분 구합니다. 야리끼리로 처리되고 일당은 7만원입니다. 오후에 창고물자 입고랑 연계 신청가능합니다",
            "request_cost": 70000,
            "request_state": "모집완료",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "43",
            "request_region": "경상북도 구미시",
            "request_title": "병아리 성별 감별 알바모집",
            "request_content": "오후 중에 창고에 물자 입고할 인력 10명 구합니다. 야리끼리로 처리되고 일당은 10만원입니다. 오전 정리일 일당이랑 별개입니다.",
            "request_cost": 100000,
            "request_state": "모집중",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "28",
            "request_region": "경기도 용신시",
            "request_title": "제약시험 관찰대상자 모집",
            "request_content": "광복절 기념 행사 관리인력 모집합니다. 오전중으로만 진행되고 9시부터 12까지 진행됩니다. (중식 제공포함)",
            "request_cost": 50000,
            "request_state": "모집완료",
            "created_date": "2024-08-01",
            "updated_time": "2024-08-01"
        },{
            "user_idx": "211",
            "request_region": "경상남도 김해시",
            "request_title": "창고 상하차 알바",
            "request_content": "2주 동안 현대차 생산라인에서 일할 분 모집합니다. 모집인원 0명, 중식과 석식 제공",
            "request_cost": 250000,
            "request_state": "모집중",
            "created_date": "2024-07-14",
            "updated_time": "2024-07-14"
        },{
            "user_idx": "85",
            "request_region": "경기도 안산시",
            "request_title": "치안유지 방범대원 모집",
            "request_content": "3일 동안 엑스포에서 행사장 안내하실분 구합니다. 이전 행사안내에 참여하신분 우대합니다.(중식 제공)",
            "request_cost": 50000,
            "request_state": "모집예정",
            "created_date": "2024-08-20",
            "updated_time": "2024-08-20"
        },
        {
            "user_idx": "143",
            "request_region": "충청북도 천안시",
            "request_title": "김장 행사 인원모집",
            "request_content": "오후 중에 창고에 물자 입고할 인력 10명 구합니다. 야리끼리로 처리되고 일당은 10만원입니다. 오전 정리일 일당이랑 별개입니다.",
            "request_cost": 100000,
            "request_state": "모집중",
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "user_idx": "328",
            "request_region": "충청북도 당진시",
            "request_title": "철강회사 생산직 모집",
            "request_content": "광복절 기념 행사 관리인력 모집합니다. 오전중으로만 진행되고 9시부터 12까지 진행됩니다. (중식 제공포함)",
            "request_cost": 50000,
            "request_state": "모집완료",
            "created_date": "2024-08-01",
            "updated_time": "2024-08-01"
        },{
            "user_idx": "411",
            "request_region": "충청남도 대전시",
            "request_title": "국군의 행사 관련 식재료 보급 업체 모집",
            "request_content": "2주 동안 현대차 생산라인에서 일할 분 모집합니다. 모집인원 0명, 중식과 석식 제공",
            "request_cost": 250000,
            "request_state": "모집중",
            "created_date": "2024-07-14",
            "updated_time": "2024-07-14"
        },{
            "user_idx": "1185",
            "request_region": "경기도 수원시",
            "request_title": "롯데마트 직원 모집",
            "request_content": "3일 동안 엑스포에서 행사장 안내하실분 구합니다. 이전 행사안내에 참여하신분 우대합니다.(중식 제공)",
            "request_cost": 50000,
            "request_state": "모집예정",
            "created_date": "2024-08-20",
            "updated_time": "2024-08-20"
        },
    ]);
    for(const request of requests){
        await esClient.index({
            index: 'request_info',
            id: request.request_idx,
            body: request
        });
    }
    return requests;
}

module.exports = insertRequestInfo;