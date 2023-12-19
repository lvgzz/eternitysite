// clarity.js
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "iajtfot7hh");



        function vibrateTitle() {
            const title = document.querySelector('h1');
            title.classList.add('vibrate');

            setTimeout(() => {
                title.classList.remove('vibrate');
            }, 300);
        }
		
		
		



const trailLength = 30;
const trailLineWidth = 2;
const trailFadeDuration = 1000; // Time in milliseconds for the trail to fade away completely

// Array to store the trail points
let trailPoints = [];

// Function to create a cursor trail point
function createTrailPoint(x, y, color) {
  const trailPoint = { x, y, alpha: 1, color };
  trailPoints.push(trailPoint);
  if (trailPoints.length > trailLength) {
    trailPoints.shift();
  }
}

// Function to update the cursor trail
function updateCursorTrail() {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; // Update canvas width
  canvas.height = window.innerHeight; // Update canvas height
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = trailLineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  trailPoints.forEach((point, index) => {
    ctx.strokeStyle = `rgba(${point.color.join(',')}, ${point.alpha})`;
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
    point.alpha -= 1 / (trailFadeDuration / 60);
  });
  ctx.stroke();
  ctx.closePath();
  trailPoints = trailPoints.filter((point) => point.alpha > 0);
  requestAnimationFrame(updateCursorTrail);
}

// Mouse move event listener with accurate cursor tracking
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const color = [162, 172, 200]; // RGB values for #A2ACC8
  createTrailPoint(x, y, color);
});

// Initialize the cursor trail animation
function initCursorTrailAnimation() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'myCanvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  updateCursorTrail();
}

// Mouse leave event listener
document.addEventListener('mouseleave', () => {
  trailPoints = [];
});

// Window resize event listener
window.addEventListener('resize', () => {
  const canvas = document.getElementById('myCanvas');
  if (canvas) {
    canvas.width = window.innerWidth; // Update canvas width on window resize
    canvas.height = window.innerHeight; // Update canvas height on window resize
  }
});

// Initialize the cursor trail animation on document ready
document.addEventListener('DOMContentLoaded', initCursorTrailAnimation);
