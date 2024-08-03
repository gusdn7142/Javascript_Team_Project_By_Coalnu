
## 📝 프로젝트 개요
> 국립중앙도서관의 도서 정보를 제공해주고 도서 대여를 연결해주는 웹 서비스입니다.
- 목표 : [국립중앙도서관 Open API](https://www.nl.go.kr/NL/contents/N31101030400.do)를 활용해 사용자에게 도서 정보를 간편하게 제공해주는 것을 목표로 하였습니다.
- 기간 : 2024년 7월 14일 ~ 2024년 7월 21일 
- 팀 구성 : 프론트 4명 (12조)
  <table>
     <tr>
      <td align="center"><b><a href="https://github.com/geonhee94">이건희</a></b></td>
      <td align="center"><b><a href="https://github.com/gusdn7142">최현우</a></b></td>
      <td align="center"><b><a href="https://github.com/eunmilee89">이은미</a></b></td>
      <td align="center"><b><a href="https://github.com/kilseong">강길성</a></b></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/geonhee94"><img src="https://avatars.githubusercontent.com/u/173425800?v=4" width="100px" /></a></td>
      <td align="center"><a href="https://github.com/gusdn7142"><img src="https://avatars.githubusercontent.com/u/62496215?v=4" width="100px" /></a></td>
      <td align="center"><a href="https://github.com/eunmilee89"><img src="https://avatars.githubusercontent.com/u/173548488?v=4" width="100px" /></a></td>
      <td align="center"><a href="https://github.com/kilseong"><img src="https://avatars.githubusercontent.com/u/138101430?v=4" width="100px" /></a></td>
    </tr>
    <tr>
      <td align="center"><b>Project Owner & <br> Frontend Developer</b></td>
      <td align="center"><b>Scrum Master & <br> Frontend Developer</b></td>
      <td align="center"><b>Designer & <br> Frontend Developer</b></td>
      <td align="center"><b>Frontend Developer</b></td>
    </tr>
  </table>
- 역할 : Scrum Master & Frontend Developer




</br>

## 💁‍♂️ Wiki 
- ✍ [프로젝트 기획 및 디자인 (With Figma)](링크추가예정)   //보류
- 📰 [스크럼 관리](링크추가예정)   //보류
- 📂 [디렉터리 구조](https://github.com/gusdn7142/Javascript_Team_Project_By_Coalnu/wiki/%F0%9F%93%81-Directory-Structure)

<br>



## 🛠 사용 기술
  <img src="https://github.com/user-attachments/assets/06e079a7-72dd-4509-800c-080b506170e9" style="width:500px; height:300px;" alt="Example Image">


<br>
<br>

## 🖥️ 전체화면 구성
<details>
  <summary> 1. Book 메인 카테고리 페이지 </summary>
  <div markdown="1">
    <br>
    <img src="https://github.com/user-attachments/assets/feefb3ed-170d-4285-a966-6496d6faec2b" style="width:1012px; height:1060px;" alt="Example Image">
  </div>
</details>


<details>
  <summary> 2. Book 검색 페이지 </summary>
  <div markdown="1">
    <br>    
    <img src="https://github.com/user-attachments/assets/bb97f592-4af7-4f57-9f2b-ae3779d7aceb" style="width:1012px; height:827px;" alt="Example Image">
  </div>
</details>




<details>
  <summary> 3. Book 상세 페이지 </summary>
  <div markdown="1">
    <br>    
    <img src="https://github.com/user-attachments/assets/7cdca8a0-fdec-4be6-ac3b-e949db301c2e" style="width:1012px; height:657px;" alt="Example Image">
  </div>
</details>




</br>
</br>






## 👨🏻‍🏫 성과
### < Main Book Page 구현 >   
<h3> 1) category book area </h3>      

<details>
  <summary> Layout Design </summary>
  <div markdown="1">
    <img src="https://github.com/user-attachments/assets/1442a110-9db9-4ee2-8925-b1d6e086657b" style="width:1012; height:600px;" alt="Example Image">
  </div>
</details>  



<details>
  <summary> Class Naming </summary>
  <div markdown="1">
    
  ```  
      <div class="main-container">
          <div class="categorys>
              <div class="categorys-title>
              <div class="categorys-button>
          <div class="additional-text">
              <div class="additional-text-leftLine>
              <div class="additional-text-rightLine>
          <div class="book-ImageAndText-List">
              <div class="book-ImageAndText-one">
                  <div class="book-image>
                  <div class="book-text-firstLine>
                  <div class="book-text-secondLine>
          <div class="see-more">
   ```
  </div>
</details>  

<!--    - `<div class="main-container">`
      - `<div class="categorys>`
        - `<div class="categorys-title>`
        - `<div class="categorys-button>`
      - `<div class="additional-text">`
        - `<div class="additional-text-leftLine>`
        - `<div class="additional-text-rightLine>`
      - `<div class="book-ImageAndText-List">`
        - `<div class="book-ImageAndText-one">`
          - `<div class="book-image>`
          - `<div class="book-text-firstLine`
          - `<div class="book-text-secondLine>`
      - `<div class="see-more">`  -->

    
<details>
  <summary> Main JavaScript logic - '카테고리'를 통한 도서 목록 조회 </summary>
  <div markdown="1">
    
  ```javascript
        const getBookByCategory = async (event) => {

          //5-1) 카테고리명 조회 및 셋팅
          const categoryName = event.target.textContent;
          if(categoryName === '전체') {          
              url = new URL(`
                  https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&detailSearch=true&pageNum=${pageNum}&pageSize=${pageSize}&category=${currentNavTagName}       
              `);    
          } else {                            
              url = new URL(`
                  https://www.nl.go.kr/NL/search/openApi/search.do?key=${apiKey}&apiType=json&detailSearch=true&v1=${categoryName}&f1=keyword&pageNum=${pageNum}&pageSize=${pageSize}&category=${currentNavTagName}       
              `);      
          }           

          //5-2) 해당 카테고리 버튼에 active/Inactive CSS 속성 지정
          const categoryActiveElements = document.querySelectorAll('.categorys-btn.categorys-btn-active');  
          categoryActiveElements.forEach((element) => {
            element.classList.remove('categorys-btn-active');
          });  
          event.target.classList.add('categorys-btn-active');         
              
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
                bootTitle = bootShowTitle.slice(0, 10) + '...';
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
                        <a href="../detail/detail.html?titleKeyword=${bootShowTitle}&authorKeyword=${bootShowAuthor}" >    
                            <img src="${bootDetailImageDomain + bootImageAndText.imageUrl}" onerror="this.onerror=null; this.src='../common/image/book-null-image.jpg';">
                        </a>
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

  ```
  </div>
</details>   


<details>
  <summary> Media Query Apply </summary>
  <div markdown="1">
    
  ```

   ```
  </div>
</details> 


<details>
  <summary> Issue </summary>
  <div markdown="1">
    
  ```

   ```
  </div>
</details> 


<br>

### < Detail Book Page 구현 >   
<h3> 1) detail book area </h3>      

