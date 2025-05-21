const canvas = document.querySelector("canvas");
const container = document.querySelector(".scratch-container");
const ctx = canvas.getContext("2d");
const emojiEl = document.querySelector(".hidden-emoji");
const surpriseBtn = document.getElementById("surpriseBtn");

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

function fillGradient() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#8ec5fc");
  gradient.addColorStop(0.5, "#e0c3fc");
  gradient.addColorStop(1, "#8ec5fc");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-out";
}

fillGradient();

let isDrawing = false;

function scratch(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.pageX) - rect.left;
  const y = (e.clientY || e.pageY) - rect.top;

  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", scratch);
canvas.addEventListener("touchstart", () => (isDrawing = true));
canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("touchmove", (e) => scratch(e.touches[0]));

const card = document.getElementById("card");
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * -10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
});


const emojis = ["🥸", "🪄", "✨", "🎁", "🫠", "🚀", "🔥", "🍕", "👑", "😎", "🎊", "🧁", "👽"];

function getRandomEmoji() {
  const index = Math.floor(Math.random() * emojis.length);
  return emojis[index];
}

surpriseBtn.addEventListener("click", () => {
  emojiEl.textContent = getRandomEmoji();
  fillGradient(); 
});
