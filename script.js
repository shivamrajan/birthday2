// === SHOOTING STARS ===
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let shootingStars = [];
function createShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        length: Math.random() * 80 + 10,
        speed: Math.random() * 8 + 4,
        opacity: Math.random(),
        angle: Math.PI / 4
    });
}
function drawShootingStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let s of shootingStars) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length * Math.cos(s.angle), s.y - s.length * Math.sin(s.angle));
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        s.x += s.speed * Math.cos(s.angle);
        s.y += s.speed * Math.sin(s.angle);
    }
    shootingStars = shootingStars.filter(s => s.x > 0 && s.y < canvas.height);
    requestAnimationFrame(drawShootingStars);
}
setInterval(createShootingStar, 1200);
drawShootingStars();

// === BALLOONS ===
const balloonContainer = document.getElementById("balloons");
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
    balloon.style.animationDuration = (8 + Math.random() * 5) + "s";
    balloonContainer.appendChild(balloon);
    setTimeout(() => balloon.remove(), 13000);
}
setInterval(createBalloon, 1500);

// === GIFT BOX REVEAL ===
const giftBox = document.getElementById("gift-box");
giftBox.addEventListener("click", () => {
    if (!giftBox.classList.contains("open")) {
        giftBox.classList.add("open");
        setTimeout(() => {
            const msg = document.createElement("div");
            msg.id = "gift-message";
            msg.innerText = "🎁 A Special Gift of Love & Happiness 🎉";
            document.body.appendChild(msg);
            launchConfetti();
        }, 800);
    }
});

// === CONFETTI EFFECT ===
function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
        confetti.style.top = "50%";
        confetti.style.left = "50%";
        confetti.style.opacity = 0.9;
        confetti.style.transform = `rotate(${Math.random()*360}deg)`;
        confetti.style.transition = "transform 2s ease, top 2s ease, left 2s ease, opacity 2s";
        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.style.top = 100 + Math.random()*100 + "%";
            confetti.style.left = Math.random()*100 + "%";
            confetti.style.opacity = 0;
        }, 50);
        setTimeout(() => confetti.remove(), 2200);
    }
}

// === FIREWORKS ON CLICK ===
document.addEventListener("click", (e) => {
    for (let i = 0; i < 30; i++) {
        const firework = document.createElement("div");
        firework.style.position = "fixed";
        firework.style.width = "6px";
        firework.style.height = "6px";
        firework.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
        firework.style.top = e.clientY + "px";
        firework.style.left = e.clientX + "px";
        firework.style.borderRadius = "50%";
        document.body.appendChild(firework);
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 200;
        setTimeout(() => {
            firework.style.transform = `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)`;
            firework.style.opacity = 0;
            firework.style.transition = "all 1s ease-out";
        }, 50);
        setTimeout(() => firework.remove(), 1100);
    }
});

// === LIFE TIMER ===
function updateLifeTimer() {
    const birthDate = new Date("1999-09-28T00:00:00");
    const now = new Date();
    const diff = now - birthDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365.25);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.getElementById("timer-count").textContent =
        `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateLifeTimer, 1000);
updateLifeTimer();

// === FLOATING WISHES ===
const wishes = ["🎂 Happy Birthday!","🌸 Stay Blessed!","💐 Lots of Love!","🎉 Enjoy Your Day!","🥳 Cheers to You!","🌹 Keep Smiling!"];
document.addEventListener("click", (e) => {
    const wishText = wishes[Math.floor(Math.random() * wishes.length)];
    const wishEl = document.createElement("div");
    wishEl.className = "wish";
    wishEl.textContent = wishText;
    wishEl.style.color = `hsl(${Math.random() * 360}, 80%, 65%)`;
    wishEl.style.left = e.clientX + "px";
    wishEl.style.top = e.clientY + "px";
    document.getElementById("wish-container").appendChild(wishEl);
    setTimeout(() => wishEl.remove(), 3000);
});
