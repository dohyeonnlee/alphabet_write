$(document).ready(function() {
    console.log("Document is ready");
    var video = document.querySelector('.background-video');
    // 비디오의 재생 속도를 2배로 설정합니다. (기본값은 1입니다.)
    video.playbackRate = 2;

    // 로컬 스토리지에서 데이터 가져오기
    function loadData() {
        var num = localStorage.getItem('num');
        var upper = localStorage.getItem('upper_ap');
        var lower = localStorage.getItem('lower_ap');
        var index = localStorage.getItem('index');

        return { num, upper, lower, index };
    }

    // 데이터 사용 예시
    var data = loadData();
    console.log('num:', data.num);
    console.log('upper:', data.upper);
    console.log('lower:', data.lower);

    // data.num의 숫자를 배열에 저장
    // 로컬 스토리지에서 study_fin 배열 가져오기
    var study_fin = localStorage.getItem('study_fin');
    if (study_fin !== null) {
        try {
            study_fin = JSON.parse(study_fin);
        } catch (e) {
            console.error('JSON parse error:', e);
            study_fin = [];
        }
    } else {
        study_fin = [];
    }
    console.log('study_fin:', study_fin);





    

    //중복 확인 후 배열에 추가
    if (!study_fin.includes(data.num)) {
        study_fin.push(data.num);
        localStorage.setItem('study_fin', JSON.stringify(study_fin));
        console.log('study_fin:', study_fin);
    } else {
        console.log(data.num + '은 이미 배열에 존재합니다.');
    }


    // life1Color부터 life4Color까지의 값을 초기화
    for (var i = 1; i <= 4; i++) {
        localStorage.removeItem('life' + i + 'Color');
        console.log('life' + i + 'Color'+'초기화 되었습니다!');
    }

    $('.fin_button').click(function() {
        console.log("Button clicked");
        window.location.href = '/menu';
    });


    // Execute HTML file for the current alphabet
    executeHTMLFileForAlphabet();


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

});


document.getElementById('backgroundVideo').addEventListener('ended', function() {
    setTimeout(function() {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'block';
    }, 500); // 0.5초를 밀리초로 변환
});


