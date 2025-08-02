const floatingPhotos = document.getElementById("floatingPhotos");
const totalPhotos = 15;
const imgSize = 90;
const padding = 10;
const vw = window.innerWidth;
const vh = window.innerHeight;
const isMobile = window.innerWidth < 768;

function createFloatingImage(src, x, y, rotation = 0) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "floating-img";
  if (!isMobile) {
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.setProperty("--rotation", `${rotation}deg`);
  }
  floatingPhotos.appendChild(img);
}

let photoIndex = 1;

if (isMobile) {
  // 📱 En móvil: todas las fotos en la parte inferior
  floatingPhotos.classList.add("mobile-gallery");
  for (let i = 1; i <= totalPhotos; i++) {
    createFloatingImage(`fotos/foto${i}.jpg`);
  }
} else {
  // 🖥️ En desktop: marco alrededor
  const photosPerEdge = { top: 4, bottom: 4, left: 3, right: 4 };

  // Top (extremos)
  for (let i = 0; i < photosPerEdge.top; i++) {
    const isLeft = i < Math.ceil(photosPerEdge.top / 2);
    const spacing = (vw * 0.25) / (photosPerEdge.top / 2 + 1);
    const x = isLeft
      ? spacing * (i + 1) - imgSize / 2
      : vw - (spacing * (photosPerEdge.top - i) + imgSize / 2);
    createFloatingImage(`fotos/foto${photoIndex++}.jpg`, x, padding);
  }

  // Bottom
  for (let i = 0; i < photosPerEdge.bottom; i++) {
    const spacing = vw / (photosPerEdge.bottom + 1);
    const x = spacing * (i + 1) - imgSize / 2;
    const y = vh - imgSize - padding;
    createFloatingImage(`fotos/foto${photoIndex++}.jpg`, x, y, 5);
  }

  // Left
  for (let i = 0; i < photosPerEdge.left; i++) {
    const spacing = vh / (photosPerEdge.left + 1);
    const y = spacing * (i + 1) - imgSize / 2;
    createFloatingImage(`fotos/foto${photoIndex++}.jpg`, padding, y, -5);
  }

  // Right
  for (let i = 0; i < photosPerEdge.right && photoIndex <= totalPhotos; i++) {
    const spacing = vh / (photosPerEdge.right + 1);
    const y = spacing * (i + 1) - imgSize / 2;
    const x = vw - imgSize - padding;
    createFloatingImage(`fotos/foto${photoIndex++}.jpg`, x, y, 5);
  }
}

// === Cuenta regresiva ===
const targetDate = new Date("2026-11-14T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const gap = targetDate - now;

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((gap / (1000 * 60)) % 60);
  const seconds = Math.floor((gap / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();
