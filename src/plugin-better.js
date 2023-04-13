import confetti from "canvas-confetti";

function integerDataAttrOrDefault(el, attr, def) {
  return el.dataset[attr] ? parseInt(el.dataset[attr], 10) : def;
}

function arrayDataAttrOrDefault(el, attr, def) {
  return el.dataset[attr] ? el.dataset[attr].split(" ") : def;
}

function smallConfetti(opts) {
  confetti(opts);
}

function largeConfetti(opts, duration) {
  const end = Date.now() + duration * 1000;
  const frame = function frame() {
    confetti({ ...opts, particleCount: 2, origin: { x: 0 } });
    confetti({ ...opts, particleCount: 2, origin: { x: 1 } });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

function mediumConfetti(opts, particleCount) {
  const settings = [
    {
      ...opts,
      spread: 26,
      startVelocity: 55,
      particleCount: particleCount * 0.12,
    },
    { ...opts, spread: 60, particleCount: particleCount * 0.1 },
    {
      ...opts,
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      particleCount: particleCount * 0.18,
    },
    {
      ...opts,
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      particleCount: particleCount * 0.1,
    },
    {
      ...opts,
      spread: 120,
      startVelocity: 45,
      particleCount: particleCount * 0.1,
    },
    {
      ...opts,
      angle: 45,
      startVelocity: 65,
      particleCount: particleCount * 0.2,
    },
    {
      ...opts,
      angle: 135,
      startVelocity: 65,
      particleCount: particleCount * 0.2,
    },
  ];
  settings.forEach((opts) => confetti(opts));
}

function onSlideTransitionEnd({ currentSlide }) {
  if ("confetti" in currentSlide.dataset) {
    const defaults = { y: 0.5 };
    defaults.colors = arrayDataAttrOrDefault(currentSlide, "confettiColors", undefined);
    const particleCount = integerDataAttrOrDefault(currentSlide, "confettiParticleCount", 200);
    if ("confettiSmall" in currentSlide.dataset) {
      smallConfetti({
        ...defaults,
        particleCount: particleCount,
        spread: 70,
      });
    } else if ("confettiLarge" in currentSlide.dataset) {
      const duration = integerDataAttrOrDefault(currentSlide, "confettiDuration", 0);
      largeConfetti({ ...defaults, angle: 60, spread: 55 }, duration);
    } else {
      mediumConfetti(defaults, particleCount);
    }
  }
}

window.RevealConfetti = {
  id: "confetti",
  init: (reveal) => {
    reveal.on("slidetransitionend", onSlideTransitionEnd);
  },
  destroy: () => {},
};
