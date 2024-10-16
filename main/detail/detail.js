// URL 예시1 : http://127.0.0.1:5504/main/detail/detail.html?titleKeyword=RS·GIS 기법을 이용한 물유출 특성 예측기술 개발&authorKeyword=홍석영 김이현 정강호 임상규 하상건[1956-] 이남종 허승오 장갑수 홍종운
// URL 예시2 : http://127.0.0.1:5504/main/detail/detail.html?titleKeyword=전라북도, 환황해권 시대 신산업·물류중심지로 발전 : 국가재정운용계획&authorKeyword=기획예산처
// URL 예시3 : http://127.0.0.1:5504/main/detail/detail.html?titleKeyword=運動選手集團의 社會性 形成要因에 關한 硏究&authorKeyword=김대건[1939-]
// URL 예시4 : http://127.0.0.1:5504/main/detail/detail.html?titleKeyword=2006년도 예산안 편성을 위한 설문조사 문항, 조사결과, 예산 반영여부 및 소요 예산&authorKeyword=기획예산처

/*
 * 1. 변수 초기화
 */
//1-1) GET 파라미터 조회
const params = new URLSearchParams(window.location.search); // URLSearchParams 객체 생성
const titleKeyword = params.get("titleKeyword"); //특정 파라미터 조회
const authorKeyword = params.get("authorKeyword");

//1-2) api key 불러오기
const apiKey =
  "76faa9053c59326364cd62f1f1375e2d77db3e92ae9879832c4d569414929619"; //config.apikey;

//1-3) API 호출 & 도서대여 & 도서 이미지 URL 초기값 지정
let bookAPIDomain = `https://www.nl.go.kr/NL/search/openApi/search.do`; //API 호출 URL
let bookRentalDomain = `https://www.nl.go.kr`; //도서 대여 URL
let bookDetailImageDomain = `https://cover.nl.go.kr/`; //도서 이미지 URL

//1-4) 도서 상세 이미지, 제목, 작가, 카테고리, 비치일, 자료보관 장소 HTML EleMent 조회
let detailBookImage = document.getElementById("detailBookImage");
let detailBookTitle = document.getElementById("detailBookTitle");
let detailBookAuthor = document.getElementById("detailBookAuthor");
let detailBookCategory = document.getElementById("detailBookCategory");
let detailBookRegYMD = document.getElementById("detailBookRegYMD");
let detailBookPlace = document.getElementById("detailBookPlace");
let detailBookBtn = document.getElementById("detailBookBtn");

//1-5) [자자로 조회한] 도서 리스트 배열
let bookImageAndTextList = [];

//1-6) 페이지네이션 초기값 셋팅
// let leftArrow = document.getElementById("book-author-content-left-arrow");
// let rightArrow = document.getElementById("book-author-content-right-arrow");
let pageNum = 1;
let pageSize = 6;

//1-7) 기타 요소 선언
let searchIconButton = ""; //검색 돋보기 아이콘 버튼 태그

/*
 * 2. Event 선언
 */
//2-1) 왼쪽 화살표 클릭 이벤트
// leftArrow.onclick = async () => {
//   pageNum--;
//   await getBookListByAuthor();
// };

//2-2) 오른쪽 화살표 클릭 이벤트
// rightArrow.onclick = async () => {
//   pageNum++;
//   await getBookListByAuthor();
// };

//2-3) 검색 Button Click Event
document.addEventListener("DOMContentLoaded", function () {
  function setupNavEventListeners() {
    //2-3) 검색 돋보기 아이콘 클릭 이벤트 추가
    searchIconButton = document.getElementById("searchIconButton");

    //2-4) 검색 돋보기 Button Click Event 선언
    searchIconButton.addEventListener("click", function () {
      window.location.href = "../search/search.html"; //search 페이지로 이동
    });
  }

  //2-3) common.js의 setupNavEventListeners() 메서드를 Global로 사용할수 있게 설정
  window.setupNavEventListeners = setupNavEventListeners;
});

/*
 * 3. ‘저자 and 제목’ 조건 검색 - 단일 도서 조회
 */
