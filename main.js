async function getBookInfo() {



    const apiKey = "76faa9053c59326364cd62f1f1375e2d77db3e92ae9879832c4d569414929619";
    
    const API_KEY = config.apiKey;

    //ttps://www.nl.go.kr/NL/search/openApi/search.do?apiType=json&key=76faa9053c59326364cd62f1f1375e2d77db3e92ae9879832c4d569414929619&detailSearch=true
  let category = '기술과학'  //전체, 문학, 사회과학, 순수과학, 역사, 예술, 어학, 자연과학, 종교, 철학, 종류, 기타
  
    try {
        const response = await fetch(`${API_KEY}`)
      const result = await response.json();
      console.log("result 출력 :", result);
    } catch (error) {
      console.error("ERROR : ", error);
    }
  }
  
  getBookInfo();