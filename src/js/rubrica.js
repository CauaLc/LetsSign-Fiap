const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const drawArea = document.getElementById('draw-area');
const inputArea = document.getElementById('input-area');
const clearBtn = document.getElementById('clear');

const btnDigitar = document.getElementById('btnDigitar');
const btnDesenhar = document.getElementById('btnDesenhar');

// Função para redimensionar o canvas
function resizeCanvas() {
  if (drawArea.offsetWidth === 0 || drawArea.offsetHeight === 0) return;

  const displayWidth = drawArea.clientWidth;
  const displayHeight = drawArea.clientHeight;

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx.putImageData(imageData, 0, 0);
  }
}


// Canvas
const canvas2 = document.getElementById("assinaturaCanvas");
const ctx2 = canvas.getContext("2d");
let desenhando = false;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = 150;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
}

// Função para limpar o canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

// Redimensionar com janela ou rotação
window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 100));

// Alternar entre digitar/desenhar
btnDigitar.addEventListener('click', () => {
  drawArea.style.display = 'none';
  inputArea.style.display = 'block';
  btnDigitar.classList.add('selected-mode');
  btnDesenhar.classList.remove('selected-mode');
});

btnDesenhar.addEventListener('click', () => {
  drawArea.style.display = 'block';
  inputArea.style.display = 'none';
  btnDesenhar.classList.add('selected-mode');
  btnDigitar.classList.remove('selected-mode');
  resizeCanvas();
});
