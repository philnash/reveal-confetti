import confetti from "canvas-confetti";

function onSlideTransitionEnd({ currentSlide }) {
  if ("confetti" in currentSlide.dataset) {
    const defaults = { y: 0.5 };
    defaults.colors = currentSlide.dataset["confettiColors"]
      ? currentSlide.dataset["confettiColors"].split(" ")
      : undefined;
    const particleCount = currentSlide.dataset["confettiParticleCount"]
      ? parseInt(currentSlide.dataset["confettiParticleCount"], 10)
      : 200;
    if ("confettiSmall" in currentSlide.dataset) {
      confetti({
        ...defaults,
        particleCount: particleCount,
        spread: 70,
      });
    } else if ("confettiLarge" in currentSlide.dataset) {
      const duration = currentSlide.dataset["confettiDuration"]
        ? parseInt(currentSlide.dataset["confettiDuration"], 10)
        : 0;
      const end = Date.now() + duration * 1000;
      const frame = function frame() {
        confetti({
          ...defaults,
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          ...defaults,
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      const settings = [
        {
          ...defaults,
          spread: 26,
          startVelocity: 55,
          particleCount: particleCount * 0.12,
        },
        { ...defaults, spread: 60, particleCount: particleCount * 0.1 },
        {
          ...defaults,
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
          particleCount: particleCount * 0.18,
        },
        {
          ...defaults,
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
          particleCount: particleCount * 0.1,
        },
        {
          ...defaults,
          spread: 120,
          startVelocity: 45,
          particleCount: particleCount * 0.1,
        },
        {
          ...defaults,
          angle: 45,
          startVelocity: 65,
          particleCount: particleCount * 0.2,
        },
        {
          ...defaults,
          angle: 135,
          startVelocity: 65,
          particleCount: particleCount * 0.2,
        },
      ];
      settings.forEach((opts) => confetti(opts));
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
