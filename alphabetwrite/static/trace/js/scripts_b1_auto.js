const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


const letterWidth = 250;
const letterHeight = 250;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const lines = [
    {
      startX: 760, startY: 300,
      controlPoints: [],
      endX: 760, endY: 900
    },
    {
        startX: 760, startY: 610,
        controlPoints: [950, 530, 1200, 600, 1200, 780, 1250, 950],
        endX: 760, endY: 880
      },
];

let currentLineIndex = 0;
let progress = 0;
const totalSteps = 200;

function drawLine(startX, startY, endX, endY, progress) {
  ctx.lineWidth = 260; 
  const x = startX + (endX - startX) * progress;
  const y = startY + (endY - startY) * progress;
  ctx.lineTo(x, y);
}


function drawQuadraticCurve(startX, startY, cpX, cpY, endX, endY, progress) {
  ctx.lineWidth = letterWidth; // 굵기 조절 있음(대문자 B부터)
  const t = progress;
  const x = (1 - t) ** 2 * startX + 2 * (1 - t) * t * cpX + t ** 2 * endX;
  const y = (1 - t) ** 2 * startY + 2 * (1 - t) * t * cpY + t ** 2 * endY;
  ctx.lineTo(x, y);
}

function drawBezierCurve(startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, progress) {
  ctx.lineWidth = letterWidth; // 굵기 조절 있음(대문자 B부터)
  const t = progress;
  const x = (1 - t) ** 3 * startX + 3 * (1 - t) ** 2 * t * cp1X + 3 * (1 - t) * t ** 2 * cp2X + t ** 3 * endX;
  const y = (1 - t) ** 3 * startY + 3 * (1 - t) ** 2 * t * cp1Y + 3 * (1 - t) * t ** 2 * cp2Y + t ** 3 * endY;
  ctx.lineTo(x, y);
}

function drawBezierCurveWithThreePoints(startX, startY, cp1X, cp1Y, cp2X, cp2Y, cp3X, cp3Y, endX, endY, progress) {
  ctx.lineWidth = letterWidth; // 굵기 조절 있음(대문자 B부터)
  const t = progress;
  const x = (1 - t) ** 4 * startX + 4 * (1 - t) ** 3 * t * cp1X + 6 * (1 - t) ** 2 * t ** 2 * cp2X + 4 * (1 - t) * t ** 3 * cp3X + t ** 4 * endX;
  const y = (1 - t) ** 4 * startY + 4 * (1 - t) ** 3 * t * cp1Y + 6 * (1 - t) ** 2 * t ** 2 * cp2Y + 4 * (1 - t) * t ** 3 * cp3Y + t ** 4 * endY;
  ctx.lineTo(x, y);
}

function drawComplexBezierCurve(startX, startY, cp1X, cp1Y, cp2X, cp2Y, cp3X, cp3Y, cp4X, cp4Y, endX, endY, progress) {
  ctx.lineWidth = letterWidth; // 굵기 조절 있음(대문자 B부터)
  const t = progress;
  const x = (1 - t) ** 5 * startX + 5 * (1 - t) ** 4 * t * cp1X + 10 * (1 - t) ** 3 * t ** 2 * cp2X + 10 * (1 - t) ** 2 * t ** 3 * cp3X + 5 * (1 - t) * t ** 4 * cp4X + t ** 5 * endX;
  const y = (1 - t) ** 5 * startY + 5 * (1 - t) ** 4 * t * cp1Y + 10 * (1 - t) ** 3 * t ** 2 * cp2Y + 10 * (1 - t) ** 2 * t ** 3 * cp3Y + 5 * (1 - t) * t ** 4 * cp4Y + t ** 5 * endY;
  ctx.lineTo(x, y);
}

