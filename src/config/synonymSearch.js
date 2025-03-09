const axios = require("axios");

async function getSynonymSearch(key_word) {
    const keywords = key_word.split(' ');  // key_word을 단어 단위로 분리

    const allRelatedWords = [];
    for (const keyword of keywords) {
        try {
            const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(keyword)}`;
            const response = await axios.get(url);
            const results = response.data[1]; // 자동완성 검색어 리스트

            // 검색어에서 해당 단어를 제외한 나머지 부분만 추출
            const filteredResults = results.map(item => {
                const regex = new RegExp(`^${keyword}`, 'i');
                const filtered = item.replace(regex, "").trim();
                return filtered.length > 0 ? filtered : null;
            }).filter(Boolean);

            // 공백을 기준으로 분리된 단어들을 개별 키워드로 반환
            const flatResults = [].concat(...filteredResults.map(item => item.split(' ').map(word => word.trim()).filter(Boolean)));

            // 중복 제거 후 결과 반환
            allRelatedWords.push(...flatResults);
        } catch (error) {
            console.error(`Error-Synonym not found about "${keyword}":`, error);
        }
    }

    // 기존 key_word과 관련된 단어들을 합침
    const queryString = [key_word, ...new Set(allRelatedWords)].join(' ');
    console.log(queryString);

    return queryString; // queryString 반환
}

// 함수 외부로 내보내기
module.exports = getSynonymSearch;