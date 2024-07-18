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
