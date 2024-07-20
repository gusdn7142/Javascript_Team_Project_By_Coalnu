//nav.html, footer.html 들고오는 함수
document.addEventListener("DOMContentLoaded", function () {
    function loadHTML(elementId, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });
    }

    loadHTML('nav', '../common/nav/nav.html');
    loadHTML('footer', '../common/footer/footer.html');
});

// kks: 돋보기 아이콘 클릭 이벤트 추가
// 돋보기 아이콘 버튼 ID 값
const searchIconButton = document.getElementById('searchIconButton');

// 돋보기 아이콘 버튼이 있는지 확인
if (searchIconButton) {
  // 돋보기 아이콘 버튼을 클릭했을 때 실행되는 함수
  searchIconButton.addEventListener('click', function() {
    // search.html 페이지로 이동
    window.location.href = 'https://munheon-garden.netlify.app/search/search.html';
  });
}