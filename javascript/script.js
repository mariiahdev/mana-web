const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();


// Atualiza tamanho em tempo real
window.addEventListener('resize', resizeCanvas);


const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);


function draw() {
  // Fundo transparente cria rastro do efeito
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';


  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);


    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}


function updateDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}


// Atualiza colunas ao redimensionar
window.addEventListener('resize', updateDrops);


// Inicia a animação
setInterval(draw, 35);
