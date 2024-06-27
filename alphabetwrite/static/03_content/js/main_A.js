// 페이지가 로드될 때 실행되도록 이벤트 리스너를 추가합니다.
document.addEventListener("DOMContentLoaded", function() {
    var infoSound =new Audio('/static/03_content/info_sound/03_content_infoA.wav');
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
    var sliderSound = new Audio('/static/03_content/sound/apple bite.wav');
    var soundTimeout = null;  // 소리 재생을 위한 타이머 변수


    startRangeSlider();

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
                $(".sliderWrapper1 .rangeslider, .sliderWrapper1 .rangeslider__fill").css("background", "lightyellow");
                $(".sliderWrapper1 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper1 .rangeslider__handle").hide();
                $(".sliderWrapper1 .rangeslider__fill").css("width", "auto");
                $(".sliderWrapper1 .rangeslider__fill").css("height", "auto");
                $(".sliderWrapper1 .rangeslider").css("z-index", "7");
    
                $(".sliderWrapper2 .rangeslider").css("z-index", "8");
                $(".sliderWrapper2 .rangeslider").css("pointer-events", "auto");
                $(".sliderWrapper2 .rangeslider__handle").show();

                $(".sliderWrapper2 .rangeslider__fill").css("background-image", 'url("/static/03_content/images/guideline_1.png")');
            }
        });
        $("#range-slider1").rangeslider({
            polyfill: false,
            onInit: function() {
                this.$range.wrap('<div class="sliderWrapper1" />');
            },
            onSlide: function(position, value) {
                if (value <= 100) {
                    $(".sliderWrapper1 .rangeslider").css("background", "lightyellow");
                }
            }
        });

        // RangeSlider2
        $("#range-slider2").on('change', function() {
            playSound();
            var value = parseInt($(this).val(), 10);

            if (value === 0) {
                $(".sliderWrapper2 .rangeslider, .sliderWrapper2 .rangeslider__fill").css("background", "lightyellow");
                $(".sliderWrapper2 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper2 .rangeslider__handle").hide();
                $(".sliderWrapper2 .rangeslider__fill").css("width", "auto");
                $(".sliderWrapper2 .rangeslider__fill").css("height", "auto");
                $(".sliderWrapper2 .rangeslider").css("z-index", "7");

                $(".sliderWrapper3 .rangeslider").css("z-index", "8");
                $(".sliderWrapper3 .rangeslider").css("pointer-events", "auto");
                $(".sliderWrapper3 .rangeslider__handle").show();

                $(".sliderWrapper3 .rangeslider").css("background-image", 'url("/static/03_content/images/guideline_2.png")');
            }
        });
        $("#range-slider2").rangeslider({
            polyfill: false,
            onInit: function() {
                this.$range.wrap('<div class="sliderWrapper2" />');
            },
            onSlide: function(position, value) {
                if (value <= 100) {
                    $(".sliderWrapper2 .rangeslider").css("background", "lightyellow");
                }
            }
        });
    
        // RangeSlider3
        $("#range-slider3").on('change', function() {
            playSound();
            var value = parseInt($(this).val(), 10);

            if (value === 100) {
                $(".sliderWrapper3 .rangeslider__fill").css("background", "lightyellow");
                $(".sliderWrapper3 .rangeslider").css("background", "lightyellow");
                $(".sliderWrapper3 .rangeslider").css("pointer-events", "none");
                $(".sliderWrapper3 .rangeslider__handle").hide();
                $(".sliderWrapper3 .rangeslider").css("z-index", "6");
            }
        });
        $("#range-slider3").rangeslider({
            polyfill: false,
    
            onInit: function() {
                this.$range.wrap('<div class="sliderWrapper3" />');
            },
            onSlide: function(position, value) {
                if (value >= 0) {
                    $(".sliderWrapper3 .rangeslider__fill").css("background", "lightyellow");
                }
            }
        });
    }

    function resetCanvas() {
        location.reload();
    }
    
    function submitCanvas() {
        // 슬라이더 핸들이 화면에 보이는지 확인
        var handle1Visible = document.querySelector('.sliderWrapper1 .rangeslider__handle').style.display !== 'none';
        var handle2Visible = document.querySelector('.sliderWrapper2 .rangeslider__handle').style.display !== 'none';
        var handle3Visible = document.querySelector('.sliderWrapper3 .rangeslider__handle').style.display !== 'none';

        if (handle1Visible || handle2Visible || handle3Visible) {
            // 핸들이 하나라도 화면에 있으면 아무런 이벤트 없음
            return
        } else {
            // 핸들이 모두 화면에 없으면 성공 모달 표시, 클로버 변경, 페이지 이동
            var clearModal = document.getElementById("clearModal");
            clearModal.style.display = "block";

            document.querySelector('.life1').style.backgroundImage = 'url("/static/03_content/images/0ed145.png")';
            localStorage.setItem('life1Color', "/static/03_content/images/0ed145.png");
            
            setTimeout(function() {
                window.location.href = '/trace/upper-a';
            }, 3000); 
        }
    }
});
