$(document).ready(function() {
    let $bgImage = $(".bg img");
    let $letterInfo = $(".letter_info");
    let $letter = $(".letter");

    // Initial position
    let initialLeft = parseInt($bgImage.css("left"));
    let initialTop = parseInt($bgImage.css("top"));

    // Animate the image left and right for 4 seconds
    $bgImage.animate({ left: initialLeft + 150 }, 1000)
            .animate({ left: initialLeft - 150 }, 1000)
            .animate({ left: initialLeft + 50 }, 1000)
            .animate({ left: initialLeft - 50 }, 1000)
            .animate({ left: initialLeft }, 1000, function() {
                // Change the background image after the animation is done
                $("body").css("background-image", 'url("/static/main/img/con_bg2.jpeg")'); // Ensure this URL is correct
                
                // Wait a moment to ensure the image loads, then display the letter
                setTimeout(function() {
                    $letterInfo.fadeIn(100);
                    $letter.fadeIn(200); // Use fadeIn for a smooth transition

                    // Redirect to a new page after everything is done
                    setTimeout(function() {
                        var filePath = '/trace/upper' + data.lower; // 해당 알파벳에 대응하는 HTML 파일 경로
                        window.location.href = filePath;
                    }, 3000); // 3000 milliseconds = 3 seconds (adjust as necessary)

                }, 500); // Adjust the delay as necessary
            });

    // Execute HTML file for the current alphabet
    executeHTMLFileForAlphabet();
});

// 로컬 스토리지에서 데이터 가져오기
function loadData() {
    var num = localStorage.getItem('num');
    var upper = localStorage.getItem('upper_ap');
    var lower = localStorage.getItem('lower_ap');

    return { num, upper, lower };
}

// 데이터 사용 예시
var data = loadData();
console.log('num:', data.num);
console.log('upper:', data.upper);
console.log('lower:', data.lower);



// Execute HTML file based on the current alphabet
function executeHTMLFileForAlphabet() {

        var data = loadData();

        var textElement = document.querySelector(".letter");
        if (data.num < 10) {
            textElement.textContent = "0" + data.num + ". " + data.upper + ", " + data.lower;
        } else {
            textElement.textContent = data.num + ". " + data.upper + ", " + data.lower;
        }
}
