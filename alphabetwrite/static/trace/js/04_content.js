// 배열 불러오기
function loadArray() {
    var storedArray = localStorage.getItem('array');
    if (storedArray) {
        return JSON.parse(storedArray);
    }
    return [];
}


// 로컬 스토리지에서 숫자를 가져오는 함수
function readNumberFromFile(callback) {
    // 로컬 스토리지에서 데이터를 가져옵니다.
    var data = localStorage.getItem('index');
    
    if (data === null) {
        // 데이터가 없을 경우 기본값인 0으로 설정합니다.
        callback(null, 0);
    } else {
        // 데이터를 정수로 변환하여 콜백 호출합니다.
        callback(null, parseInt(data));
    }
}

// 로컬 스토리지에 숫자를 설정하는 함수
function setRecordNumber(index) {
    localStorage.setItem('index', index.toString());
}
// 스위치 문을 사용하여 index 값에 따라 동작을 정의하는 함수
function performActionBasedOnIndex(index) {
    var alphabetArr = loadArray();
    console.log(alphabetArr);
    var alphabet = alphabetArr[index] || '';

    console.log('index: ', index);

    switch(index) {
        case 0:
            var filePath = 'index_' + alphabet + '.html'; // 해당 알파벳에 대응하는 HTML 파일 경로
            window.location.href = filePath;
            index++;
            setRecordNumber(index);
            break;
        case 1:
            var filePath = 'index_' + alphabet+index + '.html'; // 해당 알파벳에 대응하는 HTML 파일 경로
            index++;
            setRecordNumber(index);
            window.location.href = filePath;
            break;
        default:
            console.log('index: ', index);
            // window.location.href = '../03_content/03_content.html';
            break;
    }
}


// 현재 알파벳에 따라 HTML 파일 실행
function executeHTMLFileForAlphabet() {
     // 숫자 불러오기 및 스위치 문에 따라 동작 수행
     readNumberFromFile(function(error, num) {
        if (error) {
            console.error('Error reading number:', error);
        } else {
            console.log('Number from local storage:', num);
            performActionBasedOnIndex(num);
        }
    });
}

// 페이지 로드 시 자동 실행
$(document).ready(function() {
    // 로컬 스토리지에서 숫자를 읽어와 해당하는 알파벳에 따라 HTML 파일 실행
    executeHTMLFileForAlphabet();
});

