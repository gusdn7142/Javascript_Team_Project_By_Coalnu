async function getBookInfo() {

    const apiKey = "76faa9053c59326364cd62f1f1375e2d77db3e92ae9879832c4d569414929619";
    let classification  = '도서';
  
    try {
      
      const response = await fetch(`https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&detailSearch=true&category=${classification}`);   //&f1=${f1}&v1=${v1}    &kwd=${classification}
      const result = await response.json();
      console.log("result 출력 :", result);
    } catch (error) {
      console.error("ERROR : ", error);
    }
  }
  
  getBookInfo();

















  