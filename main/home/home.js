//#1. [대분류] 키워드에 id를 지정하여 클릭시 category='대분류명'로 조회되게 1차 설계 
// - 유의사항 
//   => default '대분류'명 : 도서
//   => '대분류'명 종류 : 도서, 고문헌, 학위논문, 잡지/학술지, 신문, 기사
//   => 각 a태그에 id 부여 : 도서 (==bookTag), 고문헌(==referenceTag), 학위논문(==treatiseTag), 잡지/학술지(==magazineTag), 신문(==newsTag), 기사(==articleTag)


//#2. [카테고리] 키워드에 id를 지정하여 클릭시 detailSearch=true and (선택사항 : f1 ='keyword') and v1 = '카테고리명'으로 조회되게 1차 설계
// - 유의사항
//   =>default '카테고리'명 : 전체
//   =>'카테고리'명 종류 : 전체, 기술과학, 문학, 사회과학, 순수과학, 역사, 예술, 어학, 자연과학, 종교, 철학, 총류, 기타
//   => 각 a태그에 id 부여 : 전체(all), 기술과학(technology-science), 문학(literature), 사회과학(social-science), 순수과학(pure science), 역사(hisotory), 예술(art), 어학(language-study), 자연과학(natural-science), 종교(religion), 철학(philosophy), 총류(guns), 기타(other)



/*
 * 1. 변수 초기화  
 */
//1-1) 기본 변수 선언
let navTags = '';                                                       //'대분류' nav의 a 태그들 
let searchIconButton = '';                                            //검색 돋보기 아이콘 버튼 태그
let categorys = document.querySelectorAll('.categorys-btn')          //category의 button 태그들              
let bookTotalCount = document.getElementById("book-total-count");  
let currentNavTagName = '';                                          //현재 '대분류' a태그명


//1-2) API 호출 & 도서 이미지 URL 초기값 지정
let bootAPIDomain = `https://www.nl.go.kr/NL/search/openApi/search.do`; //API 호출 URL 
let bootDetailImageDomain = `https://cover.nl.go.kr/`;                  //도서 이미지 URL

//1-3) api key 불러오기
const apiKey = config.apikey;


//1-4) [대분류와 카테고리로 조회한] 도서 리스트 저장
let bookDataList = '';                                               //API 응답 결과 저장
let bootImageAndTextList = [];                                       //API 응답에서 result 값 저장


//1-5) 페이지네이션 초기값 셋팅
let pageNum = 1;  
let pageSize = 10;  


/*
 * 2. navbar a태그들, 검색 Button Click Event 
 */
document.addEventListener("DOMContentLoaded", function () {
    function setupNavEventListeners() {
        //2-1) navbar a태그들 조회
        navTags = document.querySelectorAll('.nav-top-link a')
        //console.log('navTags : ', navTags);

        //2-2) navbar a태그들 Click Event 선언
        navTags.forEach(navTag => navTag.addEventListener('click', 
            (event)=> getBookByNavTag(event))
        ); 

        //2-3) 검색 돋보기 아이콘 클릭 이벤트 추가
        searchIconButton = document.getElementById('searchIconButton');

        //2-4) 검색 돋보기 Button Click Event 선언
        searchIconButton.addEventListener('click', function() {
            window.location.href = '../search/search.html';                //search 페이지로 이동
            //window.location.href = 'https://munheon-garden.netlify.app/search/search.html';
        });
    }

    //2-3) common.js의 setupNavEventListeners() 메서드를 Global로 사용할수 있게 설정
    window.setupNavEventListeners = setupNavEventListeners;  
});





/*
 * 3. Category들 Click Event 추가
 */
categorys.forEach(category => category.addEventListener('click', 
    (event)=> getBookByCategory(event))
); 



/*
 * 4. '대분류'를 통한 도서 목록 조회 
 */
const getBookByNavTag = async (event) => {

    //4-1) 대분류 a태그명 셋팅
    let navTagName = '';

    if(!event || !event.target){                  //첫 화면일때
        navTagName = '도서';
        //console.log('디버깅');
    } else {                                     //각 카테고리 클릭시
        navTagName = event.target.textContent;
    }

    currentNavTagName = navTagName;           //현재 nav 태그 저장 (== 카테고리 조회 API URL에 함께쓰기 위해 우선 선언해둠)
    //console.log(currentNavTagName);

    try {
        //4-1) '대분류'로 검색 API 호출    
        const response = await fetch(`${bootAPIDomain}?key=${apiKey}&apiType=json&detailSearch=true&category=${navTagName}&pageNum=${pageNum}&pageSize=${pageSize}`);

        //4-2) API 응답이 OK이면
        if(response.status == 200){  

            //4-2-1) response 값을 json 타입으로 변환
            bookDataList = await response.json();
            console.log("bookDataList :", bookDataList);

            bootImageAndTextList = bookDataList.result;    
            console.log("bootImageAndTextList :", bootImageAndTextList);
        }
        else{
            throw new Error(response.message);
        }
    } catch (error) {
        console.error("ERROR : ", error.message);
    }



  //4-3) View 렌더링
  bookTotalCount.textContent = bookDataList.total.toLocaleString() + "개";   //도서 총 개수 셋팅


  const imageAndTextHTML = bootImageAndTextList.map(     //도서 목록 표시
    (bootImageAndText) => {
    
    let bootTitle = '';
    let bootAuthor = '';

    if(bootImageAndText.titleInfo == ''){
        bootTitle = '제목 없음'
    } else {
        bootTitle = bootImageAndText.titleInfo.slice(0, 10) + '...';
    }

    if(bootImageAndText.authorInfo == ''){
        bootAuthor = '작자미상';
    } else {
        bootAuthor = bootImageAndText.authorInfo.slice(0, 10) + '...';
    }
    

    return `<div  class="book-ImageAndText-one" >                           
            <div class="book-image  custom-mg-bottom-8" >      
                <img src="${bootDetailImageDomain + bootImageAndText.imageUrl}" onerror="this.onerror=null; this.src='../common/image/book-null-image.jpg';">
            </div>

            <div class="book-text-firstLine custom-fs-20"  >
                <span class="bold-text" title="${bootImageAndText.titleInfo}">${bootTitle}</span>
            </div>
                    
            <div class="book-text-secondLine custom-fs-16 custom-text-darkGrey" >
                <span title="${bootImageAndText.authorInfo}">${bootAuthor}</span>
            </div>
        </div>
      `                
    }).join('');   


    document.getElementById("book-ImageAndText-List").innerHTML = imageAndTextHTML;
}




