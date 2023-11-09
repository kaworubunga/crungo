import { crungos } from "./crungos";
import confetti from "canvas-confetti";

function setCrungo() {
  const randomCrungo = crungos[Math.floor(Math.random() * crungos.length)];

  const img = document.getElementById("image");
  const link = document.getElementById("link");

  img.onclick = setCrungo;
  img.onload = crungoLoaded(randomCrungo, img, link);
  img.src = randomCrungo.url;
  img.title = randomCrungo.name;
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function birthday() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function snow() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  let skew = 1;

  (function frame() {
    const timeLeft = animationEnd - Date.now();
    const ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ["#ffffff"],
      shapes: ["circle"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
}

function gold() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FFDE00"],
  });
}

function crungoLoaded(crungo, img, link) {
  return () => {
    setLink(crungo, link);
    fireConfetti(crungo);
  };
}

function setLink(crungo, link) {
  link.innerHTML = crungo.name;
  link.href = crungo.link;
}

function fireConfetti({ name }) {
  if (name === "margoGoldenCrungo") gold();
  if (name === "CrungoBirthday") birthday();
  if (name === "Crungomas") snow();
}
window.onload = setCrungo;