<details>
  <summary> Layout Design </summary>
  <div markdown="1">
    <img src="https://github.com/user-attachments/assets/be5311d0-7a6a-4e8f-a30a-8aea5a01be07" style="width:1012; height:384px;" alt="Example Image">
  </div>
</details>  


    
<details>
  <summary> Class Naming </summary>
  <div markdown="1">
    
  ```  
      <div class="book-detail">
          <div class="aside>
          <div class="section>
   ```
  </div>
</details>  




<details>
  <summary> Main JavaScript logic - ‘저자 and 제목’ 조건 검색 - 단일 도서 조회 </summary>
  <div markdown="1">
    
  ```javascript
        const getDetailBookByKeyword = async () => {
        
            try {
              //3-1) 도서 상세 검색 API 호출    
              const response = await fetch(`${bookAPIDomain}?key=${apiKey}&apiType=json&detailSearch=true&f1=title&v1=${titleKeyword}&and1=AND&f2=author&v2=${authorKeyword}`);
              const detailBookData = await response.json();
        
              //3-2) API 응답이 OK이면
              if(response.status == 200){        
        
                //3-2-0) 데이터 Null 체크
                if(detailBookData.total === 0) {
                  alert('검색된 데이터가 없습니다.')
                  return;
                }
        
                //3-2-1) 상세 도서 이미지 setting
                if(detailBookData.result[0].imageUrl == ''){
                  detailBookImage.src = '../common/image/book-null-image.jpg';
                } else{
                  detailBookImage.src = bookDetailImageDomain + detailBookData.result[0].imageUrl;
                }
        
                //3-2-2) 도서 제목 setting
                detailBookTitle.innerText = titleKeyword;        
        
                //3-2-3) 도서 작가 setting 
                detailBookAuthor.innerText = authorKeyword;      
        
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
                document.getElementById('detailBookBtn').onclick = function() {
                  window.location.href = bookRentalDomain + detailBookData.result[0].detailLink;  
                };        
              } else{
                  throw new Error(detailBookData.message);
              }
            } catch (error) {
              console.error("ERROR : ", error);
            }
        }

  ```
  </div>
</details>   


<details>
  <summary> Media Query Apply </summary>
  <div markdown="1">
    
  ```

   ```
  </div>
