//nav.html, footer.html 들고오는 함수
// document.addEventListener("DOMContentLoaded", function () {
//     function loadHTML(elementId, url) {
//         fetch(url)
//             .then(response => response.text())
//             .then(data => {
//                 document.getElementById(elementId).innerHTML = data;
//             })
//             .catch(error => {
//                 console.error('Error loading HTML:', error);
//             });
//     }

    
//     loadHTML('nav', '../common/nav/nav.html');
//     loadHTML('footer', '../common/footer/footer.html');
// });




//nav.html, footer.html 들고오는 함수
document.addEventListener("DOMContentLoaded", function () {
    function loadHTML(elementId, url, callback) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });
    }

    loadHTML('nav', '../common/nav/nav.html', function() {
        console.log('nav loaded');
        // setupNavEventListeners();
        if (typeof setupNavEventListeners === 'function') {
            setupNavEventListeners();
            console.log('setupNavEventListeners is defined');
        } else {
            console.log('setupNavEventListeners is not defined');
        }
    
    });
    loadHTML('footer', '../common/footer/footer.html', function() {
        console.log('footer loaded');
    });
});





