const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const container = carousel.querySelector('.carousel-container');
  const items = carousel.querySelectorAll('.carousel-item');
  const nextBtn = carousel.querySelector('.next-btn');
  const prevBtn = carousel.querySelector('.prev-btn');

  let currentIndex = 0;

  function updateCarousel() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Volta para o primeiro quando chega no último
    }
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - 1; // Vai para o último quando no primeiro
    }
    updateCarousel();
  });

  // Inicializa o carrossel
  updateCarousel();
});