</details> 


<details>
  <summary> Issue </summary>
  <div markdown="1">
    
  ```

   ```
  </div>
</details> 



<br>


<h3> 2) author book area </h3>      

<details>
  <summary> Layout Design </summary>
  <div markdown="1">
   <img src="https://github.com/user-attachments/assets/fd82637f-e8e8-4f5c-8f04-9c72d27b8a26" style="width:1012; height:310px;" alt="Example Image">
  </div>
</details>  

    
<details>
  <summary> Class Naming </summary>
  <div markdown="1">
    
  ```  
     <div class="book-author">
          <div class="book-author-title >
          <div class="book-author-content>
              <div class="book-author-content-left-arrow>
              <div class="book-ImageAndText-List-By-Author>
              <div class="book-author-content-right-arrow>
   ```
  </div>
</details>  





<details>
  <summary> Main JavaScript logic - ‘저자’ 조건 검색 - 도서 List 조회 </summary>
  <div markdown="1">
    
  ```javascript
        const getBookListByAuthor = async () => {
        
            //4-1) 도서 상세 검색 API 호출    
            const response = await fetch(`${bookAPIDomain}?key=${apiKey}&apiType=json&detailSearch=true&f1=author&v1=${authorKeyword}&pageNum=${pageNum}&pageSize=${pageSize}`);
            const bookDataList = await response.json();
            console.log(bookDataList)
        
            //4-2) 데이터 Null 체크
            if(bookDataList.total === 0) {
              alert('검색된 데이터가 없습니다.')
              return;
            }
        
            //4-3) response 값을 json 타입으로 변환
            bookImageAndTextList = bookDataList.result;           
        
        
            //4-4) View 렌더링
            const imageAndTextHTML = bookImageAndTextList.map(
              (bootImageAndText) => {
        
                let bootTitle = '';
                let bootAuthor = '';
                let bootShowTitle = '';
                let bootShowAuthor = '';
        
                if(bootImageAndText.titleInfo == ''){
                  bootTitle = '제목없음'
                }else{
                  bootShowTitle = stripHTMLTags(bootImageAndText.titleInfo);
                  bootTitle = bootShowTitle.slice(0, 10) + '...';
                }
        
        
                if(bootImageAndText.authorInfo == ''){
                  bootAuthor = '작자미상';
                }else {
                  bootShowAuthor = stripHTMLTags(bootImageAndText.authorInfo);
                  bootAuthor = bootShowAuthor.slice(0, 10) + '...';
                }
        
                
                  return `<div class="book-author-content-image-and-text  custom-mg-left-48 custom-mg-right-48" >         
                                <div class="book-author-content-image  custom-mg-bottom-8" >     
                                    <a href="../detail/detail.html?titleKeyword=${bootShowTitle}&authorKeyword=${bootShowAuthor}" >  
                                      <img src="${bookDetailImageDomain + bootImageAndText.imageUrl}" onerror="this.onerror=null; this.src='../common/image/book-null-image.jpg';">
                                    </a>
                                </div>
        
                                <div class="book-author-content-firstLine custom-fs-16"  >
                                    <span class="bold-text"title="${bootShowTitle}" >${bootTitle}</span>
                                </div>
                                
                                <div class="book-author-content-secondLine custom-fs-14 custom-text-darkGrey" >
                                    <span title="${bootShowAuthor}">${bootAuthor}</span>
                                </div>
                            </div>`                
                  }).join('');   
        
            document.getElementById("book-ImageAndText-List-By-Author").innerHTML = imageAndTextHTML;
        }

  ```
  </div>
</details>   


<details>
  <summary> Media Query Apply </summary>
  <div markdown="1">
    
  ```

   ```
  </div>
</details> 


<details>
  <summary> Issue </summary>
  <div markdown="1">
    
  ```

   ```
  </div>
</details> 



</br>



### < 프로젝트 관리 >   
<span></span>1)&nbsp; 스크럼 마스터로서 일자별 스크럼을 통한 프로젝트 진행상황과 이슈 관리 (wiki 링크) <br>
<span></span>2)&nbsp; Notion, Github 사용법 정리 후 공유  <br>
<span></span>3)&nbsp; HTML/CSS/Javascript 코드 컨벤션 규칙 정리 후 공유  <br>
<span></span>4)&nbsp; 카카오 책 검색 REST API, 국립중앙도서관 OPEN API 가이드 정리 후 공유  <br>
<span></span>5)&nbsp; Github 코드 관리 <br>



</br>



## 💡 코드 실행시 주의사항

### 도메인 접속 주소
  ```
  https://munheon-garden.netlify.app/home/home.html
  ```


