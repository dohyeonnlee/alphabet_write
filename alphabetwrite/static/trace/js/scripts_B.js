document.addEventListener("DOMContentLoaded", function() {
    var infoSound =new Audio('/static/trace/info_sound/04_content_infoB.wav');
    var funSound = new Audio('/static/trace/sound/funny_bgm.wav');
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


// 직접 쓰기 코드
document.addEventListener('DOMContentLoaded', () => {
    const canvas1 = document.getElementById('draw_canvas1');
    const canvas2 = document.getElementById('draw_canvas2');
    const canvas3 = document.getElementById('draw_canvas3');
    const canvas4 = document.getElementById('draw_canvas4');
    const canvas5 = document.getElementById('draw_canvas5');
    const canvases = [canvas1, canvas2, canvas3, canvas4, canvas5];

    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    const ctx3 = canvas3.getContext('2d');
    const ctx4 = canvas4.getContext('2d');
    const ctx5 = canvas5.getContext('2d');
    const contexts = [ctx1, ctx2, ctx3, ctx4,ctx5];


    // 초기화
    let currentCanvasIndex = 0; // 현재 작업 중인 캔버스 인덱스
    let isDrawing = false;
    let x = 0;
    let y = 0;
    let strokeCount = 0;  // 획의 시작점, 끝점 및 해당 획의 벡터값을 저장할 리스트 초기화
    let alphabet = "B";

    // Set line width, join to round, cap to round
    contexts.forEach(ctx => {
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
    });


    // 라디오 버튼에 대한 아이콘 색상 매핑
    const colorMap = {
        "1": "black",
        "2": "red",
        "3": "blue",
        "4": "green",
        "5": "orange",
    };

    
    const radioButtons = document.querySelectorAll('.wttools input[type="radio"]');
    
    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
            if (this.checked) {
                const optionValue = this.value;

                contexts.forEach(ctx => {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.strokeStyle = colorMap[optionValue]; // 선의 색상 설정
                });
            }
        });
    });

    canvases.forEach(addCanvasEventListeners);

    document.getElementById('rebtn_reset').addEventListener('click', resetCanvas);
    document.getElementById('rebtn_submit').addEventListener('click', submitCanvas);


    function addCanvasEventListeners(canvas) {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing, { passive: true });
        canvas.addEventListener('touchmove', draw, { passive: true });
        canvas.addEventListener('touchend', stopDrawing, { passive: true });
        canvas.addEventListener('touchcancel', stopDrawing, { passive: true });
    }

    function disableDrawingOnCurrentCanvas() {
        const currentCanvas = getCurrentCanvas();
        currentCanvas.removeEventListener('mousedown', startDrawing);
        currentCanvas.removeEventListener('mousemove', draw);
        currentCanvas.removeEventListener('mouseup', stopDrawing);

        currentCanvas.removeEventListener('touchstart', startDrawing, { passive: true });
        currentCanvas.removeEventListener('touchmove', draw, { passive: true });
        currentCanvas.removeEventListener('touchend', stopDrawing, { passive: true });
        currentCanvas.removeEventListener('touchcancel', stopDrawing, { passive: true });
    }

    function startDrawing(event) {
        // passive 옵션 사용하지 않음
        isDrawing = true;
        
        strokeCount++;
    
        const currentCtx = getCurrentContext();
        currentCtx.beginPath();
        
        let rect = getCurrentCanvas().getBoundingClientRect();
        let scaleX = getCurrentCanvas().width / rect.width;
        let scaleY = getCurrentCanvas().height / rect.height;
    
        if (event.touches) {
            x = (event.touches[0].clientX - rect.left) * scaleX;
            y = (event.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (event.clientX - rect.left) * scaleX;
            y = (event.clientY - rect.top) * scaleY;
        }
    
        currentCtx.moveTo(x, y);
    }
    
    function draw(event) {
        // passive 옵션 사용하지 않음
        if (!isDrawing) return;
    
        const currentCtx = getCurrentContext();
        let rect = getCurrentCanvas().getBoundingClientRect();
        let scaleX = getCurrentCanvas().width / rect.width;
        let scaleY = getCurrentCanvas().height / rect.height;
        
        if (event.touches) {
            x = (event.touches[0].clientX - rect.left) * scaleX;
            y = (event.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (event.clientX - rect.left) * scaleX;
            y = (event.clientY - rect.top) * scaleY;
        }
        
        currentCtx.lineTo(x, y);
        currentCtx.stroke();
    }
    
    function stopDrawing() {
        isDrawing = false;

        const currentCtx = getCurrentContext();
        currentCtx.closePath();

        disableDrawingOnCurrentCanvas();
        if (currentCanvasIndex < canvases.length - 1) {
            moveNextCanvas();
        } else {
             // 여기에 잉크 부족 모달창을 추가
             var inkmodal = document.getElementById("inkModal");
             inkmodal.style.display = "block";
 
             // 모달을 닫기 전에 캔버스를 리셋합니다.
             resetCanvas();
 
             // 3초 후에 모달 닫기
             setTimeout(function() {
                 inkmodal.style.display = "none";
             }, 3000); 
        }
    }

    function getCurrentCanvas() {
        return canvases[currentCanvasIndex];
    }

    function getCurrentContext() {
        return contexts[currentCanvasIndex];
    }

    function moveNextCanvas() {
        if (currentCanvasIndex < canvases.length - 1) {
            canvases[currentCanvasIndex].style.zIndex = '9'; // 현재 캔버스 숨기기
            currentCanvasIndex++;
            canvases[currentCanvasIndex].style.zIndex = '10'; // 다음 캔버스 표시
        }
    }
    
    function isCanvasDrawn(canvas) {
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] !== 0) { // Alpha 값이 0이 아닌 경우 그림이 그려진 것으로 간주
                return true;
            }
        }
        return false; // 그림이 그려지지 않은 캔버스인 경우
    }
    
    async function submitCanvas() {
        const canvasWidth = 800;
        const canvasHeight = 800;

        // 각 캔버스의 내용을 이미지 파일로 저장 (사용된 캔버스만 저장)
        for (let i = 0; i < canvases.length; i++) {
            const canvas = canvases[i];

            if (isCanvasDrawn(canvas)) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvasWidth;
                tempCanvas.height = canvasHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);

                const imageName = `stroke_${alphabet}_${i + 1}.png`; // 파일명 설정
                const imageNumber = 1;
                const dataURL = tempCanvas.toDataURL("image/png"); // 캔버스를 이미지로 변환
                const link = document.createElement('a');

                const blob = dataURItoBlob(dataURL);
                await uploadImage(blob, imageName, imageNumber);

                link.click();
            }
        }
        
        // 각 캔버스를 레이어처럼 겹쳐서 하나의 이미지로 저장
        const tempMergedCanvas = document.createElement('canvas');
        tempMergedCanvas.width = canvasWidth; // 겹치는 이미지의 너비
        tempMergedCanvas.height = canvasHeight; // 겹치는 이미지의 높이

        const tempMergedCtx = tempMergedCanvas.getContext('2d');

        // 각 캔버스를 지정된 크기로 변환하여 레이어처럼 겹치기
        for (let i = 0; i < canvases.length; i++) {
            const canvas = canvases[i];
            if (isCanvasDrawn(canvas)) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvasWidth;
                tempCanvas.height = canvasHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);
                tempMergedCtx.drawImage(tempCanvas, 0, 0); // 캔버스를 겹치는 이미지에 그리기
            }
        }

        // 파일명 설정
        const mergedImageName = `stroke_${alphabet}.png`;

       // 이미지 저장
       const mergedDataURL = tempMergedCanvas.toDataURL("image/png");
       const imageNumber = 2;
       const mergedBlob = dataURItoBlob(mergedDataURL);
       await uploadImage(mergedBlob, mergedImageName, imageNumber);

       const mergedLink = document.createElement('a');

       mergedLink.click();
 
    

    }
    
    function resetCanvas() {
        // 캔버스 지우기
        contexts.forEach(ctx => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        });
    
        // 현재 상태 초기화
        currentCanvasIndex = 0;
        isDrawing = false;
        x = 0;
        y = 0;
        strokeCount = 0;
    
        // 각 캔버스의 zIndex 초기화
        canvases.forEach((canvas, index) => {
            canvas.style.zIndex = index === 0 ? '10' : '9';
        });

        canvases.forEach(addCanvasEventListeners);
    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }


    // 예측값 저장 객체
    let predictions = {
        stroke: [], // 획 입력 예측값 저장
        handwriting: [], // 필기체 예측값
    };

    async function uploadImage(blob, imageName, imageNumber) {
        const formData = new FormData();
        formData.append('file', blob, imageName);
        formData.append('imageNumber', imageNumber);
        formData.append('alphabet', alphabet)
        try {
            const response = await fetch('/trace/upper-b/', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Success:', data);

            const result = data['result'];
            // console.log('Result:', result); 

            const number = result['number']

            // {'predicted_label': str(stroke_label), 's3_uri': s3_uri, 'number': number}
            // {'predicted_label1': str(alphabet_label1), 'predicted_label2': str(alphabet_label2), 's3_uri': s3_uri, 'number': number}
            
            if (number === 1){
                const predicted_label = result['predicted_label'];
                console.log(number, predicted_label);

                // 획 입력의 예측값을 리스트에 저장
                predictions.stroke.push(predicted_label);
            }
            else if (number === 2) {
                const predicted_label = result['predicted_label1'];
                console.log(number, predicted_label);

                // 필기체 입력의 예측값을 리스트에 저장
                predictions.handwriting.push(predicted_label);
                // 정답 체크 로직 실행
                checkAnswers(predicted_label);
                console.log("predictions ", predictions);
            }
            else {
                console.log("number ", number);
                console.log("predictions ", predictions);
            }


        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    // 정답 체크 함수
    function checkAnswers(predicted_label1) {
        // 1. 필기체 인식모델 결과 predicted_label1을 정답 라벨과 비교하여 정오답 체크
        
        // 필기체 정오답 체크
        const isCorrectPredictedLabel1 = alphabet === predicted_label1
        console.log(`Predicted Label 1 정확성: ${isCorrectPredictedLabel1}`);

        // 2. 획인식모델 결과 종합하여 해당 라벨 정답과 비교
        // DB에서 정답 라벨의 획순을 가져오기
        // 추후 스토리지나 DB사용으로 바꾸기
        // const correctStrokeOrder = getCorrectStrokeOrderFromDB();
        const correctStrokeOrder = '277';

        // predictions.stroke 배열의 모든 요소를 하나의 문자열로
        const predictedStrokeOrder = predictions.stroke.join('');
        
        // 합쳐진 문자열과 correctStrokeOrder를 비교하여 정오답 체크
        const isCorrectStrokeOrder = predictedStrokeOrder === correctStrokeOrder;
        console.log(`획 입력 '${predictedStrokeOrder}' 정오답: ${isCorrectStrokeOrder}`);

        // 초기 로컬 스토리지 설정
        if (localStorage.getItem('count') === null) {
            localStorage.setItem('count', '0');
        }
        var count = localStorage.getItem('count');
        console.log("count : ", count);

        // ID txt 가져와서 문구를 오답 별로 추가
        var textElement = document.getElementById('txt'); 
        var finmodal = document.getElementById("finModal");


        // 오답 체크시 각 오답에 대한 모달 문구 추가
        // 순서 오답 : 순서에 맞춰 다시 써보세요
        // 모양 오답 : 모양에 맞춰 다시 써보세요
        // 전부 오답 : 순서와 모양에 맞춰 다시 써보세요(70%로 width 변경)
        //////////////////////////////////////////////


        if (isCorrectPredictedLabel1 && !isCorrectStrokeOrder) {
            console.log("isCorrectPredictedLabel1만 True인 경우");
            textElement.textContent = "순서에 맞춰 다시 써보세요";
            finmodal.style.display = "block";

        } else if (!isCorrectPredictedLabel1 && isCorrectStrokeOrder) {
            console.log("isCorrectStrokeOrder만 True인 경우");
            textElement.textContent = "모양에 맞춰 다시 써보세요";
            finmodal.style.display = "block";
        } else if (!isCorrectPredictedLabel1 && !isCorrectStrokeOrder) {
            console.log("둘 다 False인 경우");
            textElement.textContent = "순서와 모양에 맞춰 다시 써보세요";
            
            // width 변경 코드
            var finmodalText = document.querySelector('.modal .txt');
            finmodalText.style.width = '93%';
            finmodal.style.display = "block";

        } else {
            console.log("둘 다 True인 경우  성공");

            var modal = document.getElementById("myModal");

            document.querySelector('.life2').style.backgroundImage = 'url("/static/trace/img/0ed145.png")';
            localStorage.setItem('life2Color', "/static/trace/img/0ed145.png");

            modal.style.display = "block";
                
            setTimeout(function() {
                window.location.href = '/trace/lowerb/';
            }, 3000);
        }

        var tryagButton = document.querySelector('.tryag');
        if (count == 0) {
            tryagButton.textContent = '다시하기';
        } else{
            tryagButton.textContent = '다음단계로';
        }

        
    }



    // DB에서 정답 라벨의 획순을 가져오는 함수 
    function getCorrectStrokeOrderFromDB() {
        // 실제 구현에서는 DB 쿼리를 통해 데이터를 가져오는 로직이 필요
        return "가상 획순";
    }


    document.querySelector('.tryag').addEventListener('click', function() {
        var count = localStorage.getItem('count');
        if(count == 0){
            count++;
            localStorage.setItem('count', count.toString());
            location.reload();
        }else{
            localStorage.setItem('count', '0');
            document.querySelector('.life2').style.backgroundImage = 'url("/static/trace/img/0ed145.png")';
            localStorage.setItem('life2Color', "/static/trace/img/0ed145.png");
            window.location.href = '/trace/lowerb/';
        }
    });

});





// ID txt 가져와서 문구를 오답 별로 추가
//var textElement = document.getElementById('txt'); 

// 오답 체크시 각 오답에 대한 모달 문구 추가
// 순서 오답 : 순서에 맞춰 다시 써보세요
// 모양 오답 : 모양에 맞춰 다시 써보세요
// 전부 오답 : 순서와 모양에 맞춰 다시 써보세요(70%로 width 변경)
//////////////////////////////////////////////
//textElement.textContent = "순서에 맞춰 다시 써보세요";
//textElement.textContent = "모양에 맞춰 다시 써보세요";
//textElement.textContent = "순서와 모양에 맞춰 다시 써보세요";


// width 변경 코드
//var modalText = document.querySelector('.modal .txt');
//modalText.style.width = '93%';