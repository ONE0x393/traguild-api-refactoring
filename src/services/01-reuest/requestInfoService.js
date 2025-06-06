const RequestInfo = require("../../models/01-request/RequestInfo");
const UserInfoService = require("../../services/00-userInfo/userInfoService");
const sequelize = require("../../config/database");
const esClient = require("../../config/esClient");
const getSynonymSearch = require("../../config/synonymSearch");

exports.createRequestInfo = async (fileData, data) => {
  const user_info = await UserInfoService.getUser(data.user_idx);
  const user_credit = user_info?.user_credit;

  if (user_credit > 0) {
    //credit -1 수정 후 작업
    await UserInfoService.updateUser({
      user_idx: data.user_idx,
      user_credit: user_credit - 1,
    });

    const now = new Date();
    data.created_date = now.toISOString();
    data.updated_time = now.toISOString();
    data.request_img = fileData?.path ?? "";

    const request = await RequestInfo.create(data);
    const result = request.toJSON(); // 순수 JS 객체로 변환

    result.status = "OK";
    result.msg = "";

    await esClient.index({
      index: "request_info",
      id: request.request_idx,
      body: request,
    });

    return result;
  } else {
    return { status: "FAIL", msg: "크레딧이 부족합니다." };
  }
  //return RequestInfo.create(data);
};

exports.getRequestImage = async (request_idx) => {
  const { body } = await esClient.search({
    index: "request_info",
    _source: ["request_img"],
    body: {
      query: {
        term: { request_idx: request_idx },
      },
    },
  });

  return body.hits.hits.map((hit) => hit._source.request_img);
  //return RequestInfo.create(data);
};

exports.getAllRequestInfos = async () => {
  return await RequestInfo.findAll();
};

