const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const drawArea = document.getElementById('draw-area');
const clearBtn = document.getElementById('clear');

// Função para redimensionar o canvas
function resizeCanvas() {
  const displayWidth = drawArea.clientWidth;
  const displayHeight = drawArea.clientHeight;
  
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx.putImageData(imageData, 0, 0);
  }
}

// Função para limpar o canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Reaplica as configurações de estilo
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000000';
}

// Configurações iniciais
resizeCanvas();
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000';

let drawing = false;

// Função para obter a posição
function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  
  if (e.type.includes('touch')) {
    const touch = e.touches[0] || e.changedTouches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  } else {
    return {
      x: e.offsetX || (e.clientX - rect.left),
      y: e.offsetY || (e.clientY - rect.top)
    };
  }
}

// Eventos de desenho
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const pos = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  e.preventDefault();
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    e.preventDefault();
  }
});

['mouseup', 'mouseleave'].forEach(event => {
  canvas.addEventListener(event, () => {
    drawing = false;
  });
});

// Eventos de toque
canvas.addEventListener('touchstart', (e) => {
  drawing = true;
  const pos = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  e.preventDefault();
});

canvas.addEventListener('touchmove', (e) => {
  if (drawing) {
    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    e.preventDefault();
  }
});

canvas.addEventListener('touchend', () => {
  drawing = false;
});

// Botão de limpar
clearBtn.addEventListener('click', clearCanvas);

// Eventos de redimensionamento
window.addEventListener('resize', () => {
  resizeCanvas();
});

window.addEventListener('orientationchange', () => {
  setTimeout(resizeCanvas, 100);
});