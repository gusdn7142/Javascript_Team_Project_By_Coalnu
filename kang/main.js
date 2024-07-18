// async function getBookInfo(keyword) {
//     const apiKey = "76faa9053c59326364cd62f1f1375e2d77db3e92ae9879832c4d569414929619";
//     const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&kwd=${encodeURIComponent(keyword)}&pageSize=10&pageNum=1&sort=&category=도서`;
  
//     try {
//       const response = await fetch(url);
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("ERROR : ", error);
//       return null;
//     }
//   }
  
//   async function searchBooks() {
//     const searchInput = document.getElementById('search-input').value;
//     const data = await getBookInfo(searchInput);
//     const books = data?.result || [];
  
//     const bookListDiv = document.getElementById('book-list');
//     bookListDiv.innerHTML = ''; // 기존 리스트 초기화
  
//     if (books.length === 0) {
//       bookListDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
//       return;
//     }
  
//     books.forEach(book => {
//       const bookDiv = document.createElement('div');
//       bookDiv.innerHTML = `
//         <pre>${JSON.stringify(book, null, 2)}</pre>
//         <hr>
//       `;
//       bookListDiv.appendChild(bookDiv);
//     });
//   }


//const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&kwd=${encodeURIComponent(keyword)}&pageSize=10&pageNum=1&sort=&category=도서`;

//2번째 사진+검색 가능
// async function getBookInfo(keyword) {
//     const apiKey = "76faa9053c59326364cd62f1f1375e2d77db3e92ae9879832c4d569414929619";
//     const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&kwd=${encodeURIComponent(keyword)}&pageSize=10&pageNum=1&sort=&category=도서`;
  
//     try {
//       const response = await fetch(url);
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("ERROR : ", error);
//       return null;
//     }
//   }
  
//   async function searchBooks() {
//     const searchInput = document.getElementById('search-input').value;
//     const data = await getBookInfo(searchInput);
//     const books = data?.result || [];
  
//     const bookListDiv = document.getElementById('book-list');
//     bookListDiv.innerHTML = ''; // 기존 리스트 초기화
  
//     if (books.length === 0) {
//       bookListDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
//       return;
//     }
  
//     books.forEach(book => {
//       const bookDiv = document.createElement('div');
//       bookDiv.innerHTML = `
//         <h3>제목: ${book.titleInfo}</h3>
//         <p>상세 링크: <a href="${book.detailLink}" target="_blank">여기</a></p>
//         ${book.imageUrl ? `<img src="http://cover.nl.go.kr/${book.imageUrl}" alt="${book.titleInfo}">` : ''}
//         <p>저자: ${book.authorInfo}</p>
//         <p>출판 정보: ${book.pubInfo}</p>
//         <p>유형: ${book.typeName}</p>
//         <p>분류: ${book.kdcName1s}</p>
//         <hr>
//       `;
//       bookListDiv.appendChild(bookDiv);
//     });
//   }

  // <p>상세 링크: <a href="${book.detailLink}" target="_blank">여기</a></p>
  // ${book.imageUrl ? `<img src="http://cover.nl.go.kr/${book.imageUrl}" alt="${book.titleInfo}">` : ''}
  // <hr>

//3 최종 사진 + 저자 + 출판 정보
  async function getBookInfo(keyword) {
    const apiKey = "76faa9053c59326364cd62f1f1375e2d77db3e92ae9879832c4d569414929619";
    const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&kwd=${encodeURIComponent(keyword)}&pageSize=10&pageNum=1&sort=&category=도서`;
  
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("ERROR : ", error);
      return null;
    }
  }
  
  async function searchBooks() {
    const searchInput = document.getElementById('search-input').value;
    const data = await getBookInfo(searchInput);
    const books = data?.result || [];
  
    const bookListDiv = document.getElementById('book-list');
    bookListDiv.innerHTML = ''; // 기존 리스트 초기화
  
    const booksWithImage = books.filter(book => book.imageUrl);
  
    if (booksWithImage.length === 0) {
      bookListDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
      return;
    }
  
    booksWithImage.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.innerHTML = `
        <h3>제목: ${book.titleInfo}</h3>
        <img src="http://cover.nl.go.kr/${book.imageUrl}">
        <p>저자: ${book.authorInfo}</p>
        <p>출판 정보: ${book.pubInfo}</p>
        <hr>
      `;
      bookListDiv.appendChild(bookDiv);
    });
  }
//alt="${book.titleInfo}
          // <p>유형: ${book.typeName}</p>
        // <p>분류: ${book.kdcName1s}</p>
        // <p>상세 링크: <a href="https://www.nl.go.kr/${book.detailLink}" target="_blank">여기</a></p>