const getDetailBookByKeyword = async () => {
  try {
    //3-1) 도서 상세 검색 API 호출
    const response = await fetch(
      `${bookAPIDomain}?key=${apiKey}&apiType=json&detailSearch=true&f1=title&v1=${titleKeyword}&and1=AND&f2=author&v2=${authorKeyword}`
    );
    const detailBookData = await response.json();

    //3-2) API 응답이 OK이면
    if (response.status == 200) {
      //3-2-0) 데이터 Null 체크
      if (detailBookData.total === 0) {
        alert("검색된 데이터가 없습니다.");
        return;
        //throw new Error("검색된 기사가 없습니다.");
      }

      //3-2-1) 상세 도서 이미지 setting
      if (detailBookData.result[0].imageUrl == "") {
        detailBookImage.src = "../common/image/book-null-image.jpg";
      } else {
        detailBookImage.src =
          bookDetailImageDomain + detailBookData.result[0].imageUrl;
      }

      //3-2-2) 도서 제목 setting
      detailBookTitle.innerText = titleKeyword; //detailBookData.result[0].titleInfo;

      //3-2-3) 도서 작가 setting
      detailBookAuthor.innerText = authorKeyword; //detailBookData.result[0].authorInfo;

      //3-2-4) 도서 카테고리 setting
      detailBookCategory.innerText = detailBookData.result[0].kdcName1s;

      //3-2-5) 도서 비치일 setting
      const year = detailBookData.result[0].regDate.slice(0, 4);
      const month = detailBookData.result[0].regDate.slice(4, 6);
      const day = detailBookData.result[0].regDate.slice(6, 8);
      const formattedDate = `${year}.${month}.${day}`;
      detailBookRegYMD.innerText = formattedDate;

      //3-2-6) 도서 자료 보관 장소 setting
      detailBookPlace.innerText = detailBookData.result[0].placeInfo;

      //3-2-7) 도서 대여 버튼 클릭 Event
      document.getElementById("detailBookBtn").onclick = function () {
        window.location.href =
          bookRentalDomain + detailBookData.result[0].detailLink;
      };
    } else {
      throw new Error(detailBookData.message);
    }
  } catch (error) {
    console.error("ERROR : ", error);
  }
};

/*
 * 4. ‘저자’ 조건 검색 - 도서 List 조회
 */
const getBookListByAuthor = async () => {
  //4-1) 도서 상세 검색 API 호출
  const response = await fetch(
    `${bookAPIDomain}?key=${apiKey}&apiType=json&detailSearch=true&f1=author&v1=${authorKeyword}&pageNum=${pageNum}&pageSize=${pageSize}`
  );
  const bookDataList = await response.json();
  console.log(bookDataList);

  //4-2) 데이터 Null 체크
  if (bookDataList.total === 0) {
    alert("검색된 데이터가 없습니다.");
    return;
  }

  //4-3) response 값을 json 타입으로 변환
  bookImageAndTextList = bookDataList.result;

  //4-4) View 렌더링
  const imageAndTextHTML = bookImageAndTextList
    .map((bookImageAndText) => {
      let bookTitle = "";
      let bookAuthor = "";
      let bookShowTitle = "";
      let bookShowAuthor = "";

      if (bookImageAndText.titleInfo == "") {
        bookTitle = "제목없음";
      } else {
        bookShowTitle = stripHTMLTags(bookImageAndText.titleInfo);
        //console.log("bookShowTitle:"+bookShowTitle)
        bookTitle = bookShowTitle.slice(0, 10) + "...";
        //console.log("bookTitle : "+ bookTitle)
      }

      if (bookImageAndText.authorInfo == "") {
        bookAuthor = "작자미상";
      } else {
        bookShowAuthor = stripHTMLTags(bookImageAndText.authorInfo);
        bookAuthor = bookShowAuthor.slice(0, 10) + "...";
      }

      return `<li class="book-author-content-image-and-text" >                           
                  <div class="book-author-content-image  custom-mg-bottom-8" >     
                      <a href="../detail/detail.html?titleKeyword=${bookShowTitle}&authorKeyword=${bookShowAuthor}" >  
                        <img src="${
                          bookDetailImageDomain + bookImageAndText.imageUrl
                        }" onerror="this.onerror=null; this.src='../common/image/book-null-image.jpg';">
                      </a>
                  </div>

                  <div class="book-author-content-firstLine custom-fs-16"  >
                      <span class="bold-text"title="${bookShowTitle}" >${bookTitle}</span>
                  </div>
                  
                  <div class="book-author-content-secondLine custom-fs-14 custom-text-darkGrey" >
                      <span title="${bookShowAuthor}">${bookAuthor}</span>
                  </div>
              </li>`;
    })
    .join("");

  document.getElementById("book-ImageAndText-List-By-Author").innerHTML =
    imageAndTextHTML;
};

getBookListByAuthor(); //3. ‘저자 and 제목’ 조건 검색 - 단일 도서 조회 API 호출
getDetailBookByKeyword(); //4. ‘저자’ 조건 검색 - 도서 List 조회 API 호출

const stripHTMLTags = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
};