/*
 * 5. '카테고리'를 통한 도서 목록 조회 
 */
const getBookByCategory = async (event) => {


    //5-1) 카테고리명 조회
    const categoryName = event.target.textContent;
    console.log("categoryName ; " + categoryName);

    let url = '';
    if(categoryName === '전체') {        //이슈 : URL에 category=currentNavTagName 를 넣을수 있는 방법을 찾아야 함.        
        url = new URL(`
            https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&detailSearch=true&pageNum=${pageNum}&pageSize=${pageSize}       
        `);     //$category=${currentNavTagName}  
    } else {                            
        url = new URL(`
            https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&detailSearch=true&v1=${categoryName}&f1=keyword&pageNum=${pageNum}&pageSize=${pageSize}     
        `);   //$category=${currentNavTagName}    
    } 


    //5-2) 해당 카테고리 버튼에 active/Inactive CSS 속성 지정
    const categoryActiveElements = document.querySelectorAll('.categorys-btn.categorys-btn-active');   //기존 categorys-btn-active 삭제
    categoryActiveElements.forEach((element) => {
        element.classList.remove('categorys-btn-active');
    });  
    event.target.classList.add('categorys-btn-active');           //신규 categorys-btn-active 지정



    try {
        //5-3) '카테고리'로 검색 API 호출    
        const response = await fetch(url);

        //5-4) API 응답이 OK이면
        if(response.status == 200){  

            //5-4-1) response 값을 json 타입으로 변환
            bookDataList = await response.json();
            console.log("bookDataList :", bookDataList);
            bootImageAndTextList = bookDataList.result;    
            console.log("bootImageAndTextList :", bootImageAndTextList);
        }
        else{
            throw new Error(response.message);
        }
    } catch (error) {
        console.error("ERROR : ", error);
    }



  //5-5) View 렌더링
  bookTotalCount.textContent = bookDataList.total.toLocaleString() + "개";  //도서 총 개수 셋팅

  
  const imageAndTextHTML = bootImageAndTextList.map(    //도서 목록 표시
    (bootImageAndText) => {
    
    let bootTitle = '';
    let bootAuthor = '';
    let bootShowTitle = '';
    let bootShowAuthor = '';
    
    if(bootImageAndText.titleInfo == ''){
        bootTitle = '제목 없음'
    } else {
        bootShowTitle = stripHTMLTags(bootImageAndText.titleInfo);
        // console.log("bootShowTitle : "+ bootShowTitle)
        bootTitle = bootShowTitle.slice(0, 10) + '...';
        // console.log("bootTitle : "+ bootTitle)
    }

    if(bootImageAndText.authorInfo == ''){
        bootAuthor = '작자미상';
    } else {
        bootShowAuthor = stripHTMLTags(bootImageAndText.authorInfo);
        // console.log("bootShowAuthor : "+ bootShowAuthor)
        bootAuthor = bootShowAuthor.slice(0, 10) + '...';
        // console.log("bootAuthor : "+ bootAuthor)
    }

    
    return `<div  class="book-ImageAndText-one" >                           
            <div class="book-image  custom-mg-bottom-8" >      
                <img src="${bootDetailImageDomain + bootImageAndText.imageUrl}" onerror="this.onerror=null; this.src='../common/image/book-null-image.jpg';">
            </div>

            <div class="book-text-firstLine custom-fs-20"  >
                <span class="bold-text" title="${bootShowTitle}" >${bootTitle}</span>
            </div>
                    
            <div class="book-text-secondLine custom-fs-16 custom-text-darkGrey" >
                <span title="${bootShowAuthor}">${bootAuthor}</span>
            </div>
        </div>
      `                
    }).join('');   


    document.getElementById("book-ImageAndText-List").innerHTML = imageAndTextHTML;
}




/**
 * 6. 첫 페이지 전체 도서 목록 조회
 */
document.getElementById("all").classList.add('categorys-btn-active');
getBookByNavTag();  //null




/**
 * 7. 기타 메서드
 */

//7-1) HTML 문자열에서 태그(ex, span)를 제거하고 텍스트만 추출하는 함수
const stripHTMLTags = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
}

























  