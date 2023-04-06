import confetti from "canvas-confetti";

const defaults = {
  origin: { y: 0.5 },
  colors: ["#f7df1e", "#f51764", "#f96f15"],
};
const count = 200;

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

function small() {
  fire(1.0, { spread: 70 });
}

function medium() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
  fire(0.4, {
    angle: 45,
    startVelocity: 65,
  });
  fire(0.4, {
    angle: 135,
    startVelocity: 65,
  });
}

function large() {
  console.log("Large confetti order");
  const end = Date.now() + 15 * 1000;
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: defaults.colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: defaults.colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

const Plugin = {
  id: "confetti",

  init: (reveal) => {
    reveal.on("slidetransitionend", ({ currentSlide }) => {
      if (currentSlide.classList.contains("confetti")) {
        if (currentSlide.classList.contains("confetti-small")) {
          small();
        } else if (currentSlide.classList.contains("confetti-large")) {
          large();
        } else {
          medium();
        }
      }
    });
  },
  destroy: () => {},
};

export default () => Plugin;
