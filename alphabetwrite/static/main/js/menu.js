$(document).ready(function(){
    for (var i = 1; i <= 4; i++) {
        var savedColor = localStorage.getItem('life' + i + 'Color');
        if (savedColor) {
            // 값이 있을 경우 제거
            localStorage.removeItem('life' + i + 'Color');
        }
    }
    

    console.log('Document is ready');  // Document ready 로그 추가
            
    // Django에서 전달한 JSON 데이터를 파싱하여 배열로 변환
    var questionLabelsScript = document.getElementById('question-labels-data').textContent;
    var question_labels = JSON.parse(questionLabelsScript);
    console.log('question_labels:', question_labels);  // 로그 추가

    // localStorage에서 study_fin 값을 가져와 파싱
    var study_fin;
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
    // question_labels 값을 study_fin 배열에 추가 (중복 제거)
    study_fin = [...new Set([...study_fin, ...question_labels])];
    
    // study_fin 배열의 각 요소를 숫자로 변환하여 다시 문자열로 저장
    study_fin = study_fin.map(function(item) {
        return item.toString(); // 숫자를 문자열로 변환
    });

    console.log('study_fin:', study_fin);

    // alphabet 각각에 대해 반복
    $('.alphabet').each(function() {
        var item3 = $(this).find('.item3').text();
        var item5 = $(this).find('.item5');
        // item3 텍스트가 study_fin 배열에 포함되어 있는지 확인
        if (study_fin.includes(item3)) {
            // alphabet의 배경색 변경
            $(item5).addClass('clear-background');
        }
    });

    // 업데이트된 study_fin 배열을 localStorage에 저장
    localStorage.setItem('study_fin', JSON.stringify(study_fin));

    function showPage(pageIndex) {
        $('.page').removeClass('active').hide();
        $('#page' + pageIndex).addClass('active').show();
    }
    $('.nextbtn').click(function() {
        var currentPageIndex = $('.page.active').index() + 1;
        showPage(currentPageIndex + 1);
    });
    $('.backbtn').click(function() {
        var currentPageIndex = $('.page.active').index() + 1;
        showPage(currentPageIndex - 1);
    });

    // 로그아웃 버튼 클릭 시
    $("#logoutbtn").click(function(){
        window.location.href = '/accounts/logout';
    });

    // 클릭 이벤트 핸들러 설정
    $('.alphabet .item').click(function() {
        // 클릭한 요소의 부모(.alphabet) 내의 item1, item2, item3 내용을 가져옴
        var parent = $(this).closest('.alphabet');
        var item1 = parent.find('.item1').text();
        var item2 = parent.find('.item2').text();
        var item3 = parent.find('.item3').text();

        // 로컬 스토리지에 저장
        localStorage.setItem('upper_ap', item1);
        localStorage.setItem('lower_ap', item2);
        localStorage.setItem('num', item3);

        // 모달에 저장된 내용 설정
        var num = localStorage.getItem('num');
        var upper_ap = localStorage.getItem('upper_ap');
        var lower_ap = localStorage.getItem('lower_ap');

        //콘솔에 출력해보기
        console.log('num:', num);
        console.log('upper:', upper_ap);
        console.log('lower:', lower_ap);

        $('#myModal p:nth-child(1)').html(`<p>${upper_ap} ${lower_ap}</p>`);

        // 모달 열기
        $(".dumi").show();
        openModal();
    });

    // 모달 취소 버튼 이벤트 처리
    $('.cancel').click(function() {
        $(".dumi").hide();
        closeModal();
        
    });

    // 모달 시작 버튼 이벤트 처리
    $('.start').click(function() {
        var lower_ap = localStorage.getItem('lower_ap'); // lower_ap 가져오기
        var filePath = '/trace/upper' + lower_ap; // 해당 알파벳에 대응하는 HTML 파일 경로
        window.location.href = filePath;
    });

});

// 모달 창 열기 함수
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// 모달 창 닫기 함수
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
