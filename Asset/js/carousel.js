let currentCardIndex = 0;
let touchStartX = 0;
let touchMoveX = 0;
const cardWrapper = document.getElementById('cardWrapper');
const cards = document.querySelectorAll('.card');
let requestId = null;

function showCard(index) {
  const offset = -index * cards[0].offsetWidth;
  cardWrapper.style.transform = `translateX(${offset}px)`;
}

function animateCard(timestamp) {
  const cardWidth = cards[0].offsetWidth;
  const touchDiff = touchMoveX - touchStartX;
  const newOffset = -currentCardIndex * cardWidth + touchDiff;

  // Animasikan pergerakan kartu selama swipe
  cardWrapper.style.transform = `translateX(${newOffset}px)`;

  // Lanjutkan animasi selama swipe masih berlangsung
  if (Math.abs(touchDiff) < cardWidth / 2) {
    requestId = requestAnimationFrame(animateCard);
  }
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchMoveX = event.touches[0].clientX;

  // Batalkan requestAnimationFrame jika ada
  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = null;
  }
}

function handleTouchEnd() {
  const touchDiff = touchMoveX - touchStartX;
  const cardWidth = cards[0].offsetWidth;

  // Jika pergerakan horizontal cukup besar (lebih dari setengah lebar kartu), pindahkan kartu
  if (Math.abs(touchDiff) > cardWidth / 2) {
    if (touchDiff < 0) {
      nextCard();
    } else {
      prevCard();
    }
  } else {
    // Jika pergerakan tidak cukup besar, kembalikan ke posisi kartu semula
    showCard(currentCardIndex);
  }
}

// Fungsi untuk mengatur perpindahan kartu ke kartu sebelumnya
function prevCard() {
  currentCardIndex = Math.max(currentCardIndex - 1, 0);
  requestId = requestAnimationFrame(animateCard);
}

// Fungsi untuk mengatur perpindahan kartu ke kartu berikutnya
function nextCard() {
  currentCardIndex = Math.min(currentCardIndex + 1, cards.length - 1);
  requestId = requestAnimationFrame(animateCard);
}