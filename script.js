document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const next = document.querySelector(".arrow.next");
  const prev = document.querySelector(".arrow.prev");
  const panel = document.querySelector(".projects-panel");

  let index = 0;
  let autoSlide;
  let isPaused = false;

  // --- Show active card ---
  function showCard(i) {
    cards.forEach((card) => card.classList.remove("active"));
    cards[i].classList.add("active");
  }

  // --- Initial delay for smoother fade-in on load ---
  setTimeout(() => {
    cards[index].classList.add("active");
  }, 300);

  // --- Arrow click events ---
  next.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    showCard(index);
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length;
    showCard(index);
  });

  // --- Auto slide every 5 seconds ---
  function startAutoSlide() {
    autoSlide = setInterval(() => {
      if (!isPaused) {
        index = (index + 1) % cards.length;
        showCard(index);
      }
    }, 5000);
  }
  startAutoSlide();

  // --- Pause on hover ---
  panel.addEventListener("mouseenter", () => (isPaused = true));
  panel.addEventListener("mouseleave", () => (isPaused = false));

  // --- Swipe support (mobile) ---
  let startX = 0;
  panel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  panel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) {
      // swipe left → next
      index = (index + 1) % cards.length;
      showCard(index);
    } else if (diff < -50) {
      // swipe right → prev
      index = (index - 1 + cards.length) % cards.length;
      showCard(index);
    }
  });
});
