// === STAR GAME SETUP ===
// Redirect if intro already seen in this session
if (sessionStorage.getItem("introSeen")) {
    window.location.href = "index.html";
}
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let stars = [];
let goldenStars = [];
let shootingStars = [];
let score = 0;
let collectedStars = 0;
const maxGoldenStars = 5;

// UI Elements
const counter = document.getElementById("counter");
const spinButton = document.getElementById("spinButton");
const wheelCanvas = document.getElementById("wheelCanvas");
const wheelCtx = wheelCanvas.getContext("2d");
const winningDisplay = document.getElementById("winningDisplay");

// Random helper
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Star Class
class Star {
  constructor(x, y, radius, color, falling = false) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.falling = falling;
    this.speed = falling ? random(1, 3) : 0;
  }
  update() {
    if (this.falling) {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
    }
  }
  reset() {
    this.x = random(50, canvas.width - 50);
    this.y = -20;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// Shooting Star Class
class ShootingStar {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height / 2);
    this.len = random(100, 200);
    this.speed = random(4, 7);
    this.angle = Math.PI / 4;
    this.opacity = 1;
  }
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.opacity -= 0.01;
    if (this.opacity <= 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    const grad = ctx.createLinearGradient(this.x, this.y, this.x - this.len, this.y - this.len);
    grad.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.len, this.y - this.len);
    ctx.stroke();
    ctx.closePath();
  }
}

// Init background stars
for (let i = 0; i < 100; i++) {
  stars.push(new Star(random(0, canvas.width), random(0, canvas.height), random(1, 2), "white"));
}

// Shooting stars
for (let i = 0; i < 3; i++) {
  shootingStars.push(new ShootingStar());
}

// Spawn falling golden stars
function spawnGoldenStar() {
  if (goldenStars.length < maxGoldenStars) {
    goldenStars.push(new Star(random(50, canvas.width - 50), -20, 20, "gold", true));
  }
}
setInterval(spawnGoldenStar, 1500);

// Collect Golden Star
canvas.addEventListener("click", (e) => {
  goldenStars = goldenStars.filter(star => {
    const dx = e.clientX - star.x;
    const dy = e.clientY - star.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < star.radius + 10) {
      score++;
      collectedStars++;
      animateScoreCard();
      if (collectedStars >= 5) {
        showSpinWheel();
      }
      return false;
    }
    return true;
  });
});

// Animate Score Counter
function animateScoreCard() {
  counter.textContent = `⭐ Stars Collected: ${score}`;
  counter.classList.add("pulse");
  setTimeout(() => counter.classList.remove("pulse"), 500);
}

// Animate Background
function animate() {
  ctx.fillStyle = "rgba(13,13,43,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => s.draw());
  goldenStars.forEach(s => {
    s.update();
    s.draw();
  });
  shootingStars.forEach(s => {
    s.update();
    s.draw();
  });

  requestAnimationFrame(animate);
}
animate();

// === SPIN THE WHEEL ===
let wheelSpinning = false;
let wheelAngle = 0;
let spinVelocity = 0;
const wheelSections = [
  "🎉 Surprise Gift",
  "💐 Flowers",
  "🍫 Chocolate",
  "🥳 Party",
  "❤️ Special Wish",
  "🎂 Birthday Cake"
];

function drawWheel() {
  const radius = wheelCanvas.width / 2;
  const cx = wheelCanvas.width / 2;
  const cy = wheelCanvas.height / 2;
  const sectionAngle = (2 * Math.PI) / wheelSections.length;

  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  for (let i = 0; i < wheelSections.length; i++) {
    const start = wheelAngle + i * sectionAngle;
    const end = start + sectionAngle;

    wheelCtx.fillStyle = i % 2 === 0 ? "#7b2ff7" : "#f107a3";

    wheelCtx.beginPath();
    wheelCtx.moveTo(cx, cy);
    wheelCtx.arc(cx, cy, radius, start, end);
    wheelCtx.closePath();
    wheelCtx.fill();

    wheelCtx.save();
    wheelCtx.translate(cx, cy);
    wheelCtx.rotate(start + sectionAngle / 2);
    wheelCtx.textAlign = "right";
    wheelCtx.fillStyle = "#fff";
    wheelCtx.font = "16px Arial";
    wheelCtx.fillText(wheelSections[i], radius - 10, 5);
    wheelCtx.restore();
  }
}

function spinWheel() {
  if (wheelSpinning) {
    wheelAngle += spinVelocity;
    spinVelocity *= 0.985;
    if (spinVelocity < 0.002) {
      wheelSpinning = false;
      spinButton.disabled = false;

      const sectionAngle = (2 * Math.PI) / wheelSections.length;
      const winningIndex = Math.floor(
        ((2 * Math.PI - (wheelAngle % (2 * Math.PI))) / sectionAngle) % wheelSections.length
      );

      winningDisplay.textContent = "🎁 You got: " + wheelSections[winningIndex];

      // Navigate to main page after delay
      sessionStorage.setItem("introSeen", "true");
setTimeout(() => {
    window.location.href = "index.html";
}, 4000);
    }
  }
  drawWheel();
  requestAnimationFrame(spinWheel);
}

spinButton.addEventListener("click", () => {
  if (!wheelSpinning) {
    spinVelocity = 0.3 + Math.random() * 0.3;
    wheelSpinning = true;
    spinButton.disabled = true;
  }
});

// Show Wheel
function showSpinWheel() {
  canvas.style.display = "none";
  counter.style.display = "none";
  document.getElementById("wheelContainer").classList.add("show");
  drawWheel();
  spinWheel();
}