function drawBezierCurveWithFivePoints(startX, startY, cp1X, cp1Y, cp2X, cp2Y, cp3X, cp3Y, cp4X, cp4Y, cp5X, cp5Y, endX, endY, progress) {
  ctx.lineWidth = letterWidth; // 굵기 조절 있음(대문자 B부터)
  const t = progress;
  const x = (1 - t) ** 6 * startX + 6 * (1 - t) ** 5 * t * cp1X + 15 * (1 - t) ** 4 * t ** 2 * cp2X + 20 * (1 - t) ** 3 * t ** 3 * cp3X + 15 * (1 - t) ** 2 * t ** 4 * cp4X + 6 * (1 - t) * t ** 5 * cp5X + t ** 6 * endX;
  const y = (1 - t) ** 6 * startY + 6 * (1 - t) ** 5 * t * cp1Y + 15 * (1 - t) ** 4 * t ** 2 * cp2Y + 20 * (1 - t) ** 3 * t ** 3 * cp3Y + 15 * (1 - t) ** 2 * t ** 4 * cp4Y + 6 * (1 - t) * t ** 5 * cp5Y + t ** 6 * endY;
  ctx.lineTo(x, y);
}

function drawLineOrCurve(startX, startY, controlPoints, endX, endY, progress) {
  switch (controlPoints.length) {
    case 2:
      const [cp1X, cp1Y] = controlPoints;
      drawQuadraticCurve(startX, startY, cp1X, cp1Y, endX, endY, progress);
      break;
    case 4:
      const [cp1X4, cp1Y4, cp2X4, cp2Y4] = controlPoints;
      drawBezierCurve(startX, startY, cp1X4, cp1Y4, cp2X4, cp2Y4, endX, endY, progress);
      break;
    case 6:
      const [cp1X6, cp1Y6, cp2X6, cp2Y6, cp3X6, cp3Y6] = controlPoints;
      drawBezierCurveWithThreePoints(startX, startY, cp1X6, cp1Y6, cp2X6, cp2Y6, cp3X6, cp3Y6, endX, endY, progress);
      break;
    case 8:
      const [cp1X8, cp1Y8, cp2X8, cp2Y8, cp3X8, cp3Y8, cp4X8, cp4Y8] = controlPoints;
      drawComplexBezierCurve(startX, startY, cp1X8, cp1Y8, cp2X8, cp2Y8, cp3X8, cp3Y8, cp4X8, cp4Y8, endX, endY, progress);
      break;
    case 10:
      const [cp1X10, cp1Y10, cp2X10, cp2Y10, cp3X10, cp3Y10, cp4X10, cp4Y10, cp5X10, cp5Y10] = controlPoints;
      drawBezierCurveWithFivePoints(startX, startY, cp1X10, cp1Y10, cp2X10, cp2Y10, cp3X10, cp3Y10, cp4X10, cp4Y10, cp5X10, cp5Y10, endX, endY, progress);
      break;
    default:
      drawLine(startX, startY, endX, endY, progress);
  }
}

function animateLine() {
  ctx.save();
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  let startX = lines[currentLineIndex].startX;
  let startY = lines[currentLineIndex].startY;
  let controlPoints = lines[currentLineIndex].controlPoints;
  let endX = lines[currentLineIndex].endX;
  let endY = lines[currentLineIndex].endY;

  drawLineOrCurve(startX, startY, controlPoints, endX, endY, progress);

  // ctx.lineWidth = letterWidth; // 굵기 조절 있음(대문자 B부터)
  ctx.strokeStyle = 'green';
  ctx.stroke();
  ctx.restore();

  progress += 1 / totalSteps;
  if (progress >= 1) {
    progress = 0;
    currentLineIndex++;
  }

  requestAnimationFrame(animateLine);
}

// #. document DOM객체가 모두 로드 되었을떄 실행
$(function() {

  animateLine();

  const restartButton = document.getElementById('rebtn');

  restartButton?.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(guideLetter, canvas.width / 2, canvas.height / 1.55);
    currentLineIndex = 0;
    progress = 0;
    animateLine();
    console.log("Success");
  });
});