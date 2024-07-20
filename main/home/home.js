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


// 로컬 및 도메인 URL에서 바로가기 버튼 클릭 이벤트 추가
window.onload = function() {
  const fixedBaseUrl = 'https://munheon-garden.netlify.app';

  const firstBookButton = document.getElementById('firstBookButton');
  const secondBookButton = document.getElementById('secondBookButton');
  const thirdBookButton = document.getElementById('thirdBookButton');

  // 로컬 및 도메인 URL 클릭 이벤트
  firstBookButton.addEventListener('click', function() {
    window.location.href = `${fixedBaseUrl}/detail/detail.html?titleKeyword=나의 문학 답사 일지&authorKeyword=정병설`;
  });

  secondBookButton.addEventListener('click', function() {
    window.location.href = `${fixedBaseUrl}/detail/detail.html?titleKeyword=시절과 기분&authorKeyword=김봉곤`;
  });

  thirdBookButton.addEventListener('click', function() {
    window.location.href = `${fixedBaseUrl}/detail/detail.html?titleKeyword=당일치기 조선여행 : 한양과 경성, 두 개의 조선을 걷는 시간&authorKeyword=트래블레이블,이용규,김혜정,장보미,최윤정`;
  });
};









  