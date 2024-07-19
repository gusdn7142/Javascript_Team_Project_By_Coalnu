//변수 설정
const apikey = config.apikey; //api_key
let bookList = [];
let userInput = document.getElementById("search-input");

//스페이스로 검색
userInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchBook(event);
  }
})

//api주소 설정
let url = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?key=${apikey}&apiType=json&detailSearch=true`);

//pagination 변수 설정
let total = 0;
let pageNum = 1;
const pageSize = 15;
const groupSize = 5;

//api에서 책 정보 추출
const getBookInfo = async () => {
  try {
    url.searchParams.set("pageNum", pageNum);
    url.searchParams.set("pageSize", pageSize); 

    const response = await fetch(url);
    let data = await response.json();
    if (response.status === 200) {
      if (data.result.length === 0) {
        throw new Error("검색된 정보가 없습니다.");
      }
      bookList = data.result;
      total = data.total;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }

  } catch (error) {
    errorRender(error.message);
  }

}

//책 정보 검색
const searchBook = async () => {
  pageNum = 1;
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?key=${apikey}&apiType=json&detailSearch=true&v1=${keyword}&f1=title`);
  await getBookInfo();
}

//책 정보 렌더링
const render = () => {
  const bookHTML = bookList.map(book =>
    `<div class="row">
            <div class="col-lg-4">
                <img src="${book.imageUrl ? `http://cover.nl.go.kr/${book.imageUrl}` : '../search/search noimage/noimage_NL1.jpg'}"/>
            </div>
            <div class="col-lg-8">
                <div>${
                  book.titleInfo == null || book.titleInfo == "" ? "제목 없음"
                  : book.titleInfo.length > 10 ? book.titleInfo.substring(0, 10) + "..."
                  : book.titleInfo
                }</div>
                <p>${
                  book.authorInfo == null || book.authorInfo == "" ? "작가 없음"
                  : book.authorInfo.length > 5 ? book.authorInfo.substring(0, 5) + "..."
                  : book.authorInfo
                }</p>,
                <p>${
                  book.pubInfo == null || book.pubInfo == "" ? "출판사 없음"
                  : book.pubInfo.length > 5 ? book.pubInfo.substring(0, 5) + "..."
                  : book.pubInfo
                }</p>
            </div>
        </div>`
  ).join('');

  document.getElementById("book-list").innerHTML = bookHTML;
}

//에러 렌더링
const errorRender = (errorMessage) => {
  const errorHtml = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;

  document.getElementById("book-list").innerHTML = errorHtml;
}

//페이지네이션 렌더링
const paginationRender = () => {
  const totalPages = Math.ceil(total / pageSize);
  const pageGroup = Math.ceil(pageNum / groupSize);
  let lastPage = pageGroup * groupSize;
  let paginationHTML = ``;

  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  if (pageNum > 1) {
    paginationHTML = `
        <li class="main-bottom-pagination-link" onclick="moveToPage(1)">
          <a class="custom-fs-16 responsive-fs-12 medium-text">&lt;&lt;</a>
        </li>
        <li class="main-bottom-pagination-link" onclick="moveToPage(${pageNum - 1})">
          <a class="custom-fs-16 responsive-fs-12 medium-text">&lt;</a>
        </li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
      <li class="main-bottom-pagination-link ${i === pageNum ? "active" : ""}" onclick="moveToPage(${i})">
        <a class="main-bottom-pagination-num custom-fs-16 responsive-fs-12 medium-text" href="#">${i}</a>
      </li>`;
  }
  if (pageNum < totalPages) {
    paginationHTML += `
      <li class="main-bottom-pagination-link" onclick="moveToPage(${pageNum + 1})">
        <a class="custom-fs-16 responsive-fs-12 medium-text" href="#">&gt;</a>
      </li>
      <li class="main-bottom-pagination-link" onclick="moveToPage(${totalPages})">
        <a class="custom-fs-16 responsive-fs-12 medium-text" href="#">&gt;&gt;</a>
      </li>`
  }

  document.querySelector(".main-bottom-pagination").innerHTML = paginationHTML;
}

//페이지네이션 이동
const moveToPage = (page) => {
  pageNum = page;
  getBookInfo();
}