// 페이지가 로드될 때 실행되도록 이벤트 리스너를 추가합니다.
document.addEventListener("DOMContentLoaded", function() {
    var infoSound =new Audio('/static/03_content/info_sound/03_content_infob1.wav');
    var funSound = new Audio('/static/03_content/sound/funny_bgm.wav');
    funSound.loop = true; // funSound 무한 반복 설정
    
    // infoSound가 끝났을 때 funSound 재생
    infoSound.addEventListener('ended', function() {
        funSound.play();
    });

    // infoSound 재생
    infoSound.play();
});

window.onload = function() {
    for (var i = 1; i <= 4; i++) {
        var savedColor = localStorage.getItem('life' + i + 'Color');
        if(savedColor) {
            document.querySelector('.life' + i).style.backgroundImage = 'url(' + savedColor + ')';
        }
    }
}


// 따라 쓰기 코드
$(document).ready(function() {

    //효과음 추가
    var sliderSound = new Audio('/static/03_content/sound/monkey sound.wav');
    var soundTimeout = null;  // 소리 재생을 위한 타이머 변수

    
    startRangeSlider();
    startRoundSlider();

    document.getElementById('rebtn_reset').addEventListener('click', resetCanvas);
    document.getElementById('rebtn_submit').addEventListener('click', submitCanvas);

    // 효과음 함수 선언
    function playSound() {
        if (soundTimeout) {
            clearTimeout(soundTimeout);
        }
        soundTimeout = setTimeout(function() {
            sliderSound.currentTime = 0;  // 소리 재생 위치를 처음으로 설정
            sliderSound.play();           // 소리 재생
        }, 200);  // 200ms (0.2초) 간격으로 소리 재생
    }

    function startRangeSlider() {
        // RangeSlider1
        $("#range-slider1").on('change', function() {
            playSound();
            var value = parseInt($(this).val(), 10);

            if (value === 0) {
                $(".sliderWrapper1 .rangeslider, .sliderWrapper1 .rangeslider__fill").css("background", "green");
                $(".sliderWrapper1 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper1 .rangeslider__handle").hide();
                $(".sliderWrapper1 .rangeslider__fill").css("width", "auto");
                $(".sliderWrapper1 .rangeslider__fill").css("height", "auto");
                $(".sliderWrapper1 .rangeslider").css("z-index", "6");

                $("#round-slider1").css("z-index", "7");
                $("#round-slider1").roundSlider("option", "readOnly", false);
                $("#round-slider1 .rs-handle").css("display", "block");
                $(".rs-range-color").css("background", "green");

                $(".guideline-container1").show();
            }
        });
        $("#range-slider1").rangeslider({
            polyfill: false,
            onInit: function() {
                this.$range.wrap('<div class="sliderWrapper1" />');
            },
            onSlide: function(position, value) {
                if (value <= 100) {
                    $(".sliderWrapper1 .rangeslider").css("background", "green");
                }
            }
        });
    }

    function startRoundSlider() {
        // Roundslider1
        $("#round-slider1").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            handleSize: "+60",
            width: 100,
            radius: 150,
            value: 0,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "half-right",
            startAngle: 225,
            lineCap: "square",
            animation: false,
            showTooltip: false,
            keyboardAction: false,
            mouseScrollAction: false,
            readOnly: true,

            update: function (args) {
                playSound();
                if (args.value <= 0) {
                    $(".guideline-container1").show().css("width", "300px");
                } else if (args.value <= 30) {
                    $(".guideline-container1").show().css("width", "280px");
                } else if (args.value <= 40) {
                    $(".guideline-container1").show().css("width", "230px");
                } else if (args.value <= 60) {
                    $(".guideline-container1").show().css("width", "150px");
                } else if (args.value <= 80) {
                    $(".guideline-container1").hide();
                }

                if (args.value <= 30) {
                    $("#round-slider2").roundSlider("setValue", args.value * 2);
                }
            },
            // 현재값이 조건을 만족하면 더이상 움직이지 않음
            stop: function(args) {
                playSound();
                if (args.value >= 80) {
                    $(".guideline-container1").hide();

                    $("#round-slider1").roundSlider("option", "readOnly", true);
                    $("#round-slider1 .rs-handle").hide();
                    $(".rs-range-color, .rs-path-color").css("background-color", "green");
                }
            },
        });

        // Roundslider2 (RoundSlider1 뒤에 겹치는 부분)
        $("#round-slider2").roundSlider({
            sliderType: "min-range",
            handleShape: "round",
            handleSize: "0",
            width: 100,
            radius: 150,
            value: 0,
            min: 0,
            max: 100,
            step: 1,
            circleShape: "pie",
            startAngle: 45,
            lineCap: "square",
            animation: false,
            showTooltip: false,
            keyboardAction: false,
            mouseScrollAction: false,
            readOnly: true,
        });
    }

    function resetCanvas() {
        location.reload();
    }
    
    function submitCanvas() {
        // 슬라이더 핸들이 화면에 보이는지 확인
        var handle1Visible = document.querySelector('.rangeslider__handle').style.display !== 'none';
        var handle2Visible = document.querySelector('.rs-handle').style.display !== 'none';
  
        if (handle1Visible || handle2Visible) {
            // 핸들이 하나라도 화면에 있으면 아무런 이벤트 없음
            return
        } else {
            // 핸들이 모두 화면에 없으면 성공 모달 표시, 클로버 변경, 페이지 이동
            var clearModal = document.getElementById("clearModal");
            clearModal.style.display = "block";

            document.querySelector('.life3').style.backgroundImage = 'url("/static/03_content/images/0ed145.png")';
            localStorage.setItem('life3Color', "/static/03_content/images/0ed145.png");
            
            setTimeout(function() {
                window.location.href = '/trace/lower-b';
            }, 3000);
        }
    }
});