exports.getNearBy = async (data) => {
  const { latitude, longitude } = data;
  const result = await sequelize.query(
    `
        SELECT *
        FROM TB_REQUEST_INFO
        WHERE latitude BETWEEN :latMin AND :latMax
            AND longitude BETWEEN :lonMin AND :lonMax
          AND request_state = '모집'
    `,
    {
      replacements: {
        latMin: parseFloat(latitude) - 0.005,
        latMax: parseFloat(latitude) + 0.005,
        lonMin: parseFloat(longitude) - 0.005,
        lonMax: parseFloat(longitude) + 0.005,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return result;
};

exports.getFetchRequestInfosOnlyMine = async (data) => {
  const { body } = await esClient.search({
    index: "request_info",
    body: {
      sort: [
        {
          request_idx: {
            order: "desc", // 역순 정렬 (내림차순)
          },
        },
      ],
      from: (data.page - 1) * data.limit, // 시작 위치, 0부터 시작하기 때문에 page-1
      size: data.limit, // 가져올 개수
      query: {
        bool: {
          must: [
            { term: { user_idx: data.user_idx } },
            { term: { is_deleted: false } },
          ],
        },
      },
    },
  });

  return body.hits.hits.map((hit) => hit._source);
  //return await RequestInfo.findAll();
};

exports.getHowManyRequestByUser = async (user_idx) => {
  try {
    let query = `
            SELECT COUNT(*)
            FROM TB_REQUEST_INFO
            WHERE user_idx = :user_idx 
              AND is_deleted = 0
            `;
    const result = await sequelize.query(query, {
      replacements: {
        user_idx,
      },
      type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
    });

    return result[0]["COUNT(*)"];
  } catch (error) {
    console.error("Error how much accept request by user_idx:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
  }
};

exports.getHowManyAcceptByUser = async (user_idx) => {
  try {
    let query = `
            SELECT B.*
            FROM TB_REQUEST_INFO A
            LEFT JOIN TB_REQUEST_APPLICANT B ON A.request_idx = B.request_idx
            WHERE A.user_idx = :user_idx 
              AND A.is_deleted = 0
              AND B.applicant_state = '승인'
            ORDER BY A.created_date DESC
            `;
    const result = await sequelize.query(query, {
      replacements: {
        user_idx,
      },
      type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
    });
    if (!result || result.length === 0) {
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error how much accept request by user_idx:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
  }
};

exports.getHowManyCompleteByUser = async (user_idx) => {
  try {
    let query = `
            SELECT COUNT(*)
            FROM TB_REQUEST_APPLICANT A
            LEFT JOIN TB_REQUEST_INFO B ON A.request_idx = B.request_idx
            WHERE A.user_idx = :user_idx 
              AND B.request_state = '완료'
              AND A.applicant_state = '승인'
            `;
    const result = await sequelize.query(query, {
      replacements: {
        user_idx,
      },
      type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
    });

    return result[0]["COUNT(*)"];
  } catch (error) {
    console.error("Error how many complete request by user_idx:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
  }
};

exports.getFetchRequestInfos = async (data) => {
  const { body } = await esClient.search({
    index: "request_info",
    body: {
      sort: [
        {
          request_idx: {
            order: "desc", // 역순 정렬 (내림차순)
          },
        },
      ],
      from: (data.page - 1) * data.limit, // 시작 위치, 0부터 시작하기 때문에 page-1
      size: data.limit, // 가져올 개수
      query: {
        bool: {
          must: [{ term: { is_deleted: false } }],
          must_not: [
            //검색자 자기자신의 의뢰는 제외하여 검색
            {
              term: { user_idx: data.user_idx },
            },
          ],
        },
      },
    },
  });

  return body.hits.hits.map((hit) => hit._source);
  //return await RequestInfo.findAll();
};

exports.getFetchRequestInfosByTitle = async (data) => {
  const queryString = await getSynonymSearch(data.request_title);

  const query = {
    bool: {
      must: [
        {
          term: { is_deleted: false }, // is_deleted가 false인 데이터만
        },
      ],
      must_not: [
        {
          term: { user_idx: data.user_idx }, // data의 user_idx를 제외한
        },
      ],
      should: [
        {
          match: { request_title: queryString }, // match 쿼리: 요청 제목이 검색어와 일치하는 문서 찾기
        },
        {
          wildcard: {
            request_title: `*${data.request_title}*`, // wildcard 쿼리: 요청 제목에 검색어가 포함된 문서 찾기
          },
        },
      ],
      minimum_should_match: 1, // `should` 쿼리 중 하나라도 만족하면 결과에 포함
    },
  };

  // 만약 data.mode가 1일 경우, request_category 필터를 추가
  if (data.mode === 1) {
    query.bool.filter = [
      {
        term: { request_category: data.request_category }, // 요청 카테고리가 일치하는 데이터만 필터링
      },
    ];
  }

  const { body } = await esClient.search({
    index: "request_info",
    body: {
      sort: [
        {
          request_idx: {
            order: "desc", // 역순 정렬 (내림차순)
          },
        },
      ],
      from: (data.page - 1) * data.limit, // 시작 위치, 0부터 시작하기 때문에 page-1
      size: data.limit, // 가져올 개수
      query: query, // 위에서 정의한 쿼리 객체
    },
  });

  return body.hits.hits.map((hit) => hit._source);
  //return await RequestInfo.findAll();
};

exports.getRequestInfoByIdx = async (request_idx) => {
  const { body } = await esClient.search({
    index: "request_info",
    body: {
      query: {
        term: { request_idx: request_idx },
      },
    },
  });

  return body.hits.hits.map((hit) => hit._source);
  //return RequestInfo.findByPk(request_idx);
};

//terms를 사용해 배열로 값을 받아와도 한번에 처리
exports.getRequestInfosByIdxList = async (requestIdxList, req_body) => {
  const { body } = await esClient.search({
    index: "request_info",
    body: {
      query: {
        bool: {
          must: [
            {
              terms: { request_idx: requestIdxList }, // 관심 있는 여러 request_idx
            },
            {
              term: { is_deleted: false }, // 삭제되지 않은 데이터만
            },
          ],
        },
      },
      sort: [
        {
          request_idx: {
            order: "desc", // 역순 정렬 (내림차순)
          },
        },
      ],
      from: (req_body.page - 1) * req_body.limit, // 시작 위치, 0부터 시작하기 때문에 page-1
      size: req_body.limit, // 가져올 개수
    },
  });

  return body.hits.hits.map((hit) => hit._source);
};

exports.updateRequestInfo = async (data) => {
  const now = new Date();
  data.updated_time = now.toISOString();

  await RequestInfo.update(
    {
      request_idx: data.request_idx,
      user_idx: data.user_idx,
      request_region: data.request_region,
      latitude: data.latitude,
      longitude: data.longitude,
      request_title: data.request_title,
      request_content: data.request_content,
      request_cost: data.request_cost,
      request_state: data.request_state,
      request_category: data.request_category,
      created_date: data.created_date,
      reserved_start_time: data.reserved_start_time,
      is_deleted: data.is_deleted,
      applicant_idx: data.applicant_idx,
    },
    {
      where: {
        request_idx: data.request_idx,
      },
    }
  );
  await esClient.update({
    index: "request_info",
    id: data.request_idx,
    body: {
      doc: data,
    },
  });
  return data;
};

exports.updateRequestImg = async (data) => {
  const now = new Date();
  data.updated_time = now.toISOString();

  await RequestInfo.update(
    {
      request_img: data.request_img,
      updated_time: data.updated_time,
    },
    {
      where: {
        request_idx: data.request_idx,
        user_idx: data.user_idx,
      },
    }
  );
  await esClient.update({
    index: "request_info",
    id: data.request_idx,
    body: {
      doc: data,
    },
  });
  return data;
};
