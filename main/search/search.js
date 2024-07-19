async function getBookInfo(keyword) {
  const apikey = config.apikey;
  const url = 
  `https://www.nl.go.kr/NL/search/openApi/search.do?key=${apikey}&apiType=json&kwd=${encodeURIComponent(keyword)}&pageSize=15&pageNum=1&sort=`;
console.log(apikey);
  try {
    const response = await fetch(url);
    const resultSearch  = await response.json();
    console.log("API Response:", resultSearch );
    return resultSearch ;
  } catch (error) {
    console.error("ERROR : ", error);
    return null;
  }
}

function extractAuthorName(authorInfo) {
  // 예: "홍길동 저"에서 "홍길동"만 추출
  const nameMatch = authorInfo.match(/^[^\s]+/);
  const name = nameMatch ? nameMatch[0] : authorInfo;
  return name.length > 20 ? name.substring(0, 20) + "..." : name;
}

//searchBooksResult

async function searchBooks() {
  const searchInput = document.getElementById('search-input').value;
  const resultSearch = await getBookInfo(searchInput);
  const books = resultSearch?.result || [];

  const bookListDiv = document.getElementById('book-list');
  bookListDiv.innerHTML = ''; // 기존 리스트 초기화

  if (books.length === 0) {
    bookListDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
    return;
  }

  books.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-item', `search_book${index + 1}`);
    bookDiv.innerHTML = `
      <img src="${book.imageUrl ? `http://cover.nl.go.kr/${book.imageUrl}` : '../search/search noimage/noimage_NL1.jpg'}"/>
      <p>제목: ${book.titleInfo}</p>
      <p>저자: ${extractAuthorName(book.authorInfo)}</p>
    `;
    bookListDiv.appendChild(bookDiv);
  });

}




        // <p>출판 정보: ${book.pubInfo}</p>
        // <h3>제목: ${book.titleInfo}</h3>
        // ${book.imageUrl ? `<img src="http://cover.nl.go.kr/${book.imageUrl}" alt="${book.titleInfo}">` : ''}
        // <p>상세 링크: <a href="${book.detailLink}" target="_blank">여기</a></p>
        // <p>유형: ${book.typeName}</p>
        // <p>분류: ${book.kdcName1s}</